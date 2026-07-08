'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormTextarea, PlatformFormUnify, PlatformFormVariants } from "@/app/platform/components/lib/form";
import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { usePermission } from "@/apps/permissions/hooks";
import styles from '../new/page.module.scss';
import Button from "@/assets/ui-kit/button/button";
import { ChooseCurrencyBlock } from "../../../../fm/(main)/new-operation/choose-currency/block";
import { CounterpartyType } from "@/apps/company/modules/cpm/types";
import { useCpm } from "@/apps/company/modules";
import { useMessage } from "@/app/platform/components/lib/message/provider";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const companyId = params.id as string;
    const counterpartyId = params.counterpartyId as string;
    const cpmModule = useCpm();
    const { showMessage } = useMessage();

    const ALLOW_PAGE = usePermission(PERMISSIONS.CPM_COUNTERPARTIES_UPDATE);

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        type: 'organization' as CounterpartyType,
        inn: '',
        ogrn: '',
        kpp: '',
        address: '',
        default_currency: '',
        comment: '',
    });

    useEffect(() => {
        const fetchCounterparty = async () => {
            try {
                const response = await cpmModule.getCounterparty(counterpartyId);
                if (response.status && response.data) {
                    const cp = response.data;
                    setFormData({
                        name: cp.name || '',
                        type: cp.type || 'organization',
                        inn: cp.inn || '',
                        ogrn: cp.ogrn || '',
                        kpp: cp.kpp || '',
                        address: cp.address || '',
                        default_currency: cp.default_currency || '',
                        comment: cp.comment || '',
                    });
                }
            } catch {
                showMessage({ label: 'Не удалось загрузить контрагента', variant: 'error' });
                router.push(`/platform/${companyId}/cpm`);
            } finally {
                setIsFetching(false);
            }
        };
        fetchCounterparty();
    }, [counterpartyId]);

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            showMessage({ label: 'Наименование обязательно', variant: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await cpmModule.updateCounterparty(counterpartyId, {
                name: formData.name.trim(),
                type: formData.type,
                inn: formData.inn.trim() || null,
                ogrn: formData.ogrn.trim() || null,
                kpp: formData.kpp.trim() || null,
                address: formData.address.trim() || null,
                default_currency: formData.default_currency || null,
                comment: formData.comment.trim() || null,
            });

            if (response.status) {
                showMessage({ label: 'Контрагент обновлён', variant: 'success' });
                router.push(`/platform/${companyId}/cpm/${counterpartyId}`);
            } else {
                throw new Error(response.message || 'Ошибка обновления');
            }
        } catch (error: any) {
            showMessage({ label: error.message || 'Не удалось обновить контрагента', variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    if (ALLOW_PAGE.isLoading || isFetching) return <PlatformLoading />;
    if (!ALLOW_PAGE.isLoading && !ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.CPM_COUNTERPARTIES_UPDATE} />
    );

    return (
        <>
        <PlatformHead
            title='Редактирование контрагента'
            description="Обновление данных контрагента."
        />
        <PlatformFormBody>
            <PlatformFormSection title='Наименование'>
                <PlatformFormInput
                    placeholder="ООО «Ромашка»"
                    value={formData.name}
                    onChange={(v) => setFormData(prev => ({ ...prev, name: v }))}
                    disabled={isLoading}
                />
            </PlatformFormSection>
            <PlatformFormSection title='Тип' description='Юридический статус контрагента'>
                <PlatformFormVariants 
                    value={formData.type}
                    onChange={(v) => setFormData(prev => ({ ...prev, type: v as CounterpartyType }))}
                    disabled={isLoading}
                    options={[
                        { value: 'organization', label: 'Организация', description: 'Юридическое лицо' },
                        { value: 'person', label: 'Физическое лицо', description: 'ИП или самозанятый' },
                        { value: 'bank', label: 'Банк', description: 'Кредитная организация' },
                    ]}
                />
            </PlatformFormSection>
            <PlatformFormSection title='Реквизиты' description='Юридическая информация о контрагенте (все поля опциональны)'>
                <PlatformFormUnify>
                    <PlatformFormInput 
                        placeholder="ИНН (опционально)" 
                        value={formData.inn}
                        onChange={(v) => setFormData(prev => ({ ...prev, inn: v }))}
                        disabled={isLoading}
                    />
                    <PlatformFormInput 
                        variant='default' 
                        placeholder="ОГРН / ОГРИП (опционально)" 
                        value={formData.ogrn}
                        onChange={(v) => setFormData(prev => ({ ...prev, ogrn: v }))}
                        disabled={isLoading}
                    />
                </PlatformFormUnify>
                <PlatformFormUnify>
                    <PlatformFormInput 
                        placeholder="Адрес (опционально)" 
                        value={formData.address}
                        onChange={(v) => setFormData(prev => ({ ...prev, address: v }))}
                        disabled={isLoading}
                    />
                    <PlatformFormInput 
                        variant='default' 
                        placeholder="КПП (опционально)" 
                        value={formData.kpp}
                        onChange={(v) => setFormData(prev => ({ ...prev, kpp: v }))}
                        disabled={isLoading}
                    />
                </PlatformFormUnify>
            </PlatformFormSection>
            <PlatformFormSection title='Рабочая валюта (опционально)' description='Валюта, с которой контрагент работает чаще всего'>
                <ChooseCurrencyBlock 
                    value={formData.default_currency}
                    onChange={(code) => setFormData(prev => ({ ...prev, default_currency: code }))}
                    disabled={isLoading}
                />
            </PlatformFormSection>
            <PlatformFormSection title='Описание (опционально)' description='Дополнительная информация'>
                <PlatformFormTextarea
                    placeholder="Любая дополнительная информация о контрагенте..."
                    value={formData.comment}
                    onChange={(v) => setFormData(prev => ({ ...prev, comment: v }))}
                    disabled={isLoading}
                />
            </PlatformFormSection>
            
            <section>
                <Button
                    variant='accent'
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.name.trim()}
                >
                    {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
            </section>
        </PlatformFormBody>
        </>
    );
}