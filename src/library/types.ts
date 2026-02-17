export type Product = {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string;
  artisan_id: string | null;
  artisan_name: string | null;
  artisan_slug: string | null;
};

export type Artisan = {
  id: string;
  name: string;
  bio: string;
  location: string;
  profile_image_url: string;
};
