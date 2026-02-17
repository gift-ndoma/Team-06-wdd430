// src/library/mock-data.ts
import type { Artisan, Product } from "./types";

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Handmade Clay Mug",
    description: "Stoneware mug with a smooth satin glaze.",
    price_cents: 3200,
    image_url: "/images/product-1.jpg",
    artisan_id: "a1",
    artisan_name: "Mila Rangi",
    artisan_slug: "mila-rangi",
  },
  {
    id: "p2",
    name: "Handwoven Tote",
    description: "Durable tote with woven strap detail.",
    price_cents: 4500,
    image_url: "/images/product-2.jpg",
    artisan_id: "a2",
    artisan_name: "Aroha Kauri",
    artisan_slug: "aroha-kauri",
  },
  {
    id: "p3",
    name: "Wooden Serving Board",
    description: "Sanded and sealed for everyday use.",
    price_cents: 5900,
    image_url: "/images/product-3.jpg",
    artisan_id: "a3",
    artisan_name: "Noah Tevita",
    artisan_slug: "noah-tevita",
  },
  {
    id: "p4",
    name: "Macramé Plant Hanger",
    description: "Natural cotton cord, handmade knots.",
    price_cents: 2800,
    image_url: "/images/product-4.jpg",
    artisan_id: "a2",
    artisan_name: "Aroha Kauri",
    artisan_slug: "aroha-kauri",
  },
];

export const mockArtisans: Artisan[] = [
  {
    id: "a1",
    name: "Mila Rangi",
    bio: "Handmade ceramics inspired by Aotearoa landscapes.",
    location: "Auckland, NZ",
    profile_image_url: "/images/artisan-1.jpg",
  },
  {
    id: "a2",
    name: "Aroha Kauri",
    bio: "Textile artist weaving modern patterns with traditional techniques.",
    location: "Wellington, NZ",
    profile_image_url: "/images/artisan-2.jpg",
  },
  {
    id: "a3",
    name: "Noah Tevita",
    bio: "Woodworker crafting heirloom pieces with native timbers.",
    location: "Hamilton, NZ",
    profile_image_url: "/images/artisan-3.jpg",
  },
];
