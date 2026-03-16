'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import { useEffect, useState } from "react";
import { useDm } from "@/apps/company/modules";
import { DealType } from "@/apps/company/modules/dm/types";
import { TypeCard } from "../type-card/card";
import Spinner from "@/assets/ui-kit/spinner/spinner";

export interface ChooseTypeBlockProps {
    className?: string;
    onSelect?: (typeId: string | null) => void;
    selectedTypeId?: string | null;
}

export function ChooseTypeBlock({
    className,
    onSelect,
    selectedTypeId
}: ChooseTypeBlockProps) {
    const dmModule = useDm();
    const [types, setTypes] = useState<DealType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadTypes();
    }, []);

    const loadTypes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await dmModule.getDealTypes({ 
                page: 1, 
                limit: 100 
            });
            
            if (response.status && response.data?.deal_types) {
                setTypes(response.data.deal_types);
            } else {
                setError('Не удалось загрузить типы сделок');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ошибка загрузки');
            console.error('Error loading deal types:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (type: DealType) => {
        if (onSelect) {
            // Если кликнули по уже выбранному - снимаем выделение
            if (selectedTypeId === type.id) {
                onSelect(null);
            } else {
                onSelect(type.id);
            }
        }
    };

    if (loading) {
        return (
            <div className={clsx(styles.block, styles.loading, className)}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={clsx(styles.block, styles.empty, className)}>
                {error}
            </div>
        );
    }

    if (types.length === 0) {
        return (
            <div className={clsx(styles.block, styles.empty, className)}>
                <div className={styles.emptyTitle}>Нет типов сделок</div>
            </div>
        );
    }

    return (
        <div className={clsx(styles.block, className)}>
            <div className={styles.grid}>
                {types.map((type) => (
                    <TypeCard
                        key={type.id}
                        type={type}
                        selectable
                        isSelected={selectedTypeId === type.id}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}