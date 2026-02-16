import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { UserSlim } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import { sql } from '@/library/db';
 
async function getUser(email: string): Promise<UserSlim | undefined> {
	try {
		const user = await sql<UserSlim[]>`SELECT id, email, password FROM users WHERE email=${email.toLowerCase()}`;
		return user[0];
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}
 
export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(6) })
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { email, password } = parsedCredentials.data;
					const user = await getUser(email);
					if (!user) return null;
					const passwordsMatch = await bcrypt.compare(password, user.password);



					if (passwordsMatch) return {
						id: user.id,
						email: user.email.toLowerCase(),
					};
				}

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id as number;
			}

			return token;
		},

		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					id: token.id as number
				}
			};
		}
	},
});