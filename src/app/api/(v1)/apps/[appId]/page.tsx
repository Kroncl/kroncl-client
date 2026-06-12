'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import { shortenId } from '@/assets/utils/ids';
import Button from '@/assets/ui-kit/button/button';
import { apiKeysApi } from '@/apps/account/api-keys/api';
import { ApiKey } from '@/apps/account/api-keys/types';
import Spinner from '@/assets/ui-kit/spinner/spinner';
import { PlatformError } from '@/app/platform/components/lib/error/block';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { useRouter } from 'next/navigation';
import { linksConfig } from '@/config/links.config';
import { Plug } from '../page';
import { formatDateTime } from '@/assets/utils/date';

export default function Page() {
    const params = useParams();
    const appId = params.appId as string;
    const { status } = useAuth();
    const isAuthenticated = status === 'authenticated';
    const { showMessage } = useMessage();
    const router = useRouter();

    const [key, setKey] = useState<ApiKey | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [revoking, setRevoking] = useState(false);
    const [revoked, setRevoked] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            loadKey();
        }
    }, [appId, isAuthenticated]);

    const loadKey = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiKeysApi.getApiKey(appId);
            if (response.status) {
                setKey(response.data);
                setRevoked(!!response.data.revoked_at);
            } else {
                setError(response.message || 'Ключ не найден');
            }
        } catch (err: any) {
            setError(err?.message || 'Ошибка загрузки ключа');
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async () => {
        setRevoking(true);
        try {
            const response = await apiKeysApi.revokeApiKey(appId);
            if (response.status) {
                setRevoked(true);
                showMessage({ label: 'Ключ деактивирован', variant: 'success' });
            } else {
                showMessage({ label: response.message || 'Ошибка деактивации', variant: 'error' });
            }
        } catch (err: any) {
            showMessage({ label: err?.message || 'Ошибка деактивации', variant: 'error' });
        } finally {
            setRevoking(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <>
                <h1>Создать приложение</h1>
                <div className={styles.area}>
                    <Plug
                        title='Войдите в аккаунт для создания приложений'
                        actions={[
                            {
                                children: 'Войти',
                                variant: 'contrast',
                                as: 'link',
                                href: linksConfig.login + '?to=/api/apps/create'
                            }
                        ]}
                    />
                </div>
            </>
        );
    }
    
    if (loading) return <Spinner />;
    if (error) return <PlatformError error={error} />;
    if (!key) return <PlatformError error='Ключ не найден' />;

    return (
        <>
            <h1>Приложение #{shortenId(appId)}</h1>
            <ul className={styles.list}>
                <li>Название: {key.name}</li>
                <li>Префикс: {key.key_prefix}</li>
                <li>Лимит запросов в день: {key.daily_requests}</li>
                <li>Создан: {formatDateTime(key.created_at)}</li>
                <li>Последнее использование: {key.last_used_at ? formatDateTime(key.last_used_at) : 'не использовался'}</li>
                <li>Истекает: {key.expires_at ? formatDateTime(key.expires_at) : 'бессрочно'}</li>
                <li>Статус: {revoked || key.revoked_at ? 'неактивен' : 'активен'}</li>
            </ul>
            <div className={styles.actions}>
                <Button
                    children={revoked ? 'Неактивен' : 'Деактивировать'}
                    variant='glass'
                    className={styles.action}
                    onClick={handleRevoke}
                    loading={revoking}
                    disabled={revoking || revoked}
                />
                <Button
                    children='Созданные приложения'
                    variant='contrast'
                    className={styles.action}
                    as='link'
                    href='/api/apps'
                />
            </div>
        </>
    );
}