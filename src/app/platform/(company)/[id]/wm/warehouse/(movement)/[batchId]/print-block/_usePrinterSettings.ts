'use client';

import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, PrinterSettings, STORAGE_KEY } from './_types';

type UsePrinterSettingsResult = {
    settings: PrinterSettings;
    updateSettings: (patch: Partial<PrinterSettings>) => void;
    loaded: boolean;   // true, если настройки прочитаны из localStorage
};

export function usePrinterSettings(): UsePrinterSettingsResult {
    const [settings, setSettings] = useState<PrinterSettings>(DEFAULT_SETTINGS);
    const [loaded, setLoaded] = useState(false);

    // чтение при монтировании
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                setSettings({ ...DEFAULT_SETTINGS, ...parsed });
                setLoaded(true);
            }
        } catch (e) {
            console.warn('Failed to read printer settings:', e);
        }
    }, []);

    // запись при каждом изменении (после первого чтения)
    useEffect(() => {
        if (!loaded) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
        } catch (e) {
            console.warn('Failed to save printer settings:', e);
        }
    }, [settings, loaded]);

    const updateSettings = useCallback((patch: Partial<PrinterSettings>) => {
        setSettings(prev => ({ ...prev, ...patch }));
        // если пользователь что-то меняет — считаем, что настройки «свои»
        if (!loaded) setLoaded(true);
    }, [loaded]);

    return { settings, updateSettings, loaded };
}