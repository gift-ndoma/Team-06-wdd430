'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { sql } from '@/library/db';
import { redirect } from 'next/navigation';
import getUser from '@/app/lib/getUser';
import crypto from "crypto";
import type { UserSlug } from '@/app/lib/definitions';

export async function authenticate(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if(error instanceof Error && error.message == 'NEXT_REDIRECT')
			throw error;
		if(error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				default:
					return 'Something went wrong.';
			}
		}
	}
}

export async function createAccount(
	prevState: void | undefined,
	formData: FormData,
) {
	const plainPassword = formData.get('password')?.toString();

	if (typeof plainPassword !== 'string')
		throw new Error('Password is required');

	const [formName, formEmail] = [formData.get('name')?.toString(), formData.get('email')?.toString()];

	if (typeof formName !== 'string')
		throw new Error('Name is required');
	if (typeof formEmail !== 'string')
		throw new Error('Email is required');

	try {
		const hashedPassword = await bcrypt.hash(plainPassword, 10);
		await sql`INSERT INTO users (name, email, password) VALUES (${formName}, ${formEmail}, ${hashedPassword});`;
	} catch (error) {
		console.error('Failed to create user:', error);
		throw new Error('Failed to create user.');
	}
	redirect("/login?newUser");
}

export async function logout() {
	await signOut({ redirectTo: '/' });
}

export async function requestArtisanStatus(
	prevState: void | undefined,
	formData: FormData,
) {
	const user = await getUser();
	if(user == null) return;

	const keys = [
		"name",
		"short_description",
		"location",
		"bio",
		"profile_image_url",
	];

	const newValues = Object.fromEntries(keys.map(key => [key, formData?.get(key)?.toString()]));

	if(
		newValues.name == undefined ||
		newValues.short_description == undefined ||
		newValues.location == undefined ||
		newValues.bio == undefined ||
		newValues.profile_image_url == undefined
	)
		return;

	const baseSlug = newValues.name.toLowerCase().replaceAll(/\s+/g, "-").replaceAll(/[^a-z0-9\-]+/g, "");
	newValues.slug = baseSlug;

	while((await sql<{ count: number }[]>`SELECT COUNT(id) AS "count" FROM artisans WHERE slug=${newValues.slug}`)[0].count > 0) {
		newValues.slug = baseSlug + Math.floor(Math.random() * 10000);
	}

	newValues.id = crypto.randomUUID();
	newValues.id = newValues.id ?? `A${user.id}`;

	try {
		await sql`INSERT INTO artisans (id, name, short_description, location, bio, profile_image_url, slug) VALUES (
			${newValues.id},
			${newValues.name},
			${newValues.short_description},
			${newValues.location},
			${newValues.bio},
			${newValues.profile_image_url},
			${newValues.slug} 
		);`

		await sql`UPDATE users SET artisan_id=${newValues.id} WHERE id=${user.id}`;
	}
	catch(error) {
		console.log('Failed to register artisan:', error);
	}
}

export async function updateUserInfo(
	prevState: void | undefined,
	formData: FormData,
) {
	const user = await getUser();
	if(user == null) return;

	const keys: (keyof UserSlug)[] = ["name", "email", "address"];

	const newValues = Object.fromEntries(keys.map(key => [key, formData?.get(key)?.toString() ?? user[key] ?? '']));

	try {
		await sql`UPDATE users SET name=${newValues.name}, email=${newValues.email}, address=${newValues.address} WHERE id=${user.id}`;
	}
	catch(error) {
		console.log('Failed to update user:', error);
	}
}