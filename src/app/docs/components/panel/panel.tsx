'use client';

import clsx from 'clsx';
import { DocsNavSection, DocsNavSectionProps } from './components/nav-section/section';
import styles from './panel.module.scss';
import Input from '@/assets/ui-kit/input/input';
import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { useDocsSidebar } from './context/context';

export interface DocsPanelProps {
    className?: string;
    navigation: DocsNavSectionProps[];
}

// Функция для рекурсивного поиска и "поднятия" найденных элементов
const searchInNavigation = (sections: DocsNavSectionProps[], searchTerm: string): DocsNavSectionProps[] => {
    if (!searchTerm.trim()) return sections;
    
    const term = searchTerm.toLowerCase();
    const results: DocsNavSectionProps[] = [];

    const searchInSection = (section: DocsNavSectionProps): DocsNavSectionProps | null => {
        // Проверяем текущую секцию
        const labelMatch = section.label.toLowerCase().includes(term);
        
        if (labelMatch) {
            // Если совпадение, возвращаем секцию без детей
            return {
                label: section.label,
                href: section.href,
                className: section.className
            };
        }

        // Ищем в детях
        if (section.childrens?.length) {
            const matchingChildren: DocsNavSectionProps[] = [];
            
            for (const child of section.childrens) {
                const result = searchInSection(child);
                if (result) {
                    matchingChildren.push(result);
                }
            }
            
            if (matchingChildren.length > 0) {
                // Если есть совпадающие дети, возвращаем их как отдельные секции
                results.push(...matchingChildren);
            }
        }
        
        return null;
    };

    // Проходим по всем корневым секциям
    for (const section of sections) {
        const result = searchInSection(section);
        if (result) {
            results.push(result);
        }
    }

    return results;
};

export function DocsPanel({
    className,
    navigation
}: DocsPanelProps) {
    const [searchValue, setSearchValue] = useState('');
    const [filteredNavigation, setFilteredNavigation] = useState(navigation);
    const [isSearching, setIsSearching] = useState(false);
    const { isOpen, close } = useDocsSidebar();

    // Закрываем панель при клике на ссылку (на мобильных)
    const handleNavClick = useCallback(() => {
        if (window.innerWidth <= 720) {
            close();
        }
    }, [close]);

    // Дебаунс для поиска
    const debouncedSearch = useCallback(
        debounce((term: string) => {
            const results = searchInNavigation(navigation, term);
            setFilteredNavigation(results);
            setIsSearching(false);
        }, 300),
        [navigation]
    );

    useEffect(() => {
        if (searchValue) {
            setIsSearching(true);
        }
        debouncedSearch(searchValue);
        
        return () => {
            debouncedSearch.cancel();
        };
    }, [searchValue, debouncedSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div className={clsx(styles.panel, className, isOpen && styles.open)}>
            <div className={styles.search}>
                <Input 
                    className={styles.input} 
                    fullWidth 
                    variant='glass' 
                    placeholder='Поиск по разделам'
                    value={searchValue}
                    onChange={handleSearchChange}
                />
                {isSearching && <span className={styles.loader} />}
            </div>
            <div className={styles.navigation}>
                <div className={styles.grid}>
                    {filteredNavigation.length > 0 ? (
                        filteredNavigation.map((section, index) => (
                            <div onClick={handleNavClick} key={`${section.href}-${index}`}>
                                <DocsNavSection 
                                    className={clsx(styles.section, section.className)} 
                                    {...section} 
                                />
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>
                            К сожалению, такой статьи нет в официальной документации.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}