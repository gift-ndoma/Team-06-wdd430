import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing POSTGRES_URL in environment variables.");
}

// Shared singleton pool — keep max low to avoid exhausting Supabase's
// free-tier connection limit. prepare:false is required for PgBouncer
// transaction-mode pooling.
export const sql = postgres(connectionString, {
  ssl: connectionString.includes("sslmode=require") ? "require" : false,
  max: 5,
  prepare: false,
});


