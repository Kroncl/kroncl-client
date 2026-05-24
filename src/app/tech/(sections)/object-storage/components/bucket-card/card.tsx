'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import { SchemaListItem } from "@/apps/admin/db/types";
import Link from "next/link";
import { BucketInfo } from "@/apps/admin/media/types";
import { formatDateTime } from "@/assets/utils/date";

export interface BucketCardProps {
    className?: string;
    bucket: BucketInfo;
}

export function BucketCard({
    className,
    bucket
}: BucketCardProps) {
    return (
        <Link href={`/tech/object-storage/buckets/${bucket.name}`} className={clsx(styles.container, className, bucket.is_public && styles.public )}>
            <div className={styles.name}>{bucket.name}</div>
            <div className={styles.tags}>
                {(bucket.is_public || bucket.is_temp) && (
                    <span className={clsx(styles.tag, styles.accent)}>Системный</span>
                )}
                <span className={clsx(styles.tag, bucket.size_mb > 1024 && styles.red)}>{(bucket.size_mb.toFixed(2))} МБ</span>
                <span className={clsx(styles.tag, bucket.objects_count > 5000 && styles.red)}>{bucket.objects_count} объектов</span>
                <span className={clsx(styles.tag)}>{formatDateTime(bucket.creation_date)}</span>
            </div>
        </Link>
    )
}