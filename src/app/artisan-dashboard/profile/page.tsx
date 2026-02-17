import { sql } from '@/library/db';
import styles from './profile.module.css';
import { getArtisanByEmail } from '../actions';
import getUser from '@/app/lib/getUser';

export default async function ProfilePage() {
  const user = await getUser();
  const artisan = user ? await getArtisanByEmail(user.email) : null;

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
