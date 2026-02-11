'use client';

import styles from "@/app/user/page.module.css";
import { requestArtisanStatus } from "@/app/lib/actions";
import { useState, useActionState, useRef } from 'react';
import { useRouter } from "next/navigation";

export default function RequestArtisan() {
	const [formShown, setFormShown] = useState(false);
	const [cannotSubmit, setCannotSubmit] = useState(true);
	const [errorMessage, formAction, isPending] = useActionState(
		requestArtisanStatus,
		undefined,
	);
	const router = useRouter();
	const nameField = useRef<HTMLInputElement>(null);
	const descField = useRef<HTMLInputElement>(null);
	const locationField = useRef<HTMLInputElement>(null);
	const bioField = useRef<HTMLTextAreaElement>(null);
	const imgUrlField = useRef<HTMLInputElement>(null);
	const submitElem = useRef<HTMLInputElement>(null);

	const checkCannotSubmit = () => {
		const isValid = nameField.current?.checkValidity() &&
			descField.current?.checkValidity() &&
			locationField.current?.checkValidity() &&
			bioField.current?.checkValidity() &&
			imgUrlField.current?.checkValidity();
		if(submitElem.current)
			submitElem.current.disabled = !isValid;
	};

	const handleAction = (...args: Parameters<typeof formAction>) => {
		formAction(...args);
		router.refresh();
	}

	return (
		< >
		{
			formShown ?
			<form action={handleAction} className={styles.requestForm}>
				<p>Enter your information below to request an artisan account.</p>
				<label>
					Artisan Name (What you want to be known as?)
					<input ref={nameField} type="text" autoComplete="name" name="name" onInput={checkCannotSubmit} required />
				</label>
				<label>
					Short Description (What do you make/do?)
					<input ref={descField} type="text" name="short_description" onInput={checkCannotSubmit} required />
				</label>
				<label>
					Location (What city/state/country do you operate out of?)
					<input ref={locationField} type="text" name="location" onInput={checkCannotSubmit} required />
				</label>
				<label>
					Bio (What do you want people to know about you?)
					<textarea ref={bioField} name="bio" rows={4} onInput={(e) => {
						if(!bioField.current) return;
						bioField.current.rows = 4;
						while(bioField.current.scrollHeight > bioField.current.clientHeight) {
							bioField.current.rows ++;
						}
						checkCannotSubmit();
					}}>
					</textarea>
				</label>
				<label>
					Profile Image URL
					<input ref={imgUrlField} type="url" name="profile_image_url" onInput={checkCannotSubmit} required />
					{/*
						In a professional context, users should be able to upload images
						and those are used instead of having users give urls to already
						published images, though we do not have file transfer/storage
						setup so we can't implement that.
					*/}
				</label>
				<input ref={submitElem} type="submit" value="Request Artisan Account" disabled={cannotSubmit || isPending} />
			</form> :
			<button onClick={() => {setFormShown(true);}} className={styles.requestBtn}>
				Request an Artisan Account
			</button>
		}
		</ >
	);
}
{/*
name
bio
location
profile_image_url
*/}