'use client'

import RatingRadioBtns from "@/app/ui/products/RatingRadioBtns";
import type { User } from '@/app/lib/definitions';
import styles from "./product.module.css";
import { submitReview } from "@/app/lib/actions";
import { useState, useActionState, useRef } from 'react';
import { useRouter } from "next/navigation";

export default function ReviewForm({
	productId,
	user,
}: {
	productId: string
	user: User | null
}) {
	const [formShown, setFormShown] = useState(false);
	const [cannotSubmit, setCannotSubmit] = useState(true);
	const [errorMessage, formAction, isPending] = useActionState(
		submitReview,
		undefined,
	);
	const router = useRouter();
	const nameField = useRef<HTMLInputElement>(null);
	const reviewBody = useRef<HTMLTextAreaElement>(null);
	const submitElem = useRef<HTMLInputElement>(null);

	const handleAction = (...args: Parameters<typeof formAction>) => {
		formAction(...args);
		setFormShown(false);
		router.refresh();
	}

	return (
		< >
		{
			formShown ?
			< >
				<form action={handleAction} className={styles.reviewForm}>
					<p>Please give us your rating</p>
					<RatingRadioBtns name="rating" onInput={() => submitElem.current && setCannotSubmit(false)} />
					<label>
						You may also write a review below
						<textarea ref={reviewBody} name="body" rows={4} onInput={(e) => {
							if(!reviewBody.current) return;
							reviewBody.current.rows = 4;
							while(reviewBody.current.scrollHeight > reviewBody.current.clientHeight) {
								reviewBody.current.rows ++;
							}
						}}>
						</textarea>
					</label>
					<input name="product_id" value={productId} type="hidden" />
					<input ref={submitElem} type="submit" value="Post Your Rating" disabled={cannotSubmit || isPending} />
				</form>
				<button onClick={() => {setFormShown(false);}} className={styles.ratingBtn}>
					Cancel
				</button>
			</ > :
			<button onClick={() => {setFormShown(true);}} className={styles.ratingBtn}>
				Give a rating
			</button>
		}
		</ >
	);
}