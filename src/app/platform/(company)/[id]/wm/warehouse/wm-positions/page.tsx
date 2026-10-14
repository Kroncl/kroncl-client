'use client'

import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { sectionsList } from '../_sections';
import { DOCS_LINK_WM } from '@/app/docs/(v1)/internal.config';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;

    return (
        <>
        <PlatformHead
            title='Товары на складе'
            description="Управление товарами на складе."
            sections={sectionsList(companyId)}
            docsEscort={{
                href: DOCS_LINK_WM,
                title: 'Подробнее о каталоге & складе'
            }}
            showSearch={true}
        />
        </>
    )
}