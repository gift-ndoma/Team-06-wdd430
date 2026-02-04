import HeroImage from "@/app/ui/home/HeroImage";
import About from "@/app/ui/home/About";
import WhyShop from "@/app/ui/home/WhyShop";
import FeaturedProducts from "@/app/ui/home/FeaturedProducts";
import MeetArtisans from "@/app/ui/home/MeetArtisans";

import {
  getRandomFeaturedProducts,
  getRandomArtisans,
} from "@/library/queries";

export default async function Home() {
  // Fetch homepage data from the database
  const [products, artisans] = await Promise.all([
    getRandomFeaturedProducts(3),
    getRandomArtisans(3),
  ]);

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

