'use client';

import styles from './page.module.scss';
import { DOCS_LINK_COMPANIES_ACCESSES } from "@/app/docs/(v1)/internal.config";
import { PlatformHead } from "@/app/platform/components/lib/head/head";

export default function Page() {
    return (
        <>
        <PlatformHead
            title='Приглашения'
            description="Входящие и исходящие приглашения в организации."
            docsEscort={{
                href: DOCS_LINK_COMPANIES_ACCESSES,
                title: 'Подробнее о доступах к организациям.'
            }}
        />
        <div className={styles.grid}>

        </div>
        </>
    )
}