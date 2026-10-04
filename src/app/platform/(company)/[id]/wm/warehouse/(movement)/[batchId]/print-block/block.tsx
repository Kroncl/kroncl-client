'use client';

import clsx from "clsx";
import styles from './block.module.scss';
import Button from "@/assets/ui-kit/button/button";
import { BarcodePreview } from "@/app/components/BarCode/block";
import { formatDate } from "@/assets/utils/date";
import { getUnitRu } from "../../../../catalog/units/new/_units";
import { SettingsBlock } from "./settings-block/block";
import { PositionWithUnit } from "@/apps/company/modules/wm/types";
import { useCallback, useState } from "react";
import { DEFAULT_SETTINGS, PrinterSettings } from "./_types";
import { useWebUSB } from "./_useWebUSB";
import { useMessage } from "@/app/platform/components/lib/message/provider";
import { generateCommands } from "./_generators";
import { usePrinterSettings } from "./_usePrinterSettings";

export interface PrintBlockProps {
    className?: string;
    positions: PositionWithUnit[];
    onPrinted?: () => void;
}

export function PrintBlock({
    className,
    positions,
    onPrinted,
}: PrintBlockProps) {
    const { showMessage } = useMessage();
    const usb = useWebUSB();

    const [printing, setPrinting] = useState(false);
    const { settings, updateSettings, loaded } = usePrinterSettings();

    const handleRequestDevice = useCallback(async () => {
        try {
            await usb.requestDevice();
            showMessage({ label: 'Принтер подключён', variant: 'success' });
        } catch (err: any) {
            console.log(err.message)
            showMessage({
                label: err.message || 'Не удалось подключить принтер',
                variant: 'error',
            });
        }
    }, [usb, showMessage]);

    const handlePrint = useCallback(async () => {
        if (!usb.device) {
            showMessage({ label: 'Принтер не подключён', variant: 'error' });
            return;
        }

        setPrinting(true);
        try {
            const commands = generateCommands(positions, settings);

            await usb.send(commands);

            showMessage({ label: 'Этикетки отправлены на печать', variant: 'success' });
            onPrinted?.();
        } catch (err: any) {
            showMessage({
                label: err.message || 'Не удалось напечатать',
                variant: 'error',
            });
        } finally {
            setPrinting(false);
        }
    }, [usb, positions, settings, showMessage, onPrinted]);

    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.head}>
                <div className={styles.title}>Печать этикеток</div>
                <div className={styles.description}>
                    Напечатайте этикетки для товаров и подтвердите завершение этапа.
                </div>
            </div>

            <div className={styles.positions}>
                <div className={styles.title}>Состав поставки</div>
                <div className={styles.items}>
                    {positions.map(pos => (
                        <div key={pos.short_code} className={styles.item}>
                            <div className={styles.preview}>
                                <BarcodePreview
                                    className={styles.canvas}
                                    value={pos.short_code}
                                    format='CODE128'
                                />
                            </div>
                            <div className={styles.info}>
                                <div className={styles.code}><span>{pos.short_code}</span></div>
                                <div className={styles.name}>
                                    {pos.unit.name}{' '}
                                    <span>
                                        {pos.quantity}{getUnitRu(pos.unit.unit)}
                                        {pos.type === 'batch' && <> в партии</>}
                                    </span>
                                </div>
                                <div className={styles.meta}>{formatDate(pos.created_at)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.settings}>
                <div className={styles.title}>Настройки печати</div>
                <div className={styles.description}>
                    Настройки печати вашего принтера. Подключите устройство по USB.
                    WebUSB доступен только в браузерах на движке Chromium.
                    Размеры этикеток указаны производителем на упаковке.
                    Формат принтера (TSPL/ZPL/EPL) — в спецификации.
                </div>
                <SettingsBlock
                    className={styles.area}
                    settings={settings}
                    onSettingsChange={updateSettings}
                    showUsedNotice={loaded}
                    deviceInfo={usb.deviceInfo}
                    onRequestDevice={handleRequestDevice}
                    onDisconnect={usb.disconnect}
                    isConnecting={usb.connecting}
                    isSupported={usb.isSupported}
                />
            </div>

            <div className={styles.warning}>
                Убедитесь, что состав поставки соответствует реальному поступлению.
                На каждую отдельную партию или серийный товар — отдельная этикетка.
            </div>

            <div className={styles.actions}>
                <Button
                    variant="contrast"
                    children={printing ? 'Печать...' : 'Начать печать'}
                    className={styles.action}
                    onClick={handlePrint}
                    disabled={printing || !usb.device}
                />
            </div>
        </div>
    );
}