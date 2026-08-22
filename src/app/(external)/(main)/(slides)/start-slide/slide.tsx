'use client';

import { PageBlockProps } from '@/app/(external)/_types';
import styles from './slide.module.scss';
import clsx from 'clsx';
import { style } from 'framer-motion/client';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import Button from '@/assets/ui-kit/button/button';
import { authLinks } from '@/config/links.config';

export default function StartSlide({
    className
}: PageBlockProps) {
    const { user } = useAuth();
    const currentYear: number = new Date().getFullYear();

    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.col}>
                <div className={styles.title}>
                    Учётная система для управления вашим предприятием
                </div>
                <div className={styles.description}>
                    Место жизни вашего предприятия в быстром и не перегруженном облаке Kroncl. Управляйте организацией из любой точки мира. 
                    Предотвратите кассовые разрывы, ведите простой учёт деятельности вашего бизнеса и получите понимание его рентабельности. Готовьтесь к масштабированию без проблем с 1с или Excel.
                </div>
                <div className={styles.actions}>
                    {!user ? (
                        <>
                            <Button 
                                className={clsx(styles.button, styles.black)}
                                as="a"
                                variant='contrast'
                                text='bold'
                                border='round'
                                href={authLinks.registration}
                            >
                                Начать бесплатно
                            </Button>
                            <Button 
                                className={clsx(styles.button)}
                                as="a"
                                variant='glass'
                                border='round'
                                href={authLinks.login}
                            >
                                Войти
                            </Button>
                        </>
                    ) : (
                        <Button 
                            className={clsx(styles.button)}
                            as="a"
                            variant='green'
                            text='bold'
                            border='round'
                            href='/platform'
                        >
                            Продолжить как &nbsp;<span className={styles.cut}>{user.name}</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
        <span className={styles.modal}>
            <span className={styles.slogan}>новые времена - новые решения</span>
            <span className={styles.year}>{currentYear+1}</span>
        </span>
        {/* <img src='/images/mock-ups/company-fm-analysis-cut.png' className={styles.mockUp} /> */}
        </>
    )
}