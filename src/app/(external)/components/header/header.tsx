'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './header.module.scss';
import Button from '@/assets/ui-kit/button/button';
import Menu from '@/assets/ui-kit/icons/menu';
import Close from '@/assets/ui-kit/icons/close';
import clsx from 'clsx';
import { navigationConfig } from './navigation.config';
import { isSectionActive } from '@/assets/utils/sections';
import { useState, useEffect, useRef } from 'react';
import { authLinks } from '@/config/links.config';
import { LogoFull } from '@/assets/ui-kit/logo/full/full';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { slideDown } from './_animations';
import { ModalMenu } from './modal-menu/menu';
import { ThemeSwitcher } from '../footer/switcher/switcher';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';

export function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuth();
    
    // Состояние для меню навигации
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);
    const [menuPosition, setMenuPosition] = useState({ left: 0 });
    const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const sectionRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // Обработчики для навигационного меню
    const handleSectionMouseEnter = (index: number) => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
            menuTimeoutRef.current = null;
        }

        const sectionElement = sectionRefs.current[index];
        if (sectionElement) {
            const rect = sectionElement.getBoundingClientRect();
            setMenuPosition({ left: rect.left });
        }

        setActiveMenuIndex(index);
    };

    const handleSectionMouseLeave = () => {
        menuTimeoutRef.current = setTimeout(() => {
            setActiveMenuIndex(null);
        }, 200);
    };

    const handleMenuMouseEnter = () => {
        if (menuTimeoutRef.current) {
            clearTimeout(menuTimeoutRef.current);
            menuTimeoutRef.current = null;
        }
    };

    const handleMenuMouseLeave = () => {
        menuTimeoutRef.current = setTimeout(() => {
            setActiveMenuIndex(null);
        }, 200);
    };

    const [showAccountModal, setShowAccountModal] = useState(false);
    const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

    const handleAccountMouseEnter = () => {
        if (hideTimer) {
            clearTimeout(hideTimer);
            setHideTimer(null);
        }
        setShowAccountModal(true);
    };

    const handleAccountMouseLeave = () => {
        const timer = setTimeout(() => {
            setShowAccountModal(false);
        }, 300);
        setHideTimer(timer);
    };

    // Очищаем таймеры при размонтировании
    useEffect(() => {
        return () => {
            if (menuTimeoutRef.current) {
                clearTimeout(menuTimeoutRef.current);
            }
            if (hideTimer) {
                clearTimeout(hideTimer);
            }
        };
    }, []);

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
                        <Link
                            href={item.href} 
                            key={index}
                            ref={(el) => { sectionRefs.current[index] = el; }}
                            className={clsx(
                                styles.section,
                                isSectionActive(pathname, item) && styles.active,
                                item.menu && styles.hasMenu
                            )}
                            onMouseEnter={() => item.menu && handleSectionMouseEnter(index)}
                            onMouseLeave={handleSectionMouseLeave}
                        >
                            <span className={styles.name}>{item.name}</span>
                            {item.menu && (
                                <span className={styles.arrow}>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </span>
                            )}
                        </Link>
                    ))}
                </div>
                
                <div className={styles.actions}>
                    <div className={styles.themeSwitcher}>
                        <ThemeSwitcher type='one' className={styles.switcher} />
                    </div>
                    {!user ? (
                        <div className={styles.buttons}>
                            <ModalTooltip content='Регистрация аккаунта' compact>
                                <Button 
                                    className={clsx(styles.button)}
                                    as="a"
                                    variant='link'
                                    href={authLinks.registration}
                                >
                                    Начать бесплатно
                                </Button>
                            </ModalTooltip>
                            <ModalTooltip content='Вход в существующий аккаунт' compact>
                                <Button 
                                    className={clsx(styles.button)}
                                    as="a"
                                    variant='link'
                                    href={authLinks.login}
                                >
                                    Войти
                                </Button>
                            </ModalTooltip>
                        </div>
                    ) : (
                        <div className={styles.buttons}>
                            <ModalTooltip content='Продолжить' compact>
                                <Button 
                                    className={clsx(styles.button, styles.cut)}
                                    as="a"
                                    variant='link'
                                    href='/platform'
                                >
                                    Продолжить
                                </Button>
                            </ModalTooltip>
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

                {/* Навигационное меню */}
                <AnimatePresence>
                    {activeMenuIndex !== null && navigationConfig[activeMenuIndex]?.menu && (
                        <motion.div
                            className={styles.navMenu}
                            style={{
                                left: menuPosition.left,
                            }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            onMouseEnter={handleMenuMouseEnter}
                            onMouseLeave={handleMenuMouseLeave}
                        >
                            <ModalMenu 
                                className={styles.modalMenu}
                                preview={navigationConfig[activeMenuIndex].menu!.preview}
                                content={navigationConfig[activeMenuIndex].menu!.content}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className={styles.menu}>
                    <div className={styles.sections}>
                        <div className={styles.grid}>
                            {navigationConfig.map((item, itemIndex) => {
                                // Если есть menu - показываем как секцию с подпунктами
                                if (item.menu) {
                                    return (
                                        <div key={itemIndex} className={styles.sectionGroup}>
                                            <div className={styles.capture}>{item.name}</div>
                                            {item.menu.content.items.map((subItem, subIndex) => (
                                                <Link 
                                                    key={`${itemIndex}-${subIndex}`}
                                                    href={subItem.href || '#'}
                                                    className={styles.section}
                                                    onClick={closeMenu}
                                                >
                                                    <span className={styles.name}>{subItem.title}</span>
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