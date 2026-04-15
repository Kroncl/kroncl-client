'use client';

import { LogoIco } from '@/assets/ui-kit/logo/ico/ico';
import styles from '../layout.module.scss';
import Input from '@/assets/ui-kit/input/input';
import Button from '@/assets/ui-kit/button/button';
import { Warning } from '../components/warning/warning';
import { useState } from 'react';
import { accountAuth } from '@/apps/account/auth/api';
import { useMessage } from '@/app/platform/components/lib/message/provider';

export default function Page() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { showMessage } = useMessage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email.trim()) {
            showMessage({
                label: 'Введите email',
                variant: 'error'
            });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            showMessage({
                label: 'Некорректный формат email',
                variant: 'error'
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await accountAuth.sendPasswordResetLink({ email: email.trim() });
            
            if (response.status) {
                showMessage({
                    label: 'Инструкция по восстановлению отправлена на почту',
                    variant: 'success'
                });
                setEmail('');
            } else {
                showMessage({
                    label: response.message || 'Не удалось отправить инструкцию',
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

    return (
        <form className={styles.frame} onSubmit={handleSubmit}>
            <div className={styles.head}>
                <LogoIco className={styles.logo} />
                Восстановление доступа
            </div>
            <div className={styles.credentials}>
                <section className={styles.section}>
                    <div className={styles.capture}>Почта</div>
                    <Input 
                        className={styles.input} 
                        variant='default' 
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className={styles.hint}>Отправим письмо с инструкцией по восстановлению</div>
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
                        {isLoading ? 'Отправка...' : 'Восстановить доступ'}
                    </Button>
                </section>
            </div>
        </form>
    )
}