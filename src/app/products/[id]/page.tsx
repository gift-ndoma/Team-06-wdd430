import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductById } from "@/library/queries";
import { mockProducts } from "@/library/mock-data";
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
            <p className={styles.price}>{formatPrice(product.price_cents)}</p>
            <p className={styles.description}>{product.description}</p>

            {product.artisan_name && (
              <p className={styles.artisan}>
                Made by{" "}
                <Link href={`/artisans/${product.artisan_id}`} className={styles.artisanLink}>
                  {product.artisan_name}
                </Link>
              </p>
            )}

            <button type="button" className={styles.addToCartBtn}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
