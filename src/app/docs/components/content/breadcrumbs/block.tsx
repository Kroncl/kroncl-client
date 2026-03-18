'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './block.module.scss';
import { JSX } from 'react';
import { getBreadcrumbName, getBreadcrumbPath } from './dictionary';

export function DocsBreadcrumbs() {
    const pathname = usePathname();
    
    const pathWithoutdocs = pathname.replace(/^\/docs\/?/, '');

    const segments = pathWithoutdocs.split('/').filter(segment => segment.length > 0);
    
    if (segments.length === 0) {
        return (
            <div className={styles.breadcrumbs}>
                <div className={styles.grid}>
                    <Link href='/docs' className={styles.point}>Документация</Link>
                </div>
            </div>
        );
    }
    
    // Собираем массив элементов
    const elements: JSX.Element[] = [];
    
    // Всегда добавляем "Документация"
    elements.push(
        <Link key="docs" href='/docs' className={styles.point}>Документация</Link>
    );
    elements.push(<span key="sep-docs" className={styles.inter}>/</span>);
    
    segments.forEach((segment, index) => {
        const isLast = index === segments.length - 1;
        const name = getBreadcrumbName(segment);
        
        if (isLast) {
            elements.push(
                <span key={`item-${index}`} className={styles.point}>
                    {name}
                </span>
            );
        } else {
            elements.push(
                <Link 
                    key={`link-${index}`} 
                    href={getBreadcrumbPath(segments, index + 1)} 
                    className={styles.point}
                >
                    {name}
                </Link>
            );
            elements.push(
                <span key={`sep-${index}`} className={styles.inter}>/</span>
            );
        }
    });
    
    return (
        <div className={styles.breadcrumbs}>
            <div className={styles.grid}>
                {elements}
            </div>
        </div>
    );
}