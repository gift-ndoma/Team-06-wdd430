import { getAllProducts } from "@/library/queries";
import { mockProducts } from "@/library/mock-data";
import ProductCard from "@/components/ui/ProductCard";
import styles from "./products.module.css";

export default async function ProductsPage() {
  let products = mockProducts;

  try {
    const dbProducts = await getAllProducts();
    if (dbProducts.length > 0) products = dbProducts;
  } catch {
    console.warn("DB not ready, using mock data.");
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>All Products</h1>
        <p className={styles.subtitle}>Browse our handcrafted collection</p>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
