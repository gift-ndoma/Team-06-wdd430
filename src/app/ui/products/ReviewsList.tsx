import RatingDisplay from "@/app/ui/products/RatingDisplay";
import { getReviewsByProductId } from "@/library/queries";
import styles from "./product.module.css";
import type { Product } from "@/library/types";
import Star from "@/app/ui/products/Star";

export default async function ReviewsList({
	product
}: {
	product: Product
}) {
	const reviewResult = await getReviewsByProductId(product.id);
	if(reviewResult == null) return;

	return (
		< >
			{
				reviewResult.ratingsCount && product.rating != null && (<p className={styles.ratingsCount}>
					{(product.rating*1).toFixed(2)}<Star filled={true} /> based on {reviewResult.ratingsCount} ratings.
				</p>)
			}
			{
				reviewResult.reviewsCount ?
				< >
					<p className={styles.reviewsLabel}>Reviews:</p>
					<div className={styles.list}>
						{reviewResult.reviews.map(review => (
							<div key={review.id} className={styles.review}>
								<p>{review.name}</p>
								<RatingDisplay value={review.rating} />
								<p>{review.body}</p>
							</div>
						))}
					</div>
				</ > :
				<p className={styles.noneNote}>No reviews yet!</p>
			}
		</ >
	);
}