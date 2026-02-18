import type { Product } from "@/library/types";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import getUser from '@/app/lib/getUser';
import styles from "./product.module.css";

export default async function ProductReviews({
	product
}: {
	product: Product
}) {
	const user = await getUser();

	return (
		<div className={styles.container}>
			<ReviewForm productId={product.id} user={user} />
			<hr className={styles.divider} />
			<ReviewsList product={product} />
		</div>
	);
}