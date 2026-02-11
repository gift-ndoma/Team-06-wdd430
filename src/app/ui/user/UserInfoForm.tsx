'use client';

import styles from "@/app/user/page.module.css";
import { updateUserInfo } from "@/app/lib/actions";
import { useState, useActionState, useRef } from 'react';
import type { UserSlug } from '@/app/lib/definitions';
import { useRouter } from "next/navigation";

export default function UserInfoForm({ user }: { user: UserSlug }) {
	const [cannotSubmit, setCannotSubmit] = useState(true);
	const [errorMessage, formAction, isPending] = useActionState(
		updateUserInfo,
		undefined,
	);
	const router = useRouter();
	const formRef = useRef<HTMLFormElement>(null);

	const checkCannotSubmit = () => {
		const inputs = Array(...(formRef.current?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]') ?? []));
		setCannotSubmit(!(
			inputs.every(input => input.checkValidity()) &&
			inputs.some(input => input.value != input.dataset.initialValue)
		));
	}

	const UserInput = (
		{
			type, 
			autocomplete, 
			name, 
			initialValue 
		}: {
			type: string;
			autocomplete: string;
			name: string;
			initialValue: string;
		}
	) => {
		return <input
			type={type}
			autoComplete={autocomplete}
			name={name}
			defaultValue={initialValue}
			data-initial-value={initialValue}
			onInput={checkCannotSubmit}
			required
		/>
	};

	const handleAction = (...args: Parameters<typeof formAction>) => {
		formAction(...args);
		router.refresh();
	}

	return (
		<form action={handleAction} className={styles.userInfoForm} ref={formRef}>
			<label>
				Name
				<UserInput type="text" autocomplete="name" name="name" initialValue={user.name} />
			</label>
			<label>
				Email
				<UserInput type="email" autocomplete="email" name="email" initialValue={user.email} />
			</label>
			<label>
				Mailing Address
				<UserInput type="text" autocomplete="address" name="address" initialValue={user.address} />
			</label>
			<input type="submit" value="Update Data" disabled={cannotSubmit || isPending} />
		</form>
	);
}