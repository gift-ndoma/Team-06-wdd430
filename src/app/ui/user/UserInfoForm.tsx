'use client';

import styles from "@/app/user/page.module.css";
import { updateUserInfo } from "@/app/lib/actions";
import { useState, useActionState, useRef } from 'react';
import type { UserSlug } from '@/app/lib/definitions';
import { useRouter } from "next/navigation";

const UserInput = (
	{
		type, 
		autocomplete, 
		name,
		formValues,
		setFormValues,
	}: {
		type: string;
		autocomplete: string;
		name: string;
		formValues: {
			name: string;
			email: string;
			address: string;
		},
		setFormValues: (a: {
			name: string;
			email: string;
			address: string;
		}) => void;
	}
) => {
	return <input
		type={type}
		autoComplete={autocomplete}
		name={name}
		value={formValues[name]}
		onChange={e => setFormValues(prev => ({
			...prev,
			[name]: e.target.value
		}))}
		required
	/>
};

export default function UserInfoForm({ user }: { user: UserSlug }) {
	const [errorMessage, formAction, isPending] = useActionState(
		updateUserInfo,
		undefined,
	);
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);
	const [formValues, setFormValues] = useState({
		name: user.name,
		email: user.email,
		address: user.address,
	});

	const cannotSubmit = (
		!Object.values(formValues).every(v => v.trim() !== "") ||
		!Object.entries(formValues).some(([key, value]) => value !== user[key])
	);

	const handleAction = (...args: Parameters<typeof formAction>) => {
		formAction(...args);
		router.refresh();
	}

	return (
		<form action={handleAction} className={styles.userInfoForm} ref={formRef}>
			<label>
				Name
				<UserInput type="text" autocomplete="name" name="name" formValues={formValues} setFormValues={setFormValues} />
			</label>
			<label>
				Email
				<UserInput type="email" autocomplete="email" name="email" formValues={formValues} setFormValues={setFormValues} />
			</label>
			<label>
				Mailing Address
				<UserInput type="text" autocomplete="address" name="address" formValues={formValues} setFormValues={setFormValues} />
			</label>
			<input type="submit" value="Update Data" disabled={cannotSubmit || isPending} />
		</form>
	);
}