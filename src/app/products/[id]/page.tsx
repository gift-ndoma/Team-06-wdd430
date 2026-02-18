import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/library/queries";
import { mockProducts } from "@/library/mock-data";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductReviews from "@/app/ui/products/ProductReviews";
import RatingDisplay from "@/app/ui/products/RatingDisplay";
import styles from "./product.module.css";

function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
  }).format(cents / 100);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Try database first, fallback to mock
  let product = await getProductById(id);

  if (!product) {
    product = mockProducts.find((p) => p.id === id) ?? null;
  }

  if (!product) {
    notFound();
  }

  return (
    < >
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
            {
              product.rating != null && <div className={styles.rating}>{(product.rating*1).toFixed(2)} / 5.0 <RatingDisplay value={Math.round(product.rating)} /></div>
            }
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
      </div>
      <ProductReviews product={product} />
    </ >
  );
}
