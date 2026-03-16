'use client';

import clsx from 'clsx';
import styles from './card.module.scss';
import Button from '@/assets/ui-kit/button/button';
import Edit from '@/assets/ui-kit/icons/edit';
import { useParams } from 'next/navigation';
import { DealStatus } from '@/apps/company/modules/dm/types';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';

export interface StatusCardProps {
    status: DealStatus;
    className?: string;
    onSelect?: (status: DealStatus) => void;
    selectable?: boolean;
    isSelected?: boolean;
}

export function StatusCard({
    status,
    className,
    onSelect,
    selectable = false,
    isSelected
}: StatusCardProps) {
    const params = useParams();
    const companyId = params.id as string;

    const handleClick = (e: React.MouseEvent) => {
        if (selectable && onSelect) {
            e.preventDefault();
            onSelect(status);
        }
    };

    const cardContent = (
        <>
            <div className={styles.mark} style={{backgroundColor: status.color || '#ccc'}} />
            <div className={styles.sort}>{status.sort_order}</div>
            <div className={styles.info}>
                <div className={styles.name}>{status.name}</div>
                {status.is_default && (
                    <ModalTooltip content='Сначала все сделки попадают сюда.'>
                        <span className={styles.tag}>Начальный статус</span>
                    </ModalTooltip>
                )}
            </div>
            <div className={styles.actions}>
                <Button 
                    variant='empty'
                    className={styles.action} 
                    icon={<Edit />}
                    as='link'
                    href={`/platform/${companyId}/dm/statuses/${status.id}`}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                />
            </div>
        </>
    );

    if (selectable) {
        return (
            <div 
                className={clsx(styles.status, isSelected && styles.selected, className)}
                onClick={handleClick}
            >
                {cardContent}
            </div>
        );
    }

    return (
        <div className={clsx(styles.status, className)}>
            {cardContent}
        </div>
    );
}