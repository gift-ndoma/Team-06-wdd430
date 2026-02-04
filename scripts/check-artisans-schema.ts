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
    const cols = await sql`
      select column_name, data_type
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'artisans'
      order by ordinal_position;
    `;
    console.log("✅ public.artisans columns:");
    console.table(cols);
  } catch (err) {
    console.error("❌ Schema check failed:", err);
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main();
