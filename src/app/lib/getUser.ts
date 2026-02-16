import { cache } from "react";
import { auth } from "@/auth";
import { sql } from "@/library/db";
import type { User } from '@/app/lib/definitions';

export default cache(async (): Promise<User | null> => {
  const session = await auth();

  if (!session?.user?.id) return null;

  try {
    const user = await sql<User[]>`SELECT id, name, email, address, artisan_id FROM users WHERE id=${session.user.id}`;
    return user[0] ?? null;
  }
  catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
});