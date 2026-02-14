import { sql } from '@/library/db';
import styles from './profile.module.css';

type ArtisanProfile = {
  id: string;
  name: string;
  bio: string;
  location: string;
  profile_image_url: string;
  slug?: string;
  short_description?: string;
};

async function getArtisanByEmail(email: string): Promise<ArtisanProfile | null> {
  try {
    const user = await sql<{ id: number; name: string }[]>`
      SELECT id, name FROM users WHERE email = ${email}
    `;
    
    if (!user || user.length === 0) return null;
    
    // First try to match by user_id (proper relationship)
    let artisan = await sql<ArtisanProfile[]>`
      SELECT * FROM artisans WHERE user_id = ${user[0].id}
    `;
    
    // Fallback to name matching (temporary until all artisans are linked)
    if (!artisan || artisan.length === 0) {
      artisan = await sql<ArtisanProfile[]>`
        SELECT * FROM artisans WHERE name = ${user[0].name}
      `;
    }
    
    return artisan[0] || null;
  } catch (error) {
    console.error('Failed to fetch artisan:', error);
    return null;
  }
}

export default async function ProfilePage() {
  // For demo purposes, showing first artisan
  // In production, you'd identify the artisan by session/auth
  const artisans = await sql<ArtisanProfile[]>`
    SELECT * FROM artisans LIMIT 1
  `;
  
  const artisan = artisans[0];

  if (!artisan) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Artisan Profile Not Found</h1>
          <p>Your account is not linked to an artisan profile yet.</p>
          <p>Please contact support to set up your artisan profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Profile</h1>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.imageSection}>
          <img 
            src={artisan.profile_image_url} 
            alt={artisan.name}
            className={styles.profileImage}
          />
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoRow}>
            <label>Name</label>
            <p>{artisan.name}</p>
          </div>

          <div className={styles.infoRow}>
            <label>Location</label>
            <p>{artisan.location}</p>
          </div>

          {artisan.slug && (
            <div className={styles.infoRow}>
              <label>Profile URL</label>
              <p>/artisans/{artisan.slug}</p>
            </div>
          )}

          <div className={styles.infoRow}>
            <label>Bio</label>
            <p className={styles.bio}>{artisan.bio}</p>
          </div>

          {artisan.short_description && (
            <div className={styles.infoRow}>
              <label>Short Description</label>
              <p>{artisan.short_description}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.editBtn} disabled>
          Edit Profile (Coming Soon)
        </button>
      </div>
    </div>
  );
}
