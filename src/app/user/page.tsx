import { auth, signOut } from '@/auth';
import styles from "@/app/user/page.module.css";

export default async function UserPage() {
	const session = await auth();

	if(!session)
		return <p className={styles.notice}>You are not logged in.</p>

	return (
		< >
			<h1>{session.user.name}'s Profile</h1>
			<p>Welcome, {session.user.name}.</p>

			{/* Add relevant content here. */}

			<form className={styles.logout} action={async () => {
				'use server';
				await signOut({ redirectTo: '/' });
			}}>
				<label>
					(Temporary button until Header is updated.)
					<button>
						Log out
					</button>
				</label>
			</form>
		</ >
	);
}