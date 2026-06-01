// meta
import type { Metadata, Viewport } from "next";
import { defaultMeta, organizationSchema, webSiteSchema } from "@/config/meta.config";

export const metadata: Metadata = {
  title: defaultMeta.title,
  description: defaultMeta.description,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

import '@/assets/styles/main.scss';
import styles from './layout.module.scss';
import Providers from "./providers";
import ScrollToTop from "./ScrollToTop";
import ThemeScript from "@/assets/utils/theme";
import JsonLd from "./components/JsonLd/JsonLd";

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={styles.layout} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo/base.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-navbutton-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        <JsonLd data={webSiteSchema} />
        <JsonLd data={organizationSchema} />
      </head>
      <body className={styles.container} suppressHydrationWarning>
        <ThemeScript />
        <Providers>
            {children}
        </Providers>
      </body>
    </html>
  );
}