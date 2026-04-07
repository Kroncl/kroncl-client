'use client';

import styles from './../page.module.scss';
import { OverviewBlock } from './slides/overview/block';

export default function Page() {
    return (
        <>
        <OverviewBlock className={styles.overview} />
        <div className={styles.container}>
            <div className={styles.grid}>
                <div className={styles.aboutGrid}>
                    <div className={styles.col}>
                        <div className={styles.block} />
                        <div className={styles.block} />
                        <div className={styles.block} />
                        <div className={styles.block} />
                        <div className={styles.block} />
                    </div>
                    <div className={styles.col}>
                        <div className={styles.block} />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}