'use client';

import Input from '@/assets/ui-kit/input/input';
import styles from './block.module.scss';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChooseUnitBlock } from '../choose-unit/block';
import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { PositionCard } from '../position-card/card';
import { CatalogUnit, StockBatchPosition } from '@/apps/company/modules/wm/types';

export interface MasterPositionsBlockProps {
    className?: string;
    direction: 'income' | 'outcome';
    onPositionsChange?: (positions: StockBatchPosition[]) => void;
    initialPositions?: StockBatchPosition[];
    initialUnits?: CatalogUnit[];
    readOnly?: boolean;
}

export interface PositionItem extends StockBatchPosition {
    unit: CatalogUnit;
}

export function MasterPositionsBlock({
    className,
    direction,
    onPositionsChange,
    initialPositions = [],
    initialUnits = [],
    readOnly = false
}: MasterPositionsBlockProps) {
    const params = useParams();
    const companyId = params.id as string;
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [positions, setPositions] = useState<PositionItem[]>([]);
    const [duplicateUnitId, setDuplicateUnitId] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Инициализация начальными данными
    useEffect(() => {
        if (initialPositions.length > 0 && initialUnits.length > 0) {
            const items: PositionItem[] = initialPositions.map(pos => ({
                ...pos,
                unit: initialUnits.find(u => u.id === pos.unit_id)!
            })).filter(item => item.unit);
            setPositions(items);
        }
    }, [initialPositions, initialUnits]);

    const handleInputChange = (value: string) => {
        if (readOnly) return;
        setSearchValue(value);
        if (value.trim()) {
            setIsModalVisible(true);
        } else {
            setIsModalVisible(false);
        }
    };

    const handleInputFocus = () => {
        if (readOnly) return;
        if (searchValue.trim()) {
            setIsModalVisible(true);
        }
    };

    const handleUnitSelect = (unit: CatalogUnit) => {
        if (readOnly) return;
        
        // Проверяем, нет ли уже такой позиции
        const exists = positions.some(p => p.unit_id === unit.id);
        
        if (exists) {
            // Подсвечиваем существующую позицию
            setDuplicateUnitId(unit.id);
            setTimeout(() => setDuplicateUnitId(null), 1000);
        } else {
            // Добавляем новую позицию
            const newPosition: PositionItem = {
                unit_id: unit.id,
                quantity: 1,
                price: direction === 'income' 
                    ? (unit.purchase_price || 0) 
                    : unit.sale_price,
                unit: unit
            };
            const updatedPositions = [...positions, newPosition];
            setPositions(updatedPositions);
            onPositionsChange?.(updatedPositions);
        }
        
        setIsModalVisible(false);
        setSearchValue('');
    };

    const handleQuantityChange = (unitId: string, newQuantity: number) => {
        if (readOnly) return;
        const updatedPositions = positions.map(p => 
            p.unit_id === unitId ? { ...p, quantity: newQuantity } : p
        );
        setPositions(updatedPositions);
        onPositionsChange?.(updatedPositions);
    };

    const handlePriceChange = (unitId: string, newPrice: number) => {
        if (readOnly) return;
        const updatedPositions = positions.map(p => 
            p.unit_id === unitId ? { ...p, price: newPrice } : p
        );
        setPositions(updatedPositions);
        onPositionsChange?.(updatedPositions);
    };

    const handleIncrement = (unitId: string) => {
        if (readOnly) return;
        const position = positions.find(p => p.unit_id === unitId);
        if (position) {
            handleQuantityChange(unitId, position.quantity + 1);
        }
    };

    const handleDecrement = (unitId: string) => {
        if (readOnly) return;
        const position = positions.find(p => p.unit_id === unitId);
        if (position && position.quantity > 1) {
            handleQuantityChange(unitId, position.quantity - 1);
        }
    };

    const handleRemove = (unitId: string) => {
        if (readOnly) return;
        const updatedPositions = positions.filter(p => p.unit_id !== unitId);
        setPositions(updatedPositions);
        onPositionsChange?.(updatedPositions);
    };

    // Закрытие модалки при клике вне
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (readOnly) return;
            if (modalRef.current && !modalRef.current.contains(event.target as Node) &&
                inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsModalVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [readOnly]);

    return (
        <div className={styles.master}>
            <div className={styles.head}>
                <div className={styles.hint}>
                    {readOnly ? (
                        <>Просмотр {direction === 'income' ? 'поставки' : 'отгрузки'}. Состав не редактируется.</>
                    ) : (
                        <>В состав {direction === 'income' ? 'поставки' : 'отгрузки'} добавляются товарные позиции из каталога компании, учитывающиеся в остатках. <Link href={`/platform/${companyId}/wm/units`}>Управление товарными позициями.</Link></>
                    )}
                </div>
                
                {!readOnly && (
                    <>
                        <Input 
                            ref={inputRef}
                            placeholder='Начните вводить название товара в каталоге' 
                            className={styles.input} 
                            fullWidth 
                            variant='elevated'
                            value={searchValue}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={handleInputFocus}
                        />
                        <ChooseUnitBlock 
                            ref={modalRef}
                            className={clsx(styles.modal, isModalVisible && styles.visible)} 
                            searchValue={searchValue}
                            onSelect={handleUnitSelect}
                        />
                    </>
                )}
            </div>
            
            <div className={styles.list}>
                {positions.map((position, index) => (
                    <PositionCard
                        key={index}
                        className={clsx(
                            styles.item, 
                            duplicateUnitId === position.unit_id && styles.contrast
                        )}
                        quantity={position.quantity}
                        price={position.price}
                        unit={position.unit}
                        priceLabel={direction === 'income' ? 'Закупочная цена' : 'Цена продажи'}
                        onQuantityChange={(q) => handleQuantityChange(position.unit_id, q)}
                        onPriceChange={(p) => handlePriceChange(position.unit_id, p)}
                        onIncrement={() => handleIncrement(position.unit_id)}
                        onDecrement={() => handleDecrement(position.unit_id)}
                        onRemove={() => handleRemove(position.unit_id)}
                        readOnly={readOnly}
                    />
                ))}
            </div>
        </div>
    );
}