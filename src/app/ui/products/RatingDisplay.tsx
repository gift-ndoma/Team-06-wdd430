'use client'

import Star from "@/app/ui/products/Star";
import styles from "./product.module.css";
import { useState } from 'react';

export default function RatingDisplay({
	value = 0
}: {
	value: number
}) {
	const stars=[];
	for(let i = 1; i <= 5; i++) {
		stars.push(
			<label key={i}>
				<input
					type="radio"
					aria-label={`${value} star${value == 1 ? '' : 's'}.`}
					checked={value == i}
					value={i}
					disabled={true}
				/>
				<Star />
			</label>
		);
	}
	return (
		<div className={styles.starDisplay}>
			{stars}
		</div>
	);
}