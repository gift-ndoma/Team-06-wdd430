import path from "node:path";
import dotenv from "dotenv";
import postgres from "postgres";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const connectionString =
  process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;

if (!connectionString) throw new Error("Missing POSTGRES_URL");

const sql = postgres(connectionString, { ssl: "require" });

async function main() {
  try {
    const artisanCount = await sql<{ count: number }[]>`
      select count(*)::int as count from artisans;
    `;

    const productCount = await sql<{ count: number }[]>`
      select count(*)::int as count from products;
    `;

    console.log(`✅ Artisan count: ${artisanCount[0]?.count ?? 0}`);
    console.log(`✅ Product count: ${productCount[0]?.count ?? 0}`);

    const artisans = await sql`
      select id, slug, name
      from artisans
      order by name;
    `;
    console.log("\n✅ Artisans:");
    console.table(artisans);

    const perArtisan = await sql`
      select artisan_id, artisan_name, count(*)::int as product_count
      from products
      group by artisan_id, artisan_name
      order by artisan_name;
    `;
    console.log("\n✅ Products per artisan:");
    console.table(perArtisan);

    const duplicates = await sql`
      select id, count(*)::int as occurrences
      from products
      group by id
      having count(*) > 1
      order by occurrences desc, id;
    `;
    console.log("\n✅ Duplicate product IDs (should be empty):");
    console.table(duplicates);

    const sample = await sql`
      select id, artisan_id, artisan_name, name, price_cents
      from products
      order by artisan_name, name
      limit 15;
    `;
    console.log("\n✅ Sample products (first 15):");
    console.table(sample);
  } catch (err) {
    console.error("❌ Query failed:", err);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main();
