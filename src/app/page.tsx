import HeroImage from "@/app/ui/home/HeroImage";
import About from "@/app/ui/home/About";
import WhyShop from "@/app/ui/home/WhyShop";
import FeaturedProducts from "@/app/ui/home/FeaturedProducts";
import MeetArtisans from "@/app/ui/home/MeetArtisans";

import { getRandomFeaturedProducts } from "@/library/queries";
import { mockArtisans, mockProducts } from "@/library/mock-data";

export default async function Home() {
  let products = mockProducts.slice(0, 3);
  const artisans = mockArtisans.slice(0, 3);

  try {
    const dbProducts = await getRandomFeaturedProducts(3);
    if (dbProducts.length > 0) products = dbProducts;
  } catch {
    console.warn("DB not ready, using mock data.");
  }


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

