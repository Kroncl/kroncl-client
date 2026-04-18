'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import styles from './page.module.scss';
import Button from '@/assets/ui-kit/button/button';
import { DOCS_LINK_COMPANIES } from '@/app/docs/(v1)/internal.config';
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormTextarea } from '@/app/platform/components/lib/form';
import { useParams } from 'next/navigation';
import { isAllowed, usePermission } from '@/apps/permissions/hooks';
import { PERMISSIONS } from '@/apps/permissions/codes.config';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { useCompany } from '@/apps/company/provider';
import { useEffect, useState } from 'react';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { companiesApi } from '@/apps/account/companies/api';
import { useManage } from '@/apps/company/modules';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const { company } = useCompany();
    const { showMessage } = useMessage();
    const manageModule = useManage();

    const ALLOW_UPDATE = usePermission(PERMISSIONS.COMPANY_UPDATE);

    const [formData, setFormData] = useState({
        name: company?.name || '',
        description: company?.description || ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || '',
                description: company.description || ''
            });
        }
    }, [company]);

    const handleNameChange = (value: string) => {
        setFormData(prev => ({ ...prev, name: value }));
        setHasChanges(true);
    };

    const handleDescriptionChange = (value: string) => {
        setFormData(prev => ({ ...prev, description: value }));
        setHasChanges(true);
    };

    const handleSubmit = async () => {
        if (!company) return;

        setIsLoading(true);
        try {
            const response = await manageModule.updateCompany(companyId, {
                name: formData.name.trim(),
                description: formData.description.trim() || undefined
            });

            if (response.status) {
                setHasChanges(false);
                showMessage({
                    label: 'Данные компании обновлены',
                    variant: 'success'
                });
            } else {
                throw new Error(response.message || 'Ошибка обновления');
            }
        } catch (error: any) {
            showMessage({
                label: error.message || 'Не удалось обновить данные',
                variant: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (ALLOW_UPDATE.isLoading) return <PlatformLoading />;
    
    return (
        <>
            <PlatformHead
                title='Управление компанией'
                description='Возможности управления предприятием. Изменение данных, удаление компании.'
                actions={isAllowed(ALLOW_UPDATE) ? [
                    {
                        variant: 'accent',
                        children: isLoading ? 'Сохранение...' : 'Сохранить',
                        onClick: handleSubmit,
                        disabled: !hasChanges || isLoading
                    }
                ] : undefined}
                docsEscort={{
                    href: DOCS_LINK_COMPANIES,
                    title: 'Подробнее об управлении организацией'
                }}
            />
            <PlatformFormBody>
                <PlatformFormSection title='Название компании'>
                    <PlatformFormInput
                        value={formData.name}
                        onChange={handleNameChange}
                        placeholder='Название компании'
                        disabled={isLoading || !isAllowed(ALLOW_UPDATE)}
                    />
                </PlatformFormSection>
                <PlatformFormSection title='Описание компании'>
                    <PlatformFormTextarea
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        placeholder='Описание компании'
                        disabled={isLoading || !isAllowed(ALLOW_UPDATE)}
                    />
                </PlatformFormSection>
                <PlatformFormSection 
                    actions={[
                        {
                            variant: 'accent',
                            children: 'Скопировать',
                            onClick: () => {
                                navigator.clipboard.writeText(companyId);
                                showMessage({
                                    label: 'ID скопирован',
                                    variant: 'success'
                                });
                            }
                        }
                    ]}
                    title='Идентификатор компании' 
                    description='ID компании - статичное значение, не изменяющееся при обновлении имени или другой информации.'
                >
                    <PlatformFormInput
                        value={companyId}
                        readOnly
                    />
                </PlatformFormSection>
            </PlatformFormBody>
            
            <div className={styles.dangerZone}>
                <div className={styles.head}>
                    <div className={styles.title}>Красная зона</div>
                    <div className={styles.description}>Данные действия влияют на состояние организации.</div>
                </div>
                <div className={styles.sections}>
                    <div className={styles.section}>
                        <div className={styles.info}>
                            <div className={styles.name}>Сменить статус видимости</div>
                            <div className={styles.description}>Сделать публичной.</div>
                        </div>
                        <div className={styles.actions}>
                            <Button 
                                children='Сделать публичной'
                                variant='red'
                                className={styles.action}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.info}>
                            <div className={styles.name}>Удаление организации</div>
                            <div className={styles.description}>Безвозвратное удаление пространства организации.</div>
                        </div>
                        <div className={styles.actions}>
                            <Button 
                                children='Удалить'
                                variant='red'
                                className={styles.action}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>Будьте осторожны, действия могут быть необратимы.</div>
            </div>
        </>
    )
}