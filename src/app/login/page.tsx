import LoginForm from "@/app/ui/login/LoginForm";
import styles from "@/app/login/page.module.css";
import { Suspense } from 'react';

export default function LoginPage() {
	return (
		<div className={styles.loginBox}>
			<h1>
				Login
			</h1>
			<Suspense><LoginForm /></Suspense>
			<p>Don't have an account? <a href="./signup">Sign up</a> here.</p>
		</div>
	);
}