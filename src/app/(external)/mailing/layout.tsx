// meta
import { Metadata } from 'next';
import { getMetaConfig } from '@/config/meta.config';
export const metadata: Metadata = getMetaConfig('mailing')

export default function MailingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
    </>
  );
}