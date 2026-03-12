'use client';

import clsx from "clsx";
import styles from './card.module.scss';
import Plus from "@/assets/ui-kit/icons/plus";
import Minus from "@/assets/ui-kit/icons/minus";
import Close from "@/assets/ui-kit/icons/close";
import Input from "@/assets/ui-kit/input/input";
import { ModalTooltip } from "@/app/components/tooltip/tooltip";
import { CatalogUnit } from "@/apps/company/modules/wm/types";
import { getUnitRu } from "../../../(catalog)/units/new/_units";
import Link from "next/link";
import { useParams } from "next/navigation";

export interface PositionCardProps {
    className?: string;
    quantity: number;
    price?: number | null;
    unit: CatalogUnit;
    priceLabel?: string;
    onQuantityChange?: (quantity: number) => void;
    onPriceChange?: (price: number) => void;
    onIncrement?: () => void;
    onDecrement?: () => void;
    onRemove?: () => void;
    readOnly?: boolean;
}

export function PositionCard({
    className,
    quantity,
    price,
    unit,
    priceLabel = "Цена за единицу",
    onQuantityChange,
    onPriceChange,
    onIncrement,
    onDecrement,
    onRemove,
    readOnly = false
}: PositionCardProps) {
    const params = useParams();
    const companyId = params.id as string;

    const handleQuantityInput = (value: string) => {
        const num = parseInt(value);
        if (!isNaN(num) && num > 0 && onQuantityChange) {
            onQuantityChange(num);
        }
    };

    const handlePriceInput = (value: string) => {
        const num = parseFloat(value);
        if (!isNaN(num) && num >= 0 && onPriceChange) {
            onPriceChange(num);
        }
    };

    return (
        <div className={clsx(styles.position, className)}>
            <div className={styles.info}>
                <div className={styles.name}>{unit.name}</div>
                
                <div className={styles.price}>
                    <Input 
                        className={styles.input} 
                        placeholder={priceLabel}
                        value={price?.toString() || ''}
                        onChange={(e) => handlePriceInput(e.target.value)}
                        type="text"
                        disabled={readOnly}
                    />
                </div>

                <ModalTooltip content='Единица измерения'>
                    <div className={styles.section}>{getUnitRu(unit.unit)}</div>
                </ModalTooltip>

                <Input 
                    className={styles.quantity} 
                    value={quantity} 
                    placeholder="Количество"
                    onChange={(e) => handleQuantityInput(e.target.value)}
                    type="text"
                    disabled={readOnly}
                />

                <ModalTooltip content='Идентификатор товара'>
                    <Link target='_blank' href={`/platform/${companyId}/wm/units/${unit.id}`} className={styles.id}>{unit.id.split('-')[0]}</Link>
                </ModalTooltip>
            </div>

            {!readOnly && (
                <div className={styles.actions}>
                    <button className={styles.button} onClick={onIncrement}><Plus /></button>
                    <button className={styles.button} onClick={onDecrement}><Minus /></button>
                    <button className={styles.button} onClick={onRemove}><Close /></button>
                </div>
            )}
        </div>
    );
}