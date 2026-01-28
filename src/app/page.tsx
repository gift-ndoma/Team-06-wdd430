import HeroImage from "@/app/ui/home/HeroImage";
import About from "@/app/ui/home/About";
import WhyShop from "@/app/ui/home/WhyShop";
import FeaturedProducts from "@/app/ui/home/FeaturedProducts";
import MeetArtisans from "@/app/ui/home/MeetArtisans";

//import { getRandomArtisans, getRandomFeaturedProducts } from "@/library/queries";
import { mockArtisans, mockProducts } from "@/library/mock-data";

/*export default async function Home() {
  const [products, artisans] = await Promise.all([
    getRandomFeaturedProducts(4),
    getRandomArtisans(3),
  ]);*/

  export default async function Home() {
  // Default to mocks
  let products = mockProducts.slice(0, 3);
  let artisans = mockArtisans.slice(0, 3);

  // Only try DB if you set USE_DB=true
  if (process.env.USE_DB === "true") {
    const { getRandomArtisans, getRandomFeaturedProducts } = await import(
      "@/library/queries"
    );

    try {
      [products, artisans] = await Promise.all([
        getRandomFeaturedProducts(3),
        getRandomArtisans(3),
      ]);
    } catch  {
      // If DB fails, silently fall back to mock data
      console.warn("DB not ready, using mock data.");
    }
  }


  return (
    < >
      <HeroImage />
      <About />
      <FeaturedProducts products={products.slice(0, 3)} />
      <WhyShop />
      <MeetArtisans artisans={artisans} />
    </ >
  );
}
