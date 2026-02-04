'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { sql } from '@/library/db';
import { redirect } from 'next/navigation';

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