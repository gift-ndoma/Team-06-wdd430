import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import getUser from '@/app/lib/getUser';

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted items made with love by talented artisans",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header user={await getUser()} />
          <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
