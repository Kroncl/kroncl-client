'use client';

import clsx from 'clsx';
import styles from './footer.module.scss';
import { LogoText } from '@/assets/ui-kit/logo/text/text';
import Link from 'next/link';
import { LogoFull } from '@/assets/ui-kit/logo/full/full';
import { useEffect, useState } from 'react';
import Sun from '@/assets/ui-kit/icons/sun';
import Moon from '@/assets/ui-kit/icons/moon';
import { ThemeSwitcher } from './switcher/switcher';
import { linksList } from './_links';

export function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.focus}>
                <div className={styles.brand}>
                    <div className={styles.logo}><LogoFull /></div>
                    <ThemeSwitcher className={styles.switcher} />
                </div>
                <div className={styles.sections}>
                    {linksList.map((group, index) => (
                        <div className={styles.group}>
                            {group.capture && (<div className={styles.name}>{group.capture}</div>)}
                            
                            {group.links.map((link, index) => (
                                <Link href={link.href} className={styles.section}>{link.capture}</Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}