import { signOut } from '@/auth';
import { Suspense } from 'react';
import Link from "next/link";
import styles from "@/app/user/page.module.css";
import getUser from '@/app/lib/getUser';

import UserInfoForm from "@/app/ui/user/UserInfoForm";
import RequestArtisan from "@/app/ui/user/RequestArtisan";

export default async function UserPage() {
	const user = await getUser();

	if(user == null)
		return <p className={styles.notice}>You are not logged in.</p>

	return (
		< >
			<h1>{user.name}'s Profile</h1>
			<p>Welcome, {user.name}.</p>

			<Suspense>
				<UserInfoForm user={user} />

				{
					user.artisan_id ?
					<Link href="/artisan-dashboard/" className={styles.artisanPageLink}>
						Go To Your Artisan Page
					</Link> :
					<RequestArtisan />
				}
			</Suspense>
		</ >
	);
}