'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import { ThemeCard } from './components/theme-card/card';
import { _themes, Theme } from '@/assets/styles/base/themes/_themes';

export default function Page() {
    const [currentTheme, setCurrentTheme] = useState<string>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setCurrentTheme(initialTheme);
        
        // Применяем тему при загрузке
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const handleThemeSelect = (themeId: string) => {
        if (currentTheme !== themeId) {
            setCurrentTheme(themeId);
            document.documentElement.setAttribute('data-theme', themeId);
            localStorage.setItem('theme', themeId);
        }
    };

    return (
        <>
            <PlatformHead
                title='Настройки'
                description='Управление окружением, общие настройки платформы.'
            />
            <div className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.capture}>Тема</div>
                    <div className={styles.description}>Берегите свои глаза.</div>
                    <div className={styles.themes}>
                        {_themes.map((theme: Theme) => (
                            <ThemeCard 
                                theme={theme} 
                                key={theme.id}
                                onSelect={handleThemeSelect}
                                className={`${styles.item} ${currentTheme === theme.id ? styles.active : ''}`}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}