'use client';

import { ApiKeyListItem } from "@/apps/account/api-keys/types";
import clsx from "clsx";
import styles from './card.module.scss';
import { formatDateTime } from "@/assets/utils/date";
import Link from "next/link";

export interface AppCardProps {
    className?: string;
    app: ApiKeyListItem;
}

export function AppCard({
    className,
    app
}: AppCardProps) {
    return (
        <Link href={`/api/apps/${app.id}`} className={clsx(styles.card, className)}>
            <div className={styles.name}>{app.name}</div>
            <div className={styles.key}>{app.key_prefix}</div>
            <div className={styles.date}>Истекает: {app.expires_at ? formatDateTime(app.expires_at) : 'бессрочно'}</div>
        </Link>
    )
}