// meta
import { Metadata } from 'next';
import { getMetaConfig } from '@/config/meta.config';
export const metadata: Metadata = getMetaConfig('dev')

import styles from './page.module.scss';
import { StartBlock } from './slides/start-block/block';
import { ApiBlock } from './slides/api-block/block';
import { PinsManager } from '../../(about)/pins/manager';

export default function Page() {
    return (
        <>
        <PinsManager />
        <div className={styles.container}>
            <div className={styles.grid}>
                <StartBlock className={styles.block} />
                <ApiBlock className={styles.block} />
            </div>
        </div>
        </>
    )
}