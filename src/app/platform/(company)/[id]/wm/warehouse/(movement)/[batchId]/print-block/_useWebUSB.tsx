'use client';

import { useCallback, useState } from 'react';
import { PrinterDevice } from './_types';

const INTERFACE_NUMBER = 0;
const ENDPOINT_NUMBER = 1;

export function useWebUSB() {
    const [device, setDevice] = useState<USBDevice | null>(null);
    const [deviceInfo, setDeviceInfo] = useState<PrinterDevice | null>(null);
    const [connecting, setConnecting] = useState(false);

    const isSupported =
        typeof navigator !== 'undefined' && 'usb' in navigator;

    const requestDevice = useCallback(async () => {
        if (!isSupported) {
            throw new Error('WebUSB не поддерживается в этом браузере');
        }

        setConnecting(true);
        try {
            const usbDevice = await navigator.usb.requestDevice({ filters: [] });

            try {
                await usbDevice.open();

                if (usbDevice.configuration === null) {
                    await usbDevice.selectConfiguration(1);
                }

                await usbDevice.claimInterface(INTERFACE_NUMBER);
            } catch (err: any) {
                // закрываем устройство, если открылось
                try { await usbDevice.close(); } catch {}

                // переводим системную ошибку в понятную
                if (err.name === 'SecurityError' || err.message?.includes('Access denied')) {
                    throw new Error(
                        'Доступ к принтеру запрещён. На Windows системный драйвер ' +
                        'блокирует WebUSB. Замените драйвер на WinUSB (через Zadig) ' +
                        'или используйте localhost-агент для печати.'
                    );
                }

                throw new Error(err.message || 'Не удалось открыть принтер');
            }

            setDevice(usbDevice);
            setDeviceInfo({
                vendorId: usbDevice.vendorId,
                productId: usbDevice.productId,
                productName: usbDevice.productName ?? `USB ${usbDevice.vendorId}:${usbDevice.productId}`,
                serialNumber: usbDevice.serialNumber ?? undefined,
            });

            return usbDevice;
        } finally {
            setConnecting(false);
        }
    }, [isSupported]);

    const disconnect = useCallback(async () => {
        if (device) {
            try {
                await device.releaseInterface(INTERFACE_NUMBER);
                await device.close();
            } catch (e) {
                console.warn('WebUSB close failed:', e);
            }
        }
        setDevice(null);
        setDeviceInfo(null);
    }, [device]);

    const send = useCallback(
        async (commands: string) => {
            if (!device) throw new Error('Принтер не подключён');

            const encoder = new TextEncoder();
            const data = encoder.encode(commands);

            await device.transferOut(ENDPOINT_NUMBER, data);
        },
        [device]
    );

    return {
        isSupported,
        device,
        deviceInfo,
        connecting,
        requestDevice,
        disconnect,
        send,
    };
}