'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformFormBody, PlatformFormSection, PlatformFormMultiVariants, PlatformFormStatus, PlatformFormTextarea } from '@/app/platform/components/lib/form';
import Button from '@/assets/ui-kit/button/button';
import ErrorStatus from '@/assets/ui-kit/icons/error-status';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { usePermission } from '@/apps/permissions/hooks';
import { PERMISSIONS } from '@/apps/permissions/codes.config';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import { PlatformNotAllowed } from '@/app/platform/components/lib/not-allowed/block';
import { CompanyApi } from '@/apps/company/api';
import { fmModule } from '@/apps/company/modules/fm/api';
import { storageMediaModule } from '@/apps/company/modules/storage/media/api';
import { saveAs } from 'file-saver';
import { IS_PRODUCTION } from '@/config/env.config';
import Input from '@/assets/ui-kit/input/input';

type TypesStatus = 'idle' | 'valid' | 'invalid';

const REPORT_TYPES = [
    { 
        value: 'transactions', 
        label: 'Транзакции',
        description: 'В отчёт попадут данные о всех финансовых операциях за выбранный период'
    },
    { 
        value: 'categories', 
        label: 'Категории',
        description: 'Справочная информация о категориях транзакций'
    },
    { 
        value: 'counterparties', 
        label: 'Контрагенты',
        description: 'Список контрагентов с их контактными данными'
    },
    { 
        value: 'credits', 
        label: 'Кредиты',
        description: 'Информация о кредитах, займах и графиках платежей'
    }
];

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const companyApi = new CompanyApi(companyId);
    const fm = fmModule(companyApi);
    const storageMedia = storageMediaModule(companyApi);
    const router = useRouter();
    const { showMessage } = useMessage();

    const ALLOW_PAGE = usePermission(PERMISSIONS.FM_REPORT);
    
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['transactions']);
    const [comment, setComment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [typesStatus, setTypesStatus] = useState<TypesStatus>('idle');

    const validateTypes = (types: string[]): { status: TypesStatus; message: string } => {
        if (types.length === 0) {
            return { status: 'invalid', message: 'Выберите хотя бы один тип отчёта' };
        }
        return { status: 'valid', message: '✓' };
    };

    const handleTypesChange = (values: string[]) => {
        setSelectedTypes(values);
        const validation = validateTypes(values);
        setTypesStatus(validation.status);
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
            const response = await fm.generateReport({
                types: selectedTypes,
                comment: comment || undefined,
                start_date: startDate || undefined,
                end_date: endDate || undefined
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
                
                router.push(`/platform/${companyId}/fm/reports`);
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
        <PlatformNotAllowed permission={PERMISSIONS.FM_REPORT} />
    );

    return (
        <>
            <PlatformHead
                title='Новый отчёт'
                description='Создание финансового отчёта по транзакциям, категориям, контрагентам или кредитам.'
            />
            <PlatformFormBody>
                <PlatformFormSection title='Типы отчётов (обязательно)'>
                    <PlatformFormMultiVariants
                        options={REPORT_TYPES}
                        values={selectedTypes}
                        onChange={handleTypesChange}
                        disabled={isLoading}
                        min={1}
                        max={4}
                    />
                </PlatformFormSection>

                <PlatformFormSection title='Период (опционально)' description='По умолчанию: конечная дата - сегодня.'>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={isLoading}
                            variant='default'
                        />
                        <span style={{ alignSelf: 'center' }}>—</span>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={isLoading}
                            variant='default'
                        />
                    </div>
                </PlatformFormSection>

                <PlatformFormSection title='Комментарий (опционально)'>
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