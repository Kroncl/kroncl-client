'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './header.module.scss';
import OutLink from '@/assets/ui-kit/icons/out-link';
import Button from '@/assets/ui-kit/button/button';
import Menu from '@/assets/ui-kit/icons/menu';
import Close from '@/assets/ui-kit/icons/close';
import clsx from 'clsx';
import { isSectionActive } from '@/assets/utils/sections';
import { useState, useEffect } from 'react';
import { authLinks } from '@/config/links.config';
import { LogoText } from '@/assets/ui-kit/logo/text/text';
import Sun from '@/assets/ui-kit/icons/sun';
import Moon from '@/assets/ui-kit/icons/moon';
import { LogoFull } from '@/assets/ui-kit/logo/full/full';
import Input from '@/assets/ui-kit/input/input';
import { getRandomGradient } from '@/assets/utils/avatars';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import Bell from '@/assets/ui-kit/icons/bell';
import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';
import { PllatformSearch } from '../search/search';
import { AccountWidget } from './account-widget/widget';
import Question from '@/assets/ui-kit/icons/question';
import Info from '@/assets/ui-kit/icons/info';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';

export interface HeaderProps {
    className?: string;
    subTitle?: string;
}

export function Header({
    className,
    subTitle
}: HeaderProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Инициализация темы при загрузке
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setTheme(initialTheme);
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className={clsx(styles.container, isMenuOpen && styles.active)}>
                <Link href='/platform' onClick={closeMenu} className={styles.icon}>
                    <span className={styles.area}>
                        <LogoIco animate />
                    </span>
                </Link>

                {subTitle && (
                    <div className={styles.subTitle}>
                        <span className={styles.text}>
                            {subTitle}
                        </span>
                    </div>
                )}

                <div className={styles.search}>
                    <div className={styles.frame}>
                        <PllatformSearch />
                    </div>
                </div>
                
                <div className={styles.actions}>
                    <ModalTooltip content='Kroncl - операционная система управления процессами малого бизнеса.'>
                        <div className={styles.icon}>
                            <Info className={styles.svg} />
                        </div>
                    </ModalTooltip>
                    <AccountWidget className={styles.account} />
                    
                    {/* <div className={styles.burger} onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <Close className={styles.svg} />
                        ) : (
                            <Menu className={styles.svg} />
                        )}
                    </div> */}
                </div>
            </header>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className={styles.menu}>
                    <div className={styles.sections}>
                        {/* {navigationConfig.map((item) => {
                            if (item.out) {
                                return (
                                    <a 
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={clsx(styles.section, isSectionActive(pathname, item) && styles.active)}
                                        onClick={closeMenu}
                                    >
                                        <span className={styles.name}>{item.name}</span>
                                        <span className={styles.icon}><OutLink className={styles.svg} /></span>
                                    </a>
                                );
                            }

                            return (
                                <Link 
                                    key={item.name}
                                    href={item.href}
                                    className={clsx(styles.section, isSectionActive(pathname, item) && styles.active)}
                                    onClick={closeMenu}
                                >
                                    <span className={styles.name}>{item.name}</span>
                                </Link>
                            );
                        })} */}
                    </div>
                    {/* <div className={styles.actions}>
                        <Button 
                            className={styles.button} 
                            variant='contrast'
                            as="a"
                            href={authLinks.login}
                            // target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeMenu}
                        >
                            Войти
                        </Button>
                    </div> */}
                </div>
            )}
        </>
    );
}