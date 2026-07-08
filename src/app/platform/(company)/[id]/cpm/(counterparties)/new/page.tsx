'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormTextarea, PlatformFormUnify, PlatformFormVariants } from "@/app/platform/components/lib/form";
import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { usePermission } from "@/apps/permissions/hooks";
import { DaDataBlock } from "./dadata-block/block";
import styles from './page.module.scss';
import Button from "@/assets/ui-kit/button/button";
import { ChooseCurrencyBlock } from "../../../fm/(main)/new-operation/choose-currency/block";
import { CounterpartyPreview } from "@/apps/shared/dadata/types";
import { CounterpartyType } from "@/apps/company/modules/cpm/types";
import { useCpm } from "@/apps/company/modules";
import { useMessage } from "@/app/platform/components/lib/message/provider";
import { useParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const companyId = params.id as string;
    const cpmModule = useCpm();
    const { showMessage } = useMessage();

    const ALLOW_PAGE = usePermission(PERMISSIONS.CPM_COUNTERPARTIES_CREATE);

    const [isLoading, setIsLoading] = useState(false);
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

    const handleDaDataSelect = (preview: CounterpartyPreview) => {
        setFormData(prev => ({
            ...prev,
            name: preview.name || prev.name,
            inn: preview.inn || prev.inn,
            ogrn: preview.ogrn || prev.ogrn,
            kpp: preview.kpp || prev.kpp,
            address: preview.address || prev.address,
            type: preview.type === 'person' ? 'person' : (prev.type === 'bank' ? 'bank' : 'organization'),
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            showMessage({ label: 'Наименование обязательно', variant: 'error' });
            return;
        }

        setIsLoading(true);
        try {
            const response = await cpmModule.createCounterparty({
                name: formData.name.trim(),
                type: formData.type,
                inn: formData.inn.trim() || undefined,
                ogrn: formData.ogrn.trim() || undefined,
                kpp: formData.kpp.trim() || undefined,
                address: formData.address.trim() || undefined,
                default_currency: formData.default_currency || undefined,
                comment: formData.comment.trim() || undefined,
            });

            if (response.status) {
                showMessage({ label: 'Контрагент создан', variant: 'success' });
                router.push(`/platform/${companyId}/cpm`);
            } else {
                throw new Error(response.message || 'Ошибка создания');
            }
        } catch (error: any) {
            showMessage({ label: error.message || 'Не удалось создать контрагента', variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    if (!ALLOW_PAGE.isLoading && !ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.CPM_COUNTERPARTIES_CREATE} />
    );

    return (
        <>
        <PlatformHead
            title='Создание контрагента'
            description="Инициализация записи контрагента."
        />
        <PlatformFormBody>
            <PlatformFormSection title='Поиск контрагента' description='Автоматическая подстановка реквизитов'>
                <DaDataBlock onSelect={handleDaDataSelect} />
            </PlatformFormSection>
            <div className={styles.interLine} />
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
                    {isLoading ? 'Создание...' : 'Создать контрагента'}
                </Button>
            </section>
        </PlatformFormBody>
        </>
    );
}