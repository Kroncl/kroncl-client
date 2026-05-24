'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformFormBody, PlatformFormSection, PlatformFormMultiVariants, PlatformFormStatus, PlatformFormTextarea } from '@/app/platform/components/lib/form';
import Button from '@/assets/ui-kit/button/button';
import ErrorStatus from '@/assets/ui-kit/icons/error-status';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { usePermission } from '@/apps/permissions/hooks';
import { PERMISSIONS } from '@/apps/permissions/codes.config';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformNotAllowed } from '@/app/platform/components/lib/not-allowed/block';
import { CompanyApi } from '@/apps/company/api';
import { crmModule } from '@/apps/company/modules/crm/api';
import { storageMediaModule } from '@/apps/company/modules/storage/media/api';
import { saveAs } from 'file-saver';
import { IS_PRODUCTION } from '@/config/env.config';
import { DOCS_LINK_CRM_REPORTS } from '@/app/docs/(v1)/internal.config';

type TypesStatus = 'idle' | 'valid' | 'invalid';

const REPORT_TYPES = [
    { 
        value: 'clients', 
        label: 'Клиенты',
        description: 'Список всех клиентов с контактной информацией'
    },
    { 
        value: 'sources', 
        label: 'Источники привлечения',
        description: 'Справочная информация об источниках клиентов'
    }
];

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    const crm = crmModule(companyApi);
    const storageMedia = storageMediaModule(companyApi);
    const router = useRouter();
    const { showMessage } = useMessage();

    const ALLOW_PAGE = usePermission(PERMISSIONS.CRM_REPORT);
    
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['clients']);
    const [comment, setComment] = useState('');
    const [typesStatus, setTypesStatus] = useState<TypesStatus>('valid');

    const validateTypes = (types: string[]): { status: TypesStatus; message: string } => {
        if (types.length === 0) {
            return { status: 'invalid', message: 'Выберите хотя бы один тип отчёта' };
        }
        return { status: 'valid', message: '✓' };
    };

    useEffect(() => {
        const validation = validateTypes(selectedTypes);
        setTypesStatus(validation.status);
    }, [selectedTypes]);

    const handleTypesChange = (values: string[]) => {
        setSelectedTypes(values);
    };

    const handleSubmit = async () => {
        const typesValidation = validateTypes(selectedTypes);
        setTypesStatus(typesValidation.status);

        if (typesValidation.status !== 'valid' || isLoading) {
            showMessage({
                label: 'Выберите хотя бы один тип отчёта',
                variant: 'error'
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await crm.generateReport({
                types: selectedTypes,
                comment: comment || undefined
            });

            if (response.status) {
                showMessage({
                    label: 'Отчёт успешно сгенерирован',
                    variant: 'success'
                });

                if (IS_PRODUCTION) {
                    window.open(response.data.download_url, '_blank');
                } else {
                    const blob = await storageMedia.getFile(response.data.doc.object_path);
                    const filename = response.data.doc.object_path.split('/').pop() || 'report.xlsx';
                    saveAs(blob, filename);
                }
                
                router.push(`/platform/${companyId}/crm/reports`);
            } else {
                throw new Error(response.message || 'Ошибка генерации отчёта');
            }
        } catch (error: any) {
            showMessage({
                label: error.message || 'Не удалось создать отчёт',
                variant: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = typesStatus === 'valid';

    if (ALLOW_PAGE.isLoading) return (
        <PlatformLoading />
    );

    if (!ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.CRM_REPORT} />
    );

    return (
        <>
            <PlatformHead
                title='Новый отчёт'
                description='Создание CRM отчёта по клиентам и источникам привлечения.'
                docsEscort={{
                    href: DOCS_LINK_CRM_REPORTS,
                    title: 'Подробнее об отчётах'
                }}
            />
            <PlatformFormBody>
                <PlatformFormSection title='Типы отчётов (обязательно)' description='Отдельные листы в одном документе'>
                    <PlatformFormMultiVariants
                        options={REPORT_TYPES}
                        values={selectedTypes}
                        onChange={handleTypesChange}
                        disabled={isLoading}
                        min={1}
                        max={2}
                    />
                    {typesStatus === 'invalid' && (
                        <PlatformFormStatus
                            type="error"
                            message="Выберите хотя бы один тип отчёта"
                            icon={<ErrorStatus />}
                        />
                    )}
                </PlatformFormSection>

                <PlatformFormSection title='Комментарий (опционально)' description='По комментариям доступен поиск - постарайтесь описать цель создания отчёта'>
                    <PlatformFormTextarea
                        placeholder='Дополнительная информация...'
                        value={comment}
                        onChange={setComment}
                        disabled={isLoading}
                        rows={3}
                    />
                </PlatformFormSection>

                <section>
                    <Button
                        variant='accent'
                        onClick={handleSubmit}
                        disabled={!isFormValid || isLoading}
                    >
                        {isLoading ? 'Генерация...' : 'Создать отчёт'}
                    </Button>
                </section>
            </PlatformFormBody>
        </>
    );
}