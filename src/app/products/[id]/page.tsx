import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById, getReviewsByProductId } from "@/library/queries";
import { mockProducts } from "@/library/mock-data";
import AddToCartButton from "@/components/cart/AddToCartButton";
import type { Review } from "@/library/types";
import styles from "./product.module.css";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(cents / 100);
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null;
  return new Intl.DateTimeFormat("en-NZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  const rounded = Math.round(Number(rating));
  return (
    <span className={styles.stars} aria-label={`${rounded} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Try database first, fallback to mock
  let product = await getProductById(id);
  let reviews: Review[] = [];

  if (!product) {
    product = mockProducts.find((p) => p.id === id) ?? null;
  } else {
    reviews = await getReviewsByProductId(id);
  }

  if (!product) {
    notFound();
  }

  const numericRating = product.rating !== null ? Number(product.rating) : null;
  const validRating = numericRating !== null && !isNaN(numericRating) ? numericRating : null;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/products" className={styles.backLink}>
          ← Back to products
        </Link>

        <div className={styles.productLayout}>
          <div className={styles.imageWrap}>
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.details}>
            <h1>{product.name}</h1>

            {validRating !== null && (
              <div className={styles.ratingRow}>
                <Stars rating={validRating} />
                <span className={styles.ratingValue}>{validRating.toFixed(1)}</span>
                <span className={styles.ratingCount}>
                  ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            <p className={styles.price}>{formatPrice(product.price_cents)}</p>
            <p className={styles.description}>{product.description}</p>

            {product.artisan_name && (
              <p className={styles.artisan}>
                Made by{" "}
                <Link href={`/artisans/${product.artisan_slug}`} className={styles.artisanLink}>
                  {product.artisan_name}
                </Link>
              </p>
            )}

            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price_cents: product.price_cents,
                image_url: product.image_url,
              }}
              className={styles.addToCartBtn}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <section className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>
            Customer Reviews
            {reviews.length > 0 && (
              <span className={styles.reviewsBadge}>{reviews.length}</span>
            )}
          </h2>

          {reviews.length === 0 ? (
            <p className={styles.noReviews}>No reviews yet. Be the first to review this product!</p>
          ) : (
            <div className={styles.reviewsList}>
              {reviews.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <Stars rating={review.rating} size={14} />
                    <span className={styles.reviewRating}>{review.rating}/5</span>
                    {formatDate(review.created_at) && (
                      <span className={styles.reviewDate}>{formatDate(review.created_at)}</span>
                    )}
                  </div>
                  {review.comment && (
                    <p className={styles.reviewComment}>{review.comment}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
