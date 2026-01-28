import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted items made with love by talented artisans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main style={{ paddingTop: '70px', minHeight: 'calc(100vh - 70px)' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
