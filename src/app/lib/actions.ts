'use server';

import { signIn } from '@/auth';
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
		if(error.message == 'NEXT_REDIRECT')
			throw error;
		switch (error.type) {
			case 'CredentialsSignin':
				return 'Invalid credentials.';
			default:
				return 'Something went wrong.';
		}
	}
}

export async function createAccount(
	prevState: string | undefined,
	formData: FormData,
) {
	try {
		const hashedPassword = await bcrypt.hash(formData.get('password'), 10);
		await sql`INSERT INTO users (name, email, password) VALUES (${formData.get('name')}, ${formData.get('email')}, ${hashedPassword});`;
	} catch (error) {
		console.error('Failed to create user:', error);
		throw new Error('Failed to create user.');
	}
	redirect("/login?newUser");
}

export async function logout() {
	await signOut({ redirectTo: '/' });
}