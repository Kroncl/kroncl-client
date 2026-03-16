'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import Link from "next/link";
import { useParams } from "next/navigation";
import { DealType } from "@/apps/company/modules/dm/types";

export interface TypeCardProps {
    type: DealType;
    className?: string;
    onSelect?: (type: DealType) => void;
    selectable?: boolean;
    isSelected?: boolean;
}

export function TypeCard({
    type,
    className,
    onSelect,
    selectable = false,
    isSelected
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

    if (selectable) {
        return (
            <div 
                className={clsx(styles.card, isSelected && styles.selected, className)}
                onClick={handleClick}
            >
                {cardContent}
            </div>
        );
    }

    return (
        <Link 
            href={`/platform/${companyId}/dm/types/${type.id}`} 
            className={clsx(styles.type, className)}
        >
            {cardContent}
        </Link>
    );
}