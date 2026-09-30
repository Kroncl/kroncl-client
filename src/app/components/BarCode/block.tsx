'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import clsx from 'clsx';
import styles from './block.module.scss';

type BarcodeFormat = 'EAN13' | 'EAN8' | 'UPC' | 'CODE128' | 'CODE39' | 'ITF14';

const FORMATS: { value: BarcodeFormat; label: string }[] = [
    { value: 'EAN13', label: 'EAN-13' },
    { value: 'EAN8', label: 'EAN-8' },
    { value: 'UPC', label: 'UPC-A' },
    { value: 'CODE128', label: 'Code 128' },
    { value: 'CODE39', label: 'Code 39' },
    { value: 'ITF14', label: 'ITF-14' },
];

/**
 * Определяет подходящий формат по строке.
 * Возвращает первый подходящий или null.
 */
function detectFormat(value: string): BarcodeFormat | null {
    const clean = value.replace(/\s/g, '');

    if (/^\d{13}$/.test(clean)) return 'EAN13';
    if (/^\d{12}$/.test(clean)) return 'UPC';
    if (/^\d{8}$/.test(clean)) return 'EAN8';
    if (/^\d{14}$/.test(clean)) return 'ITF14';
    if (/^[A-Z0-9\-.\s$/+%]+$/.test(clean)) return 'CODE39';
    if (/^[\x20-\x7E]+$/.test(clean)) return 'CODE128';

    return null;
}

/**
 * Проверяет, валиден ли код для конкретного формата.
 * Пробует отрендерить в невидимый SVG.
 */
function isValidForFormat(value: string, format: BarcodeFormat): boolean {
    if (!value) return false;

    try {
        const testSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        JsBarcode(testSvg, value, { format });
        return true;
    } catch {
        return false;
    }
}

export interface BarcodeProps {
    className?: string;
    value: string;
    /** Явно заданный формат. Если не указан — определяется автоматически */
    format?: BarcodeFormat;
    /** Показывать переключатель формата */
    showFormatSwitcher?: boolean;
    /** Высота штрихкода */
    height?: number;
    /** Ширина полосы */
    width?: number;
    /** Показывать текст под штрихкодом */
    displayValue?: boolean;
    /** Колбэк при смене формата */
    onFormatChange?: (format: BarcodeFormat) => void;
}

export function BarcodePreview({
    className,
    value,
    format: controlledFormat,
    showFormatSwitcher = false,
    height = 50,
    width = 2,
    displayValue = true,
    onFormatChange,
}: BarcodeProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    // авто-определение формата
    const autoFormat = useMemo(() => detectFormat(value), [value]);

    const [internalFormat, setInternalFormat] = useState<BarcodeFormat>(
        controlledFormat ?? autoFormat ?? 'CODE128'
    );

    // синхронизация с внешним форматом
    useEffect(() => {
        if (controlledFormat) {
            setInternalFormat(controlledFormat);
        } else if (autoFormat) {
            setInternalFormat(autoFormat);
        }
    }, [controlledFormat, autoFormat]);

    // проверка валидности
    const isValid = useMemo(
        () => isValidForFormat(value, internalFormat),
        [value, internalFormat]
    );

    // рендер
    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        // очищаем предыдущий рендер
        svg.innerHTML = '';

        if (!value || !isValid) return;

        try {
            JsBarcode(svg, value, {
                format: internalFormat,
                width,
                height,
                displayValue,
                margin: 4,
            });
        } catch (e) {
            console.warn('Barcode render failed:', e);
        }
    }, [value, internalFormat, isValid, width, height, displayValue]);

    function handleFormatChange(next: BarcodeFormat) {
        setInternalFormat(next);
        onFormatChange?.(next);
    }

    return (
        <div className={clsx(styles.wrapper, className)}>
            {showFormatSwitcher && (
                <div className={styles.formats}>
                    {FORMATS.map(f => (
                        <button
                            key={f.value}
                            type='button'
                            className={clsx(
                                styles.format,
                                internalFormat === f.value && styles.active
                            )}
                            onClick={() => handleFormatChange(f.value)}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            )}

            <div className={styles.preview}>
                {!value ? (
                    <div className={styles.plug}>Код не задан</div>
                ) : !isValid ? (
                    <div className={styles.plug}>
                        Невалидный код для формата <strong>{internalFormat}</strong>
                    </div>
                ) : (
                    <svg ref={svgRef} className={styles.svg} />
                )}
            </div>
        </div>
    );
}