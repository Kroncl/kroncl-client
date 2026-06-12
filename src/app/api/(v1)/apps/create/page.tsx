'use client';

import { useState } from 'react';
import styles from './page.module.scss';
import { useAuth } from '@/apps/account/auth/context/AuthContext';
import { Plug } from '../page';
import { linksConfig } from '@/config/links.config';
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormVariants } from '@/app/platform/components/lib/form';
import Button from '@/assets/ui-kit/button/button';
import { apiKeysApi } from '@/apps/account/api-keys/api';
import { ApiKeyWithRaw } from '@/apps/account/api-keys/types';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import Input from '@/assets/ui-kit/input/input';

export default function Page() {
    const { status } = useAuth();
    const isAuthenticated = status === 'authenticated';
    const { showMessage } = useMessage();

    const [name, setName] = useState('');
    const [expiresIn, setExpiresIn] = useState('never');
    const [isCreating, setIsCreating] = useState(false);
    const [result, setResult] = useState<ApiKeyWithRaw | null>(null);

    const handleCreate = async () => {
        if (!name.trim()) {
            showMessage({ label: 'Введите название приложения', variant: 'error' });
            return;
        }

        setIsCreating(true);
        try {
            const response = await apiKeysApi.createApiKey({
                name: name.trim(),
                expires_in: expiresIn === 'never' ? undefined : expiresIn,
            });

            if (response.status) {
                setResult(response.data);
                showMessage({ label: 'Ключ создан', variant: 'success' });
            } else {
                showMessage({ label: response.message || 'Ошибка создания ключа', variant: 'error' });
            }
        } catch (err: any) {
            showMessage({ label: err?.message || 'Ошибка создания ключа', variant: 'error' });
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopy = async () => {
        if (!result?.raw_key) return;
        try {
            await navigator.clipboard.writeText(result.raw_key);
            showMessage({ label: 'Ключ скопирован', variant: 'success' });
        } catch {
            showMessage({ label: 'Не удалось скопировать', variant: 'error' });
        }
    };

    const handleReset = () => {
        setResult(null);
        setName('');
        setExpiresIn('never');
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

    return (
        <>
            <h1>Создать приложение</h1>
            <div className={styles.area}>
                {result ? (
                    <div className={styles.result}>
                        <div className={styles.title}>Ключ создан</div>
                        <p className={styles.description}>
                            Скопируйте и сохраните в надёжном месте сгенерированный ключ - он будет нужен для последующих авторизаций при выполнении запросов.
                            <br /><br />
                            Ключ доступен для копирования только один раз - сейчас.
                            <br /><br />
                            Не под каким предлогом не передавайте ключ третьим лицам! Вы всегда можете отозвать ключ на странице просмотра приложения.
                        </p>
                        <Input className={styles.key} value={result.raw_key} disabled />
                        <div className={styles.actions}>
                            <Button className={styles.action} variant='contrast' onClick={handleCopy}>
                                Копировать
                            </Button>
                            <Button className={styles.action} variant='default' as='link' href='/api/apps'>
                                Созданные приложения
                            </Button>
                        </div>
                    </div>
                ) : (
                    <PlatformFormBody className={styles.form}>
                        <PlatformFormSection title='Название приложения'>
                            <PlatformFormInput
                                placeholder='Например: Бот'
                                value={name}
                                onChange={(v) => setName(v)}
                                disabled={isCreating}
                            />
                        </PlatformFormSection>
                        <PlatformFormSection title='Срок жизни' description='Можно ограничить срок жизни ключа'>
                            <PlatformFormVariants
                                value={expiresIn}
                                onChange={(v) => setExpiresIn(v)}
                                disabled={isCreating}
                                options={[
                                    { value: 'never', label: 'Бессрочно' },
                                    { value: '24h', label: '24 часа' },
                                    { value: '168h', label: 'Неделя' },
                                    { value: '720h', label: 'Месяц' },
                                ]}
                            />
                        </PlatformFormSection>
                        <div className={styles.actions}>
                            <Button
                                variant='contrast'
                                onClick={handleCreate}
                                loading={isCreating}
                                disabled={isCreating || !name.trim()}
                            >
                                Создать ключ
                            </Button>
                        </div>
                    </PlatformFormBody>
                )}
            </div>
        </>
    );
}