import { useEffect, useState, useCallback, useRef } from 'react';
import { companyInitApi } from './api';

interface UseStorageStatusOptions {
    onReady?: () => void;
    onError?: (error: string) => void;
    interval?: number;
}

interface StorageStatus {
    isReady: boolean;
    databaseReady: boolean;
    mediaReady: boolean;
    databaseStatus: string;
    mediaStatus: string;
    message: string;
}

export const useStorageStatus = (companyId: string | null, options: UseStorageStatusOptions = {}) => {
    const [status, setStatus] = useState<StorageStatus>({
        isReady: false,
        databaseReady: false,
        mediaReady: false,
        databaseStatus: 'checking',
        mediaStatus: 'checking',
        message: 'Проверка статуса хранилища...'
    });
    
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { onReady, onError, interval = 5000 } = options;

    const stopPolling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const checkStatus = useCallback(async () => {
        if (!companyId) return;

        try {
            const response = await companyInitApi.getCompanyStorage(companyId);
            
            if (response.status && response.data) {
                const data = response.data;
                const databaseReady = data.database.is_ready;
                const mediaReady = data.media.is_ready;
                const allReady = databaseReady && mediaReady;
                
                setStatus({
                    isReady: allReady,
                    databaseReady,
                    mediaReady,
                    databaseStatus: data.database.status,
                    mediaStatus: data.media.is_ready ? 'ready' : (data.media.exists ? 'exists' : 'creating'),
                    message: getStatusMessage(data.database.status, data.media.is_ready)
                });
                
                if (allReady) {
                    stopPolling();
                    onReady?.();
                }
            } else {
                setStatus(prev => ({
                    ...prev,
                    message: response.message || 'Ошибка получения статуса'
                }));
            }
        } catch (error) {
            console.error('Ошибка проверки статуса хранилища:', error);
            setStatus(prev => ({
                ...prev,
                message: 'Ошибка соединения с сервером'
            }));
            onError?.('Ошибка соединения с сервером');
        }
    }, [companyId, onReady, onError, stopPolling]);

    const getStatusMessage = (dbStatus: string, mediaReady: boolean): string => {
        if (dbStatus === 'provisioning') {
            return 'Инициализация базы данных...';
        }
        if (!mediaReady) {
            return 'Подготовка файлового хранилища...';
        }
        if (dbStatus === 'active' && mediaReady) {
            return 'Все компоненты готовы!';
        }
        if (dbStatus === 'failed') {
            return 'Ошибка инициализации базы данных';
        }
        return 'Настройка окружения...';
    };

    useEffect(() => {
        if (!companyId) {
            stopPolling();
            return;
        }
        
        checkStatus();
        
        intervalRef.current = setInterval(checkStatus, interval);
        
        return () => {
            stopPolling();
        };
    }, [companyId, checkStatus, interval, stopPolling]);

    return status;
};