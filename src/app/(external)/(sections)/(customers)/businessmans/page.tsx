// meta
import { Metadata } from 'next';
import { getMetaConfig } from '@/config/meta.config';
export const metadata: Metadata = getMetaConfig('businessmans')

import { AnalyticsBlock } from './blocks/analytics/block';
import { GradientBlock } from './blocks/gradient/block';
import { ReadyToStartBlock } from './blocks/ready-to-start/block';
import { ReportsBlock } from './blocks/reports/block';
import styles from './page.module.scss';
import { StartBlock } from '../(product)/components/start/block';
import { Pin } from '../../(about)/pins/2026/pin';
import { PinsManager } from '../../(about)/pins/manager';
import { QuickLinksBlock } from '@/app/(external)/components/quick-links/quick-links';
import { linksList } from './_links';

export default function Page() {
    return (
        <>
        <PinsManager />
        <div className={styles.container}>
            <div className={styles.grid}>
                <StartBlock
                    className={styles.block}
                    title='Место, где дело процветает.'
                    description='Управленческий учёт для предпринимателей'
                />

                <GradientBlock />
                <div className={styles.benefitsGrid}>
                    <AnalyticsBlock className={styles.block} />
                    <ReportsBlock className={styles.block} />
                </div>

                <QuickLinksBlock links={linksList} className={styles.block} />
                <ReadyToStartBlock className={styles.block} />
            </div>
        </div>
        </>
    )
}