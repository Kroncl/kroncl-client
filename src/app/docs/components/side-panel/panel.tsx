'use client';

import clsx from 'clsx';
import styles from './panel.module.scss';
import { useEffect, useState, useCallback } from 'react';

export interface DocsSidePanelProps {
    className?: string;
}

export function DocsSidePanel({
    className,
}: DocsSidePanelProps) {
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    // Функция для генерации ID из текста заголовка
    const generateId = (text: string): string => {
        return text
            .toLowerCase()
            .replace(/[^a-zа-яё0-9\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    // Сбор всех заголовков h1, h2, h3
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('h1, h2, h3'));
        
        const items = elements.map((el) => {
            const text = el.textContent || '';
            const id = generateId(text);
            
            // Присваиваем ID элементу, если его нет
            if (!el.id) {
                el.id = id;
            }
            
            return {
                id: el.id,
                text: text
            };
        });

        setHeadings(items);
    }, []);

    // Отслеживание активного заголовка при скролле
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '0px 0px -70% 0px',
                threshold: 0,
            }
        );

        document.querySelectorAll('h1, h2, h3').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Плавный скролл к заголовку
    const scrollToHeading = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    }, []);

    if (headings.length === 0) {
        return null;
    }

    return (
        <div className={clsx(styles.panel, className)}>
            <div className={styles.capture}>На этой странице</div>
            <div className={styles.grid}>
                {headings.map((heading) => (
                    <div
                        key={heading.id}
                        className={clsx(
                            styles.section,
                            activeId === heading.id && styles.active
                        )}
                        onClick={() => scrollToHeading(heading.id)}
                    >
                        {heading.text}
                    </div>
                ))}
            </div>
        </div>
    );
}