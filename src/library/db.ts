import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Missing POSTGRES_URL in environment variables.");
}

// If you're using a non-SSL local DB, set ssl: false
export const sql = postgres(connectionString, {
  ssl: connectionString.includes("sslmode=require") ? "require" : false,
});
