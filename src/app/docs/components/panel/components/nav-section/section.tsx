'use client';

import clsx from "clsx";
import styles from './section.module.scss';
import Link from "next/link";

export interface DocsNavSectionProps {
    className?: string;
    label: string;
    href: string;
    childrens?: DocsNavSectionProps[];
}

export function DocsNavSection({
    className,
    label,
    href,
    childrens
}: DocsNavSectionProps) {
    const hasChildren = childrens && childrens.length > 0;

    return (
        <div className={clsx(styles.section, className)}>
            <Link href={href} className={styles.label}>
                {label}
            </Link>
            
            {hasChildren && (
                <div className={styles.childrens}>
                    {childrens.map((child, index) => (
                        <DocsNavSection
                            key={`${child.href}-${index}`}
                            label={child.label}
                            href={child.href}
                            childrens={child.childrens}
                            className={clsx(styles.child, child.className)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}