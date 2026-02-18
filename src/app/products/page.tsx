import { getAllProducts } from "@/library/queries";
import { mockProducts } from "@/library/mock-data";
import ProductFilter from "@/components/ui/ProductFilter";
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
        <ProductFilter products={products} />
      </div>
    </main>
  );
}
