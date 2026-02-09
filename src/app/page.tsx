import HeroImage from "@/app/ui/home/HeroImage";
import About from "@/app/ui/home/About";
import WhyShop from "@/app/ui/home/WhyShop";
import FeaturedProducts from "@/app/ui/home/FeaturedProducts";
import MeetArtisans from "@/app/ui/home/MeetArtisans";

import { getRandomFeaturedProducts } from "@/library/queries";
import { mockProducts } from "@/library/mock-data";

import { getHomeArtisans } from "@/app/lib/artisans-db";

export default async function Home() {
  let products = mockProducts.slice(0, 3);

  try {
    const dbProducts = await getRandomFeaturedProducts(3);
    if (dbProducts.length > 0) products = dbProducts;
  } catch {
    console.warn("DB products not ready, using mock data.");
  }

  // Use the real database for artisans
  const artisans = await getHomeArtisans(3);

  return (
    <>
      <HeroImage />
      <About />
      <FeaturedProducts products={products} />
      <WhyShop />
      <MeetArtisans artisans={artisans} />
    </>
  );
}
