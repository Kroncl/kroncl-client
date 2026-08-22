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
    
    return (
        <>
        <div className={clsx(styles.slide, className)}>
            <div className={styles.col}>
                <div className={styles.title}>
                    Улучшите свое приложение для новейших устройств Pixel
                </div>
                <div className={styles.description}>
                    Новое семейство Pixel 11 и Pixel Watch 5 открывают новые возможности для вашего приложения. Узнайте, как создавать адаптивные макеты для складных устройств и разрабатывать интерфейсы Wear OS с управлением жестами. Подробнее о внедрении искусственного интеллекта на устройстве с помощью API ML Kit Prompt для оптимизации вашего приложения в экосистеме Pixel.
                </div>
                <div className={styles.actions}>
                    {!user ? (
                        <>
                            <Button 
                                className={clsx(styles.button)}
                                as="a"
                                variant='green'
                                text='bold'
                                border='round'
                                href={authLinks.registration}
                            >
                                Начать бесплатно
                            </Button>
                            <Button 
                                className={clsx(styles.button)}
                                as="a"
                                variant='empty'
                                border='round'
                                href={authLinks.login}
                            >
                                Войти
                            </Button>
                        </>
                    ) : (
                        <Button 
                            className={clsx(styles.button, styles.cut)}
                            as="a"
                            variant='green'
                            text='bold'
                            border='round'
                            href='/platform'
                        >
                            Продолжить
                        </Button>
                    )}
                </div>
            </div>
        </div>    
        </>
    )
}