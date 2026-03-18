'use client';

import { DocsSidePanel } from '../side-panel/panel';
import { DocsBreadcrumbs } from './breadcrumbs/block';
import styles from './content.module.scss';

export interface DocsContentProps {
    className?: string;
    children?: React.ReactNode;
}

export function DocsContent({
    className,
    children
}: DocsContentProps) {
    return (
        <div className={styles.content}>
            <DocsBreadcrumbs />
            <div className={styles.canvas}>
                {children}
            </div>
            <DocsSidePanel className={styles.navigation} />
        </div>
    )
}