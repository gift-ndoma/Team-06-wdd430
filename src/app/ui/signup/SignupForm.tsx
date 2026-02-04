'use client'

import { useActionState } from 'react';
import { createAccount } from "@/app/lib/actions";
import styles from "@/app/login/page.module.css";

export default function SignupForm() {
	const [errorMessage, formAction, isPending] = useActionState(
		createAccount,
		undefined,
	);
	return (
		<form action={formAction} className={styles.loginForm}>
			<label>
				Username
				<input type="text" autoComplete="username" name="name" required />
			</label>
			<label>
				Email
				<input type="email" autoComplete="email" name="email" required />
			</label>
			<label>
				Password
				<input type="password" autoComplete="password" name="password" required />
			</label>
			<input type="submit" value="Sign up" />
		</form>
	);
}