import path from "node:path";
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing POSTGRES_URL or POSTGRES_URL_NON_POOLING in .env.local");
}

const sql = postgres(connectionString, { ssl: "require" });

type SeedArtisan = {
  id: string;                // current PKs like a1/a2/a3
  name: string;
  bio: string;
  location: string;          // ✅ matches your table
  profile_image_url: string; // ✅ matches your table
};

type SeedProduct = {
  id: string;
  artisan_id: string;
  artisan_name: string;
  name: string;
  description: string;
  price_cents: number;       // ✅ matches your products table
  image_url: string;         // ✅ matches your products table
};

// Use your existing IDs from DB so we update the same rows
const artisans: SeedArtisan[] = [
  {
    id: "a1",
    name: "Mila Rangi",
    bio: "Mila creates durable, everyday ceramics inspired by Aotearoa landscapes. Each piece is wheel-thrown and glazed by hand.",
    location: "Auckland, NZ",
    profile_image_url: "/images/Logo 3.svg",
  },
  {
    id: "a2",
    name: "Aroha Kauri",
    bio: "Aroha makes hand-finished wooden pieces using sustainably sourced timber, blending tradition with modern form.",
    location: "Wellington, NZ",
    profile_image_url: "/images/file.svg",
  },
  {
    id: "a3",
    name: "Noah Tevita",
    bio: "Noah formulates gentle skincare using locally sourced botanicals, made in small batches for freshness.",
    location: "Christchurch, NZ",
    profile_image_url: "/images/globe.svg",
  },
];

const products: SeedProduct[] = [
  // Mila (a1)
  {
    id: "p-mila-mug",
    artisan_id: "a1",
    artisan_name: "Mila Rangi",
    name: "Stoneware Mug",
    description: "Hand-thrown mug with a glossy glaze finish.",
    price_cents: 2800,
    image_url: "/images/next.svg",
  },
  {
    id: "p-mila-bowl",
    artisan_id: "a1",
    artisan_name: "Mila Rangi",
    name: "Small Bowl",
    description: "Perfect for snacks, dips, or a side serving.",
    price_cents: 2200,
    image_url: "/images/vercel.svg",
  },

  // Aroha (a2)
  {
    id: "p-aroha-keychain",
    artisan_id: "a2",
    artisan_name: "Aroha Kauri",
    name: "Carved Keychain",
    description: "Small carved piece, sanded and sealed for durability.",
    price_cents: 1200,
    image_url: "/images/window.svg",
  },
  {
    id: "p-aroha-board",
    artisan_id: "a2",
    artisan_name: "Aroha Kauri",
    name: "Serving Board",
    description: "A smooth serving board finished with food-safe oil.",
    price_cents: 3800,
    image_url: "/images/globe.svg",
  },

  // Noah (a3)
  {
    id: "p-noah-balm",
    artisan_id: "a3",
    artisan_name: "Noah Tevita",
    name: "Body Balm",
    description: "Rich balm for dry skin, made with botanical oils.",
    price_cents: 1800,
    image_url: "/images/file.svg",
  },
  {
    id: "p-noah-soap",
    artisan_id: "a3",
    artisan_name: "Noah Tevita",
    name: "Soap Bar",
    description: "Gentle cleansing soap bar, lightly scented.",
    price_cents: 900,
    image_url: "/images/next.svg",
  },
];

async function main() {
  console.log("🌱 Seeding artisans + products…");

  try {
    await sql.begin(async (tx) => {
      const q = tx as unknown as typeof sql;

      // Upsert artisans
      for (const a of artisans) {
        await q`
          insert into artisans (id, name, bio, location, profile_image_url)
          values (${a.id}, ${a.name}, ${a.bio}, ${a.location}, ${a.profile_image_url})
          on conflict (id) do update set
            name = excluded.name,
            bio = excluded.bio,
            location = excluded.location,
            profile_image_url = excluded.profile_image_url;
        `;
      }

      // Upsert products (matches your products schema)
      for (const p of products) {
        await q`
          insert into products (id, name, description, price_cents, image_url, artisan_id, artisan_name)
          values (${p.id}, ${p.name}, ${p.description}, ${p.price_cents}, ${p.image_url}, ${p.artisan_id}, ${p.artisan_name})
          on conflict (id) do update set
            name = excluded.name,
            description = excluded.description,
            price_cents = excluded.price_cents,
            image_url = excluded.image_url,
            artisan_id = excluded.artisan_id,
            artisan_name = excluded.artisan_name;
        `;
      }
    });

    console.log("✅ Seed complete.");
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main();
