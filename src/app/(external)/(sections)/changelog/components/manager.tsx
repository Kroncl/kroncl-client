'use client';

import clsx from "clsx";
import styles from './manager.module.scss';
import { changelogs } from "@/apps/changelog/logs";
import Link from "next/link";
import { ChangelogItem, getChangelogStatusLabel } from "@/apps/changelog/types";

export interface ChangelogManagerProps {
    className?: string;
    log: ChangelogItem;
}

export function ChangelogManager({
    className,
    log
}: ChangelogManagerProps) {
    return (
        <Link href='/changelog' className={clsx(styles.container, className)}>
            <div className={clsx(styles.indicator, styles[log.status])}><span /></div>
            <div className={styles.info}>
                <div className={styles.capture}>{log.title} <span className={clsx(styles.tag, styles[log.status])}>{getChangelogStatusLabel(log.status)}</span> <span className={clsx(styles.tag, styles[log.status])}>v{log.version}</span></div>
                <div className={styles.description}>{log.description}</div>
            </div>
        </Link>
    )
}