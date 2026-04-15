'use client';

import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';
import styles from '../../layout.module.scss';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import { Warning } from '../../components/warning/warning';
import { useState, useEffect, Suspense } from 'react';
import { accountAuth } from '@/apps/account/auth/api';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { authLinks } from '@/config/links.config';
import Spinner from '@/assets/ui-kit/spinner/spinner';

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { showMessage } = useMessage();
    const token = searchParams.get('token');

    const [isValidating, setIsValidating] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    useEffect(() => {
        const validateToken = async () => {
            if (!token) {
                showMessage({
                    label: 'Токен для сброса пароля не найден',
                    variant: 'error'
                });
                router.push(authLinks.login);
                return;
            }

            try {
                const response = await accountAuth.validateResetToken({ token });
                
                if (response.status && response.data?.valid) {
                    setIsTokenValid(true);
                } else {
                    showMessage({
                        label: 'Ссылка устарела или недействительна',
                        variant: 'error'
                    });
                    router.push(authLinks.recovery);
                }
            } catch {
                showMessage({
                    label: 'Не удалось проверить токен',
                    variant: 'error'
                });
                router.push(authLinks.recovery);
            } finally {
                setIsValidating(false);
            }
        };

        validateToken();
    }, [token, router, showMessage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !passwordConfirm) {
            showMessage({
                label: 'Заполните все поля',
                variant: 'error'
            });
            return;
        }

        if (password !== passwordConfirm) {
            showMessage({
                label: 'Пароли не совпадают',
                variant: 'error'
            });
            return;
        }

        if (password.length < 8) {
            showMessage({
                label: 'Пароль должен быть не менее 8 символов',
                variant: 'error'
            });
            return;
        }

        if (!token) {
            showMessage({
                label: 'Токен не найден',
                variant: 'error'
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await accountAuth.resetPassword({
                token,
                new_password: password
            });

            if (response.status) {
                showMessage({
                    label: 'Пароль успешно изменён',
                    variant: 'success'
                });
                router.push(authLinks.login);
            } else {
                showMessage({
                    label: response.message || 'Не удалось изменить пароль',
                    variant: 'error'
                });
            }
        } catch {
            showMessage({
                label: 'Произошла ошибка. Попробуйте позже',
                variant: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isValidating) {
        return (
            <div className={styles.frame}>
                <div className={styles.head}>
                    <LogoIco className={styles.logo} />
                    Проверка ссылки...
                </div>
                <div className={styles.loading} style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <Spinner />
                </div>
            </div>
        );
    }

    if (!isTokenValid) {
        return null;
    }

    return (
        <form className={styles.frame} onSubmit={handleSubmit}>
            <div className={styles.head}>
                <LogoIco className={styles.logo} />
                Новый пароль
            </div>
            <div className={styles.credentials}>
                <section className={styles.section}>
                    <div className={styles.capture}>Пароль</div>
                    <Input 
                        className={styles.input} 
                        variant='default' 
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className={styles.hint}>Не менее 8 символов</div>
                </section>
                <section className={styles.section}>
                    <div className={styles.capture}>Подтверждение пароля</div>
                    <Input 
                        className={styles.input}
                        variant='default' 
                        type='password'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        disabled={isLoading}
                    />
                </section>
            </div>
            <Warning />
            <div className={styles.actions}>
                <section className={styles.section}>
                    <Button 
                        className={styles.action} 
                        variant='contrast'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Сохранение...' : 'Сохранить пароль'}
                    </Button>
                </section>
            </div>
        </form>
    );
}

export default function Page() {
    return (
        <Suspense fallback={
            <div className={styles.frame}>
                <div className={styles.loading}>
                    <Spinner />
                </div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}