import { cache } from "react";
import { auth } from "@/auth";
import { sql } from "@/library/db";
import type { UserSlug } from '@/app/lib/definitions';

export default cache(async (): Promise<UserSlug | null> => {
  const session = await auth();

  if (!session?.user?.id) return null;

  try {
    const user = await sql<UserSlug[]>`SELECT users.id, users.name, email, address, artisan_id, slug FROM users LEFT JOIN artisans ON artisan_id = artisans.id WHERE users.id=${session.user.id}`;
    return user[0] ?? null;
  }
  catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
});