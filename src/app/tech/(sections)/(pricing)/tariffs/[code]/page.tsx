'use client';

import { PlatformHead } from '@/app/platform/components/lib/head/head';
import { PlatformFormBody, PlatformFormInput, PlatformFormSection, PlatformFormTextarea } from '@/app/platform/components/lib/form';
import { PlatformModal } from '@/app/platform/components/lib/modal/modal';
import { PlatformModalConfirmation } from '@/app/platform/components/lib/modal/confirmation/confirmation';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';
import Button from '@/assets/ui-kit/button/button';
import { useParams, useRouter } from 'next/navigation';
import { useAdminLevel } from '@/apps/admin/auth/hook';
import { ADMIN_LEVEL_5 } from '@/apps/admin/auth/types';
import { adminPricingPlansApi } from '@/apps/admin/pricing/plans/api';
import { PricingPlan } from '@/apps/pricing/types';
import { useEffect, useState, useCallback } from 'react';
import { useMessage } from '@/app/platform/components/lib/message/provider';
import { AdminKeywordModal } from '@/app/tech/components/keyword-modal/modal';

export default function EditPlanPage() {
    const params = useParams();
    const router = useRouter();
    const planCode = params.code as string;
    const { showMessage } = useMessage();
    const { allowed: isAdmin, isLoading: adminLoading } = useAdminLevel(ADMIN_LEVEL_5);
    
    const [plan, setPlan] = useState<PricingPlan | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [isKeywordModalOpen, setIsKeywordModalOpen] = useState(false);
    const [pendingUpdateData, setPendingUpdateData] = useState<Partial<PricingPlan> | null>(null);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price_per_month: 0,
        price_per_year: 0,
        limit_db_mb: 0,
        limit_objects_mb: 0,
        limit_objects_count: 0
    });

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await adminPricingPlansApi.getPlan(planCode);
                if (response.status && response.data) {
                    setPlan(response.data);
                    setFormData({
                        name: response.data.name,
                        description: response.data.description,
                        price_per_month: response.data.price_per_month,
                        price_per_year: response.data.price_per_year,
                        limit_db_mb: response.data.limit_db_mb,
                        limit_objects_mb: response.data.limit_objects_mb,
                        limit_objects_count: response.data.limit_objects_count
                    });
                } else {
                    showMessage({ label: 'Тарифный план не найден', variant: 'error' });
                    router.push('/tech/tariffs');
                }
            } catch (err) {
                console.error('Failed to fetch plan:', err);
                showMessage({ label: 'Ошибка загрузки данных', variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, [planCode, router, showMessage]);

    const handleFieldChange = useCallback((field: keyof typeof formData, value: string) => {
        if (field === 'name' || field === 'description') {
            setFormData(prev => ({ ...prev, [field]: value }));
        } else {
            const numValue = parseInt(value);
            if (!isNaN(numValue) && numValue >= 0) {
                setFormData(prev => ({ ...prev, [field]: numValue }));
            }
        }
    }, []);

    const handleUpdateWithKeyword = (keyword: string) => {
        if (!pendingUpdateData) return;
        
        setUpdating(true);
        
        adminPricingPlansApi.updatePlan(planCode, pendingUpdateData, keyword)
            .then(response => {
                if (response.status) {
                    showMessage({ label: 'Тарифный план успешно обновлён', variant: 'success' });
                    router.push('/tech/tariffs');
                } else {
                    showMessage({ label: response.message || 'Ошибка при обновлении', variant: 'error' });
                }
            })
            .catch((err: any) => {
                showMessage({ label: err.message || 'Ошибка при обновлении', variant: 'error' });
            })
            .finally(() => {
                setUpdating(false);
                setIsKeywordModalOpen(false);
                setPendingUpdateData(null);
            });
    };

    const handleUpdate = async () => {
        if (!formData.name.trim()) {
            showMessage({ label: 'Введите название тарифного плана', variant: 'error' });
            return;
        }

        const updateData: Partial<PricingPlan> = {};
        
        if (plan && formData.name !== plan.name) updateData.name = formData.name;
        if (plan && formData.description !== plan.description) updateData.description = formData.description;
        if (plan && formData.price_per_month !== plan.price_per_month) updateData.price_per_month = formData.price_per_month;
        if (plan && formData.price_per_year !== plan.price_per_year) updateData.price_per_year = formData.price_per_year;
        if (plan && formData.limit_db_mb !== plan.limit_db_mb) updateData.limit_db_mb = formData.limit_db_mb;
        if (plan && formData.limit_objects_mb !== plan.limit_objects_mb) updateData.limit_objects_mb = formData.limit_objects_mb;
        if (plan && formData.limit_objects_count !== plan.limit_objects_count) updateData.limit_objects_count = formData.limit_objects_count;

        if (Object.keys(updateData).length === 0) {
            showMessage({ label: 'Нет изменений для сохранения', variant: 'default' });
            return;
        }

        setPendingUpdateData(updateData);
        setIsKeywordModalOpen(true);
    };

    const hasChanges = plan && (
        formData.name !== plan.name ||
        formData.description !== plan.description ||
        formData.price_per_month !== plan.price_per_month ||
        formData.price_per_year !== plan.price_per_year ||
        formData.limit_db_mb !== plan.limit_db_mb ||
        formData.limit_objects_mb !== plan.limit_objects_mb ||
        formData.limit_objects_count !== plan.limit_objects_count
    );

    if (adminLoading || loading) {
        return <PlatformLoading />;
    }

    if (!isAdmin) {
        return <PlatformLoading />;
    }

    if (!plan) {
        return <PlatformLoading />;
    }

    return (
        <>
            <PlatformHead
                title={`Редактирование тарифа`}
                description={`${plan.name} (${plan.code})`}
            />
            <PlatformFormBody>
                <PlatformFormSection
                    title="Название"
                    description="Отображаемое название тарифного плана"
                >
                    <PlatformFormInput
                        value={formData.name}
                        onChange={(val) => handleFieldChange('name', val)}
                        placeholder="Базовый"
                        maxLength={255}
                        disabled={updating}
                    />
                </PlatformFormSection>

                <PlatformFormSection
                    title="Описание"
                    description="Краткое описание тарифного плана"
                >
                    <PlatformFormTextarea
                        value={formData.description}
                        onChange={(val) => handleFieldChange('description', val)}
                        placeholder="Описание тарифного плана..."
                        rows={3}
                        disabled={updating}
                    />
                </PlatformFormSection>

                <PlatformFormSection
                    title="Цена за месяц"
                    description="Стоимость тарифа в месяц (в рублях)"
                >
                    <PlatformFormInput
                        type="number"
                        value={formData.price_per_month}
                        onChange={(val) => handleFieldChange('price_per_month', val)}
                        min={0}
                        disabled={updating}
                    />
                </PlatformFormSection>

                <PlatformFormSection
                    title="Цена за год"
                    description="Стоимость тарифа в год (в рублях)"
                >
                    <PlatformFormInput
                        type="number"
                        value={formData.price_per_year}
                        onChange={(val) => handleFieldChange('price_per_year', val)}
                        min={0}
                        disabled={updating}
                    />
                </PlatformFormSection>

                <PlatformFormSection
                    title="Лимит базы данных (MB)"
                    description="Максимальный размер базы данных в мегабайтах"
                >
                    <PlatformFormInput
                        type="number"
                        value={formData.limit_db_mb}
                        onChange={(val) => handleFieldChange('limit_db_mb', val)}
                        min={0}
                        disabled={updating}
                    />
                </PlatformFormSection>

                <PlatformFormSection
                    title="Лимит файлового хранилища (MB)"
                    description="Максимальный объём файлов в мегабайтах"
                >
                    <PlatformFormInput
                        type="number"
                        value={formData.limit_objects_mb}
                        onChange={(val) => handleFieldChange('limit_objects_mb', val)}
                        min={0}
                        disabled={updating}
                    />
                </PlatformFormSection>

                <PlatformFormSection
                    title="Лимит количества файлов"
                    description="Максимальное количество файлов в хранилище"
                >
                    <PlatformFormInput
                        type="number"
                        value={formData.limit_objects_count}
                        onChange={(val) => handleFieldChange('limit_objects_count', val)}
                        min={0}
                        disabled={updating}
                    />
                </PlatformFormSection>

                <section>
                    <Button
                        variant="accent"
                        onClick={handleUpdate}
                        loading={updating}
                        disabled={updating || !hasChanges}
                    >
                        Сохранить изменения
                    </Button>
                </section>
            </PlatformFormBody>

            <AdminKeywordModal
                isOpen={isKeywordModalOpen}
                onClose={() => {
                    setIsKeywordModalOpen(false);
                    setPendingUpdateData(null);
                }}
                onConfirm={handleUpdateWithKeyword}
                title="Подтверждение изменения тарифа"
                description={`Вы собираетесь изменить тарифный план "${plan.name}". Для подтверждения введите административный ключ.`}
                actionName="Сохранить"
                isLoading={updating}
            />
        </>
    );
}