'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './header.module.scss';
import OutLink from '@/assets/ui-kit/icons/out-link';
import Button from '@/assets/ui-kit/button/button';
import Menu from '@/assets/ui-kit/icons/menu';
import Close from '@/assets/ui-kit/icons/close';
import clsx from 'clsx';
import { navigationConfig } from './navigation.config';
import { isSectionActive } from '@/assets/utils/sections';
import { useState, useEffect } from 'react';
import { authLinks } from '@/config/links.config';
import { LogoText } from '@/assets/ui-kit/logo/text/text';
import Sun from '@/assets/ui-kit/icons/sun';
import Moon from '@/assets/ui-kit/icons/moon';
import { LogoFull } from '@/assets/ui-kit/logo/full/full';
import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { slideDown } from './_animations';
import { getRandomGradient } from '@/assets/utils/avatars';
import Arrow from '@/assets/ui-kit/icons/arrow';
import { ModalMenu } from './modal-menu/menu';

export function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const { login, user, status } = useAuth();

    // Установка светлой темы
    const setLightTheme = () => {
        if (theme !== 'light') {
            setTheme('light');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    };

    // Установка темной темы
    const setDarkTheme = () => {
        if (theme !== 'dark') {
            setTheme('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    
    const [showAccountModal, setShowAccountModal] = useState(false);
    const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (hideTimer) {
            clearTimeout(hideTimer);
            setHideTimer(null);
        }
        setShowAccountModal(true);
    };

    const handleMouseLeave = () => {
    const timer = setTimeout(() => {
            setShowAccountModal(false);
        }, 300);
        setHideTimer(timer);
    };

    return (
        <>
            <header className={clsx(styles.container, isMenuOpen && styles.active)}>
                <Link href='/' onClick={closeMenu} className={styles.icon}>
                    <span className={styles.area}>
                        <LogoFull animate />
                    </span>
                </Link>

                <div className={styles.navigation}>
                    {navigationConfig.map((item, index) => (
                        <div className={styles.section}>
                            <span className={styles.name}>{item.name}</span>
                        </div>
                    ))}
                </div>
                
                <div className={styles.actions}>
                    {!user ? (
                        <div className={styles.buttons}>
                            <Button 
                                className={styles.button} 
                                variant='glass'
                                as="a"
                                border='round'
                                href={authLinks.registration}
                                // target="_blank"
                                rel="noopener noreferrer"
                            >
                                Начать бесплатно
                            </Button>
                            <Button 
                                className={styles.button} 
                                variant='accent'
                                as="a"
                                border='round'
                                href={authLinks.login}
                                // target="_blank"
                                rel="noopener noreferrer"
                            >
                                Войти
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.account}>
                            <span 
                            className={styles.avatar}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            >
                            {user.avatar_url ? (
                                <span 
                                    className={styles.img} 
                                    style={{backgroundImage: `url('${user.avatar_url}')`}} 
                                />
                            ) : (
                                <span className={`${styles.img} ${styles.default}`}>
                                    {user.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                            </span>

                            <AnimatePresence>
                            {showAccountModal && (
                            <motion.div 
                                className={styles.modal}
                                variants={slideDown}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                key="account-modal"
                                onMouseEnter={handleMouseEnter} // Не скрываем при наведении на модалку
                                onMouseLeave={handleMouseLeave} // Скрываем при уходе с модалки
                            >
                                <div className={styles.title}>
                                    <span className={styles.contrast}>{user.name}</span>
                                </div>
                                <div className={styles.description}>
                                    Получен доступ к аккаунту. Продолжить работу?
                                </div>
                                <Button as='link' href='/sso/redirect' fullWidth className={styles.button} variant='accent'>
                                    Продолжить
                                </Button>
                            </motion.div>
                            )}
                            </AnimatePresence>
                        </div>
                    )}
                    <div className={styles.burger} onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <Close className={styles.svg} />
                        ) : (
                            <Menu className={styles.svg} />
                        )}
                    </div>
                </div>

                {/* Previews */}
                <ModalMenu
                    className={styles.modalMenu}
                />
            </header>

            {/* Mobile menu */}
            {isMenuOpen && (
            <div className={styles.menu}>
                <div className={styles.sections}>
                    <div className={styles.grid}>
                        {navigationConfig.map((item, itemIndex) => {
                            if (item.out) {
                                return (
                                    <a 
                                        key={itemIndex}
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
                            
                            if (item.subItems) {
                                return (
                                    <div key={itemIndex} className={styles.sectionGroup}>
                                        <div className={styles.capture}>{item.name}</div>
                                        
                                        {/* Подпункты */}
                                        {item.subItems.map((subItem, subIndex) => (
                                            <Link 
                                                key={`${itemIndex}-${subIndex}`}
                                                href={subItem.href}
                                                className={clsx(styles.section, isSectionActive(pathname, subItem) && styles.active)}
                                                onClick={closeMenu}
                                            >
                                                <span className={styles.name}>{subItem.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                );
                            }

                            return (
                                <Link 
                                    key={itemIndex}
                                    href={item.href}
                                    className={clsx(styles.section, isSectionActive(pathname, item) && styles.active)}
                                    onClick={closeMenu}
                                >
                                    <span className={styles.name}>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.actions}>
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
                </div>
            </div>
            )}
        </>
    );
}