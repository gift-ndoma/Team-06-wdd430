'use client'

import Star from "@/app/ui/products/Star";
import styles from "./product.module.css";
import { useState } from 'react';

export default function RatingRadioBtns({
	name,
	initialValue = 0,
	onInput,
}: {
	name: string,
	initialValue?: number,
	onInput?: () => any | undefined,
}) {
	const [currentValue, setCurrentValue] = useState(initialValue);

	const stars=[];
	for(let i = 1; i <= 5; i++) {
		stars.push(
			<label key={i}>
				<input
					type="radio"
					name={name}
					aria-label={`Set ${i} star${i == 1 ? '' : 's'}.`}
					checked={currentValue == i}
					onChange={() => setCurrentValue(i)}
					value={i}
					onInput={onInput}
				/>
				<Star />
			</label>
		);
	}
	return (
		<div className={styles.starRadioBtns}>
			{stars}
		</div>
	);
}