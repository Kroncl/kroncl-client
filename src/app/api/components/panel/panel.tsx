'use client';

import clsx from 'clsx';
import styles from './panel.module.scss';
import { useDevSidebar } from './context/context';
import { DevNavSection, DevNavSectionProps } from './components/nav-section/section';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import Input from '@/assets/ui-kit/input/input';
import { APP_VERSION } from '@/config/version.config';
import Button from '@/assets/ui-kit/button/button';
import Code from '@/assets/ui-kit/icons/code';
import Link from 'next/link';
import { linksConfig } from '@/config/links.config';
import Github from '@/assets/ui-kit/logos/github';

export interface DevPanelProps {
    className?: string;
    navigation: DevNavSectionProps[];
}

const searchInNavigation = (sections: DevNavSectionProps[], searchTerm: string): DevNavSectionProps[] => {
    if (!searchTerm.trim()) return sections;
    
    const term = searchTerm.toLowerCase();
    const results: DevNavSectionProps[] = [];

    const searchInSection = (section: DevNavSectionProps): DevNavSectionProps | null => {
        const labelMatch = section.label.toLowerCase().includes(term);
        
        if (labelMatch) {
            return {
                label: section.label,
                href: section.href,
                method: section.method,
                className: section.className
            };
        }

        if (section.childrens?.length) {
            const matchingChildren: DevNavSectionProps[] = [];
            
            for (const child of section.childrens) {
                const result = searchInSection(child);
                if (result) {
                    matchingChildren.push(result);
                }
            }
            
            if (matchingChildren.length > 0) {
                results.push(...matchingChildren);
            }
        }
        
        return null;
    };

    for (const section of sections) {
        const result = searchInSection(section);
        if (result) {
            results.push(result);
        }
    }

    return results;
};

export function DevPanel({
    className,
    navigation
}: DevPanelProps) {
    const [searchValue, setSearchValue] = useState('');
    const [filteredNavigation, setFilteredNavigation] = useState(navigation);
    const [isSearching, setIsSearching] = useState(false);
    const { isOpen, close } = useDevSidebar();

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
        <div className={clsx(styles.container, isOpen && styles.opened, className)}>
            <div className={styles.search}>
                <Input
                    className={styles.input} 
                    fullWidth 
                    variant='glass' 
                    placeholder='Метод или статья'
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
                                <DevNavSection
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
                    <div className={styles.actions}>
                        <Button
                            href='/api/apps/create'
                            as='link'
                            className={styles.action}
                            children='Создать приложение'
                            variant='contrast'
                            icon={<Code />}
                        />
                    </div>
                    <div className={styles.footer}>
                        Документация API платформы. Последняя сборка <span className={styles.accent}>{APP_VERSION}</span>
                    </div>
                    <Link href={linksConfig.developerGithub} className={styles.external}><Github className={styles.svg} color='var(--color-text-ghost)' /></Link>
                </div>
            </div>
        </div>
    )
}