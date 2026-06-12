'use client';

import clsx from "clsx";
import styles from './section.module.scss';
import Link from "next/link";
import Arrow from "@/assets/ui-kit/icons/arrow";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface DevNavSectionProps {
    className?: string;
    label: string;
    href: string;
    childrens?: DevNavSectionProps[];
    method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
}

function isActive(href: string, pathname?: string, hasChildren?: boolean): boolean {
    if (!pathname) return false;
    if (pathname === href) return true;
    if (!hasChildren && pathname.startsWith(href + '/')) return true;
    return false;
}

function hasActiveChild(href: string, childrens?: DevNavSectionProps[], pathname?: string): boolean {
    if (!pathname || !childrens) return false;
    return childrens.some(child => 
        isActive(child.href, pathname, !!child.childrens?.length) || 
        hasActiveChild(child.href, child.childrens, pathname)
    );
}

export function DevNavSection({
    className,
    label,
    href,
    childrens,
    method
}: DevNavSectionProps) {
    const hasChildren = childrens && childrens.length > 0;
    const pathname = usePathname();
    
    const active = isActive(href, pathname, hasChildren);
    const shouldBeOpened = hasChildren && (active || hasActiveChild(href, childrens, pathname));
    const [opened, setOpened] = useState(shouldBeOpened);

    useEffect(() => {
        if (hasChildren && (isActive(href, pathname, hasChildren) || hasActiveChild(href, childrens, pathname))) {
            setOpened(true);
        }
    }, [pathname, href, childrens, hasChildren]);

    const handleSwitcherClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpened(!opened);
    };

    const handleLabelClick = () => {
        if (hasChildren && !opened) {
            setOpened(true);
        }
    };

    return (
        <div className={clsx(styles.section, className, opened && styles.opened)}>
            <div className={styles.base}>
                {hasChildren && (
                    <div className={styles.switcher} onClick={handleSwitcherClick}>
                        <Arrow />
                    </div>
                )}
                <Link 
                    href={href} 
                    className={clsx(styles.label, active && styles.active)} 
                    onClick={handleLabelClick}
                >
                    {method && <span className={clsx(styles.method, styles[method])}>{method}</span>} {label}
                </Link>
            </div>
            
            {hasChildren && opened && (
                <div className={styles.childrens}>
                    {childrens.map((child, index) => (
                        <DevNavSection
                            key={`${child.href}-${index}`}
                            label={child.label}
                            method={child.method}
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