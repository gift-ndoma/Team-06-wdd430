import SignupForm from "@/app/ui/signup/SignupForm";
import styles from "@/app/login/page.module.css";

export default function SignupPage() {
	return (
		<div className={styles.loginBox}>
			<h1>
				Sign Up
			</h1>
			<SignupForm />
			<p>Already have an account? <a href="./login">Log in</a> here.</p>
		</div>
	);
}