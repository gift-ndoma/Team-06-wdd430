'use client'

import { useActionState } from 'react';
import { authenticate } from "@/app/lib/actions";
import styles from "@/app/login/page.module.css";
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl') || '/user';
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined,
	);
	return (
		<form action={formAction} className={styles.loginForm}>
			{searchParams.get('newUser')!=null && (<p>Thank you for joining us! Now log in with your email and password to get started:</p>)}
			<label>
				Email
				<input type="email" autoComplete="email" name="email" required />
			</label>
			<label>
				Password
				<input type="password" autoComplete="password" name="password" required />
			</label>
			<input type="hidden" name="redirectTo" value={callbackUrl} />
			<input type="submit" value="Log in" aria-disabled={isPending} />
			{errorMessage && (<p className={styles.error}>{errorMessage}</p>)}
		</form>
	);
}