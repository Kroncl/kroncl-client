'use client';

import { PlatformHead } from "@/app/platform/components/lib/head/head";
import { PlatformFields, Field } from "@/app/platform/components/lib/fields/fields";
import { PlatformLoading } from "@/app/platform/components/lib/loading/loading";
import { PlatformError } from "@/app/platform/components/lib/error/block";
import { PlatformNotAllowed } from "@/app/platform/components/lib/not-allowed/block";
import { PlatformModal } from "@/app/platform/components/lib/modal/modal";
import { PlatformModalConfirmation } from "@/app/platform/components/lib/modal/confirmation/confirmation";
import { useMessage } from "@/app/platform/components/lib/message/provider";
import { useCpm } from "@/apps/company/modules";
import { Counterparty, getCounterpartyTypeLabel } from "@/apps/company/modules/cpm/types";
import { PERMISSIONS } from "@/apps/permissions/codes.config";
import { usePermission, isAllowed } from "@/apps/permissions/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatDate } from "@/assets/utils/date";
import Edit from "@/assets/ui-kit/icons/edit";
import Exit from "@/assets/ui-kit/icons/exit";

export default function Page() {
    const params = useParams();
    const companyId = params.id as string;
    const counterpartyId = params.counterpartyId as string;
    const cpmModule = useCpm();
    const router = useRouter();
    const { showMessage } = useMessage();

    const ALLOW_PAGE = usePermission(PERMISSIONS.CPM_COUNTERPARTIES);
    const ALLOW_UPDATE = usePermission(PERMISSIONS.CPM_COUNTERPARTIES_UPDATE);

    const [counterparty, setCounterparty] = useState<Counterparty | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalDeactivateOpen, setIsModalDeactivateOpen] = useState(false);
    const [isModalActivateOpen, setIsModalActivateOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await cpmModule.getCounterparty(counterpartyId);
                if (response.status && response.data) {
                    setCounterparty(response.data);
                } else {
                    setError("Не удалось загрузить контрагента");
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Ошибка загрузки");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [counterpartyId]);

    const handleDeactivate = async () => {
        try {
            await cpmModule.deactivateCounterparty(counterparty!.id);
            showMessage({ label: 'Контрагент деактивирован.', variant: 'success' });
            setIsModalDeactivateOpen(false);
            const response = await cpmModule.getCounterparty(counterpartyId);
            if (response.status) setCounterparty(response.data);
        } catch (error: any) {
            showMessage({ label: 'Не удалось деактивировать контрагента.', variant: 'error', about: error.message });
        }
    };

    const handleActivate = async () => {
        try {
            await cpmModule.activateCounterparty(counterparty!.id);
            showMessage({ label: 'Контрагент активирован.', variant: 'success' });
            setIsModalActivateOpen(false);
            const response = await cpmModule.getCounterparty(counterpartyId);
            if (response.status) setCounterparty(response.data);
        } catch (error: any) {
            showMessage({ label: 'Не удалось активировать контрагента.', variant: 'error', about: error.message });
        }
    };

    if (loading || ALLOW_PAGE.isLoading) return <PlatformLoading />;
    if (error || !counterparty) return <PlatformError error={error || 'Не удалось загрузить контрагента'} />;
    if (!ALLOW_PAGE.isLoading && !ALLOW_PAGE.allowed) return (
        <PlatformNotAllowed permission={PERMISSIONS.CPM_COUNTERPARTIES} />
    );

    const isActive = counterparty.status === 'active';

    const actions = isAllowed(ALLOW_UPDATE) ? [
        {
            children: 'Редактировать',
            icon: <Edit />,
            variant: 'accent' as const,
            as: 'link' as const,
            href: `/platform/${companyId}/cpm/${counterpartyId}/edit`
        },
        ...(isActive
            ? [{ children: 'Деактивировать', icon: <Exit />, variant: 'light' as const, onClick: () => setIsModalDeactivateOpen(true) }]
            : [{ children: 'Активировать', icon: <Exit />, variant: 'accent' as const, onClick: () => setIsModalActivateOpen(true) }]
        )
    ] : [];

    const fields: Field[] = [
        { label: 'Наименование', value: counterparty.name },
        { label: 'Тип', value: getCounterpartyTypeLabel(counterparty.type) },
        { label: 'Статус', value: isActive ? 'Активен' : 'Деактивирован' },
        ...(counterparty.inn ? [{ label: 'ИНН', value: counterparty.inn }] : []),
        ...(counterparty.ogrn ? [{ label: 'ОГРН/ОГРНИП', value: counterparty.ogrn }] : []),
        ...(counterparty.kpp ? [{ label: 'КПП', value: counterparty.kpp }] : []),
        ...(counterparty.address ? [{ label: 'Адрес', value: counterparty.address }] : []),
        ...(counterparty.default_currency ? [{ label: 'Рабочая валюта', value: counterparty.default_currency }] : []),
        ...(counterparty.comment ? [{ label: 'Описание', value: counterparty.comment }] : []),
        { label: 'Создан', value: formatDate(counterparty.created_at) },
        { label: 'Обновлён', value: counterparty.updated_at !== counterparty.created_at ? formatDate(counterparty.updated_at) : '-' },
    ];

    return (
        <>
        <PlatformHead
            title={counterparty.name}
            description={`Карточка контрагента. Создан ${formatDate(counterparty.created_at)}. Статус: ${isActive ? 'активен' : 'неактивен'}.`}
            actions={actions}
        />
        <PlatformFields fields={fields} />

        <PlatformModal isOpen={isModalDeactivateOpen} onClose={() => setIsModalDeactivateOpen(false)}>
            <PlatformModalConfirmation
                title='Деактивировать контрагента?'
                description='Контрагент будет деактивирован. Все связанные данные сохранятся, но операции с ним будут заблокированы.'
                actions={[
                    { children: 'Отмена', variant: 'light', onClick: () => setIsModalDeactivateOpen(false) },
                    { variant: "accent", onClick: handleDeactivate, children: 'Деактивировать' }
                ]}
            />
        </PlatformModal>

        <PlatformModal isOpen={isModalActivateOpen} onClose={() => setIsModalActivateOpen(false)}>
            <PlatformModalConfirmation
                title='Активировать контрагента?'
                description='Контрагент будет активирован и снова сможет участвовать в операциях.'
                actions={[
                    { children: 'Отмена', variant: 'light', onClick: () => setIsModalActivateOpen(false) },
                    { variant: "accent", onClick: handleActivate, children: 'Активировать' }
                ]}
            />
        </PlatformModal>
        </>
    );
}