'use client';

import clsx from 'clsx';
import styles from './block.module.scss';
import {
    PlatformFormBody,
    PlatformFormInput,
    PlatformFormSection,
    PlatformFormVariants,
} from '@/app/platform/components/lib/form';
import Close from '@/assets/ui-kit/icons/close';
import { PrinterDevice, PrinterSettings } from '../_types';

export interface SettingsBlockProps {
    className?: string;
    settings: PrinterSettings;
    onSettingsChange: (patch: Partial<PrinterSettings>) => void;
    showUsedNotice?: boolean;

    deviceInfo: PrinterDevice | null;
    onRequestDevice: () => void;
    onDisconnect: () => void;
    isConnecting: boolean;
    isSupported: boolean;
}

export function SettingsBlock({
    className,
    settings,
    onSettingsChange,
    showUsedNotice = false,
    deviceInfo,
    onRequestDevice,
    onDisconnect,
    isConnecting,
    isSupported,
}: SettingsBlockProps) {
    return (
        <div className={clsx(styles.container, className)}>
            {showUsedNotice && (
                <div className={styles.used}>Применены сохранённые настройки печати</div>
            )}
            <PlatformFormBody className={styles.form}>
                <PlatformFormSection
                    title='Принтер'
                    description=''
                    actions={[{
                        children: isConnecting ? 'Подключение...' : 'Выбрать',
                        variant: 'accent',
                        onClick: onRequestDevice,
                        disabled: !isSupported || isConnecting,
                    }]}
                >
                    {deviceInfo ? (
                        <div className={styles.device}>
                            <div className={styles.name}>{deviceInfo.productName}</div>
                            <div
                                className={styles.action}
                                onClick={onDisconnect}
                            >
                                <Close className={styles.svg} />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.empty}>Принтер не выбран</div>
                    )}
                </PlatformFormSection>

                <PlatformFormSection title='Формат' description=''>
                    <PlatformFormVariants
                        value={settings.language}
                        onChange={(v) => onSettingsChange({ language: v as PrinterSettings['language'] })}
                        options={[
                            { value: 'tspl', label: 'TSPL' },
                            { value: 'zpl', label: 'ZPL' },
                            { value: 'epl', label: 'EPL' },
                        ]}
                    />
                </PlatformFormSection>

                <PlatformFormSection title='Размеры этикеток (мм)' description=''>
                    <div className={styles.split}>
                        <PlatformFormInput
                            placeholder='Ширина'
                            className={styles.input}
                            value={String(settings.widthMm)}
                            onChange={(v) => onSettingsChange({ widthMm: parseInt(v) || 0 })}
                        />
                        <PlatformFormInput
                            placeholder='Длина'
                            className={styles.input}
                            value={String(settings.heightMm)}
                            onChange={(v) => onSettingsChange({ heightMm: parseInt(v) || 0 })}
                        />
                    </div>
                </PlatformFormSection>

                <PlatformFormSection title='Кол-во копий, Плотность (1-15)' description=''>
                    <div className={styles.split}>
                        <PlatformFormInput
                            placeholder='Кол-во копий'
                            className={styles.input}
                            value={String(settings.copies)}
                            onChange={(v) => onSettingsChange({ copies: parseInt(v) || 1 })}
                        />
                        <PlatformFormInput
                            placeholder='Плотность (1-15)'
                            className={styles.input}
                            value={String(settings.density)}
                            onChange={(v) => onSettingsChange({ density: parseInt(v) || 7 })}
                        />
                    </div>
                </PlatformFormSection>
            </PlatformFormBody>
        </div>
    );
}