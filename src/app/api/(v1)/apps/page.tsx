'use client';

import mdx from '@/assets/styles/mdx.module.scss';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { AppCard } from './components/app-card/card';
import Input from '@/assets/ui-kit/input/input';
import { apiKeysApi } from '@/apps/account/api-keys/api';
import { ApiKeyListItem } from '@/apps/account/api-keys/types';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { PlatformEmptyCanvas } from '@/app/platform/components/lib/empty-canvas/canvas';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import Button, { ButtonProps } from '@/assets/ui-kit/button/button';
import Link from 'next/link';
import { authLinks, linksConfig } from '@/config/links.config';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';

export interface PlugProps {
    title: string;
    actions?: ButtonProps[];
}
export function Plug({
    title,
    actions
}: PlugProps) {
    return (
        <div className={styles.plug}>
            <div className={styles.title}>{title}</div>
            {actions && (
            <div className={styles.actions}>
                {actions.map((action, index) => (
                    <Button 
                        className={styles.action}
                        key={index}
                        {...action}
                    />
                ))}
            </div>
            )}
        </div>
    )
}

export default function Page() {
    const { status } = useAuth();
    const isAuthenticated = status === 'authenticated';

    const [keys, setKeys] = useState<ApiKeyListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            loadKeys();
        }
    }, [search, isAuthenticated]);

    const loadKeys = async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            const response = await apiKeysApi.getApiKeys({
                search: search || undefined,
                status: 'active',
                limit: 50
            });
            if (response.status) {
                setKeys(response.data.api_keys);
            }
        } catch (err) {
            console.error('Failed to load api keys:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    if (status === 'loading') return (
        <PlatformLoading />
    )
    
    return (
        <div className={styles.page}>
            <h1>Мои приложения</h1>
            <p>
                <span className={mdx.underline}>Приложение</span> — главный способ использовать методы API Kroncl для разработчиков. 
                Регистрируя приложение, вы получаете <span className={mdx.underline}>ключ доступа</span>, используемый в <span className={mdx.codeTag}>Bearer</span> заголовке для всех запросов к этому API.
                <br /><br />
                Используя ключ, инициатор получает доступ к действиям аккаунта и <span className={mdx.underline}>всем организациям</span>, в которых он состоит, наследуя разрешения в них аккаунта.
            </p>
            <Button
                as='link'
                href='/api/apps/create'
                variant='contrast'
                children='Создать приложение'
                className={styles.createButton}
            />
            <div className={styles.apps}>
                {isAuthenticated ? (
                    <>
                        <div className={styles.search}>
                            <Input
                                variant='glass'
                                className={styles.input}
                                placeholder='Поиск по имени или префиксу'
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        {loading ? (
                            <Spinner />
                        ) : !keys ? (
                            <Plug 
                                title='У вас пока нет приложений...'
                                actions={[
                                    {
                                        children: 'Создать новое',
                                        variant: 'contrast',
                                        as: 'link',
                                        href: '/api/apps/create'
                                    }
                                ]}
                            />
                        ) : (
                            <div className={styles.grid}>
                                {keys.map((key) => (
                                    <AppCard key={key.id} className={styles.item} app={key} />
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <Plug
                        title='Войдите в аккаунт для просмотра созданных приложений'
                        actions={[
                            {
                                children: 'Войти',
                                variant: 'contrast',
                                as: 'link',
                                href: linksConfig.login + '?to=/api/apps'
                            }
                        ]}
                    />
                )}
            </div>
            <br />
            <h1>Лимит приложений</h1>
            <p>
                Для одного аккаунта одновременно может быть активно до <span className={mdx.codeTag}>10</span> приложений. Если среди уже зарегистрированных приложений есть неиспользуемые — деактивируйте их на странице просмотра (клик на карточку приложения).
                <br /><br />
                Если у вас возникла необходимость в увеличении лимита — свяжитесь с нами через службу поддержки или по почте.            </p>
        </div>
    );
}