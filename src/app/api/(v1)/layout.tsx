// meta
import { Metadata } from 'next';
import { getMetaConfig } from '@/config/meta.config';
export const metadata: Metadata = getMetaConfig('api')

import styles from './layout.module.scss';
import { DevPanel } from '../components/panel/panel';
import { CommunityHeader } from '../components/header/header';
import { DevSidebarProvider } from '../components/panel/context/context';
import { DevContent } from '../components/content/content';
import { navigationSections } from './navigation.config';

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DevSidebarProvider>
        <div className={styles.container}>
          <CommunityHeader className={styles.header} />
          <div className={styles.focus}>
            <DevPanel className={styles.panel} navigation={navigationSections} />
            <DevContent className={styles.content} navigation={navigationSections}>{children}</DevContent>
          </div>
        </div>
      </DevSidebarProvider>
    </>
  );
}