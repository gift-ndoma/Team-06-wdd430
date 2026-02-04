import styles from "@/app/user/page.module.css";

export default function userLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.main}>
      {children}
    </div>
  );
}
