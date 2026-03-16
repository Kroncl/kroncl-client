'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import Link from "next/link";
import { useParams } from "next/navigation";
import { DealType } from "@/apps/company/modules/dm/types";
import { ModalTooltip } from "@/app/components/tooltip/tooltip";

export interface TypeCardProps {
    type: DealType;
    className?: string;
    onSelect?: (type: DealType) => void;
    selectable?: boolean;
    isSelected?: boolean;
    variant?: 'default' | 'tag';
    disableLinks?: boolean;
}

export function TypeCard({
    type,
    className,
    onSelect,
    selectable = false,
    isSelected,
    variant = 'default',
    disableLinks = false
}: TypeCardProps) {
    const params = useParams();
    const companyId = params.id as string;

    const handleClick = (e: React.MouseEvent) => {
        if (selectable && onSelect) {
            e.preventDefault();
            onSelect(type);
        }
    };

    const cardContent = (
        <div className={styles.info}>
            <div className={styles.name}>{type.name}</div>
            {type.comment && (
                <div className={styles.comment}>{type.comment}</div>
            )}
        </div>
    );

    if (selectable || disableLinks) {
        return (
            <ModalTooltip content={type.name}>
            <div 
                className={clsx(styles.type, styles[variant], isSelected && styles.selected, className)}
                onClick={handleClick}
            >
                {cardContent}
            </div>
            </ModalTooltip>
        );
    }

    return (
        <ModalTooltip content={type.name}>
        <Link 
            href={`/platform/${companyId}/dm/types/${type.id}`} 
            className={clsx(styles.type, styles[variant], className)}
        >
            {cardContent}
        </Link>
        </ModalTooltip>
    );
}