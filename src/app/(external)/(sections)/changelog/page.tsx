// meta
import { Metadata } from 'next';
import { getMetaConfig } from '@/config/meta.config';
export const metadata: Metadata = getMetaConfig('changelog')

import styles from './page.module.scss';
import { StartBlock } from '../(customers)/(product)/components/start/block';
import { ReadyToStartBlock } from '../(customers)/businessmans/blocks/ready-to-start/block';
import clsx from 'clsx';
import { changelogs } from '@/apps/changelog/logs';
import { ChangelogManager } from './components/manager';

export default function Page() {
    return (
        <>
        <div className={styles.container}>
            <div className={styles.grid}>
                <StartBlock
                    className={styles.block}
                    title='История обновлений'
                    description='Наши результаты и планы на будущее'
                />

                <div className={clsx(styles.block, styles.logs)}>
                    {changelogs.map((log, index) => (
                        <ChangelogManager 
                            key={index}
                            log={log}
                            className={styles.item}
                        />
                    ))}
                </div>

                <ReadyToStartBlock className={styles.block} />
            </div>
        </div>
        </>
    )
}