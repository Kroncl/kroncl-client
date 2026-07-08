'use client';

import clsx from 'clsx';
import styles from './fields.module.scss';
import { useMessage } from '@/app/platform/components/lib/message/provider';

export interface Field {
    label: string;
    value?: string | number | boolean;
}

export interface FieldsBlockProps {
    className?: string;
    fields?: Field[];
}

export function PlatformFields({
    className,
    fields
}: FieldsBlockProps) {
    const { showMessage } = useMessage();

    const handleCopy = (field: Field) => {
        const text = field.value?.toString() || '';
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            showMessage({
                label: `${field.label} скопировано`,
                variant: 'success',
            });
        }).catch(() => {
            showMessage({
                label: 'Не удалось скопировать',
                variant: 'error',
            });
        });
    };

    return (
        <div className={clsx(styles.container, className)}>
            {fields?.map((field, index) => (
                <div
                    key={index}
                    className={styles.row}
                    onClick={() => handleCopy(field)}
                    title="Нажмите, чтобы скопировать"
                >
                    <div className={styles.label}>{field.label}</div>
                    <div className={styles.value}>
                        {field.value ? field.value : 'Без значения'}
                    </div>
                </div>
            ))}
        </div>
    );
}