'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformFormBody, PlatformFormSection, PlatformFormInput, PlatformFormTextarea } from '@/app/platform/components/lib/form';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { usePermission } from '@/apps/permissions/hooks';
import { PERMISSIONS } from '@/apps/permissions/codes.config';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformNotAllowed } from '@/app/platform/components/lib/not-allowed/block';
import { CompanyApi } from '@/apps/company/api';
import { docsModule } from '@/apps/company/modules/docs/api';
import { DocsSettings } from '@/apps/company/modules/docs/types';
import { isEqual } from 'lodash';
import { sectionsList } from '../_sections';

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    const docs = docsModule(companyApi);
    const router = useRouter();
    const { showMessage } = useMessage();

    const ALLOW_PAGE = usePermission(PERMISSIONS.DOCS_SETTINGS);
    const ALLOW_UPDATE = usePermission(PERMISSIONS.DOCS_SETTINGS_UPDATE);
    
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [originalData, setOriginalData] = useState<DocsSettings | null>(null);
    const [formData, setFormData] = useState<Partial<DocsSettings>>({});

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setIsLoading(true);
        try {
            const response = await docs.getSettings();
            if (response.status && response.data) {
                setOriginalData(response.data);
                setFormData(response.data);
            }
        } catch (error) {
            console.error('Error loading settings:', error);
            showMessage({
                label: 'Не удалось загрузить настройки',
                variant: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const hasChanges = useMemo(() => {
        if (!originalData) return false;
        const compareData: Partial<DocsSettings> = {};
        Object.keys(formData).forEach(key => {
            const k = key as keyof DocsSettings;
            const value = formData[k];
            compareData[k] = value === '' ? null : value ?? null;
        });
        return !isEqual(compareData, originalData);
    }, [formData, originalData]);

    const handleFieldChange = (field: keyof DocsSettings, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value || null }));
    };

    const handleSubmit = async () => {
        if (!hasChanges) return;
        
        setIsSaving(true);
        try {
            const response = await docs.updateSettings(formData);
            if (response.status) {
                setOriginalData(response.data);
                setFormData(response.data);
                showMessage({
                    label: 'Настройки успешно сохранены',
                    variant: 'success'
                });
                router.refresh();
            } else {
                throw new Error(response.message || 'Ошибка сохранения');
            }
        } catch (error: any) {
            showMessage({
                label: error.message || 'Не удалось сохранить настройки',
                variant: 'error'
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading || ALLOW_PAGE.isLoading) return <PlatformLoading />;
    if (!ALLOW_PAGE.allowed) return <PlatformNotAllowed permission={PERMISSIONS.DOCS} />;

    const isReadOnly = !ALLOW_UPDATE.allowed;

    return (
        <>
            <PlatformHead
                title='Настройки документов'
                description='Юридические реквизиты и условия для генерации документов (накладные, счета, договоры).'
                actions={ALLOW_UPDATE.allowed ? [
                    {
                        children: 'Сохранить',
                        variant: 'accent',
                        onClick: handleSubmit,
                        disabled: !hasChanges || isSaving
                    }
                ] : undefined}
                sections={sectionsList(companyId)}
            />
            <br />
            <PlatformFormBody>
                <PlatformFormSection 
                    title='Юридическое наименование'
                    description='Полное наименование организации согласно учредительным документам'
                >
                    <PlatformFormInput
                        value={formData.legal_name || ''}
                        onChange={(val) => handleFieldChange('legal_name', val)}
                        placeholder="ООО 'Ромашка'"
                        disabled={isReadOnly}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='Юридический адрес'
                    description='Юридический адрес организации'
                >
                    <PlatformFormInput
                        value={formData.legal_address || ''}
                        onChange={(val) => handleFieldChange('legal_address', val)}
                        placeholder="г. Москва, ул. Ленина, д. 1"
                        disabled={isReadOnly}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='ИНН'
                    description='ИНН (10 или 12 цифр)'
                >
                    <PlatformFormInput
                        value={formData.inn || ''}
                        onChange={(val) => handleFieldChange('inn', val)}
                        placeholder="123456789012"
                        disabled={isReadOnly}
                        maxLength={12}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='ОГРН / ОГРНИП'
                    description='ОГРН для юрлиц (13 цифр) или ОГРНИП для ИП (15 цифр)'
                >
                    <PlatformFormInput
                        value={formData.ogrn || ''}
                        onChange={(val) => handleFieldChange('ogrn', val)}
                        placeholder="123456789012345"
                        disabled={isReadOnly}
                        maxLength={15}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='Наименование банка'
                    description='Полное наименование банка'
                >
                    <PlatformFormInput
                        value={formData.bank_name || ''}
                        onChange={(val) => handleFieldChange('bank_name', val)}
                        placeholder="ПАО Сбербанк"
                        disabled={isReadOnly}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='БИК'
                    description='Банковский идентификационный код (9 цифр)'
                >
                    <PlatformFormInput
                        value={formData.bank_bic || ''}
                        onChange={(val) => handleFieldChange('bank_bic', val)}
                        placeholder="044525225"
                        disabled={isReadOnly}
                        maxLength={9}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='Расчётный счёт'
                    description='Расчётный счёт организации (20 цифр)'
                >
                    <PlatformFormInput
                        value={formData.bank_account || ''}
                        onChange={(val) => handleFieldChange('bank_account', val)}
                        placeholder="40702810400000000000"
                        disabled={isReadOnly}
                        maxLength={20}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='Директор / Руководитель'
                    description='ФИО генерального директора или руководителя'
                >
                    <PlatformFormInput
                        value={formData.director_name || ''}
                        onChange={(val) => handleFieldChange('director_name', val)}
                        placeholder="Иванов Иван Иванович"
                        disabled={isReadOnly}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='Главный бухгалтер'
                    description='ФИО главного бухгалтера (если требуется в документах)'
                >
                    <PlatformFormInput
                        value={formData.accountant_name || ''}
                        onChange={(val) => handleFieldChange('accountant_name', val)}
                        placeholder="Петрова Анна Сергеевна"
                        disabled={isReadOnly}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='Условия гарантии'
                    description='Текст гарантийных обязательств'
                >
                    <PlatformFormTextarea
                        value={formData.warranty_terms || ''}
                        onChange={(val) => handleFieldChange('warranty_terms', val)}
                        placeholder="Гарантия на товар составляет 12 месяцев..."
                        disabled={isReadOnly}
                        rows={4}
                    />
                </PlatformFormSection>

                <PlatformFormSection 
                    title='Дополнительные условия'
                    description='Любые дополнительные условия продажи'
                >
                    <PlatformFormTextarea
                        value={formData.additional_terms || ''}
                        onChange={(val) => handleFieldChange('additional_terms', val)}
                        placeholder="Условия возврата, порядок оплаты..."
                        disabled={isReadOnly}
                        rows={4}
                    />
                </PlatformFormSection>
            </PlatformFormBody>
        </>
    );
}