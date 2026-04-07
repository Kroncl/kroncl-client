import styles from './layout.module.scss';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { SubFooter } from "./components/sub-footer/sub-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        <div className={styles.content}>{children}</div>
        <Footer />
        <SubFooter />
    </>
  );
}