// meta
import { Metadata } from 'next';
import { getMetaConfig } from '@/config/meta.config';
export const metadata: Metadata = getMetaConfig('product-papers')

import styles from './layout.module.scss';
import { SubHeader } from './components/sub-header/block';

export default function PapersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <SubHeader className={styles.subHeader} title='Правовые документы' />
    <div className={styles.content}>
        <div className={styles.focus}>
            <div className={styles.mdx}>{children}</div>
        </div>
    </div>
    </>
  );
}