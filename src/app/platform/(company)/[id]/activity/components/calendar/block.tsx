'use client';

import clsx from 'clsx';
import styles from './block.module.scss';
import { ModalTooltip } from '@/app/components/tooltip/tooltip';
import { useLogs } from '@/apps/company/modules';
import { LogActivity } from '@/apps/company/modules/logs/types';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { PlatformLoading } from '@/app/platform/components/lib/loading/loading';

export interface CalendarProps {
    className?: string;
}

const DAYS_TO_DISPLAY = 364;

// Функция нормализации даты в YYYY-MM-DD
const normalizeDate = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Названия месяцев на русском
const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

export function Calendar({
    className
}: CalendarProps) {
    const params = useParams();
    const companyId = params.id as string;
    const logsModule = useLogs();

    const [activity, setActivity] = useState<LogActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActivity = async () => {
            setLoading(true);
            try {
                const response = await logsModule.getActivity();
                if (response.status && response.data) {
                    setActivity(response.data);
                    console.log('Activity data:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch activity:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchActivity();
    }, []);

    const { daysGrid, monthSections } = useMemo(() => {
        const end = new Date();
        end.setHours(0, 0, 0, 0);
        const start = new Date(end);
        start.setDate(start.getDate() - DAYS_TO_DISPLAY);
        
        // Создаём мап активности по датам
        const activityMap = new Map<string, number>();
        activity.forEach(item => {
            const dateKey = item.date.split('T')[0];
            activityMap.set(dateKey, parseInt(item.count));
        });
        
        // Генерируем массив дней
        const grid: { date: Date; count: number }[] = [];
        const current = new Date(start);
        
        // Для отслеживания месяцев
        const monthsMap = new Map<number, { month: number; year: number; firstDayIndex: number; displayName: string }>();
        let dayIndex = 0;
        
        for (let i = 0; i <= DAYS_TO_DISPLAY; i++) {
            const dateKey = normalizeDate(current);
            const count = activityMap.get(dateKey) || 0;
            const month = current.getMonth();
            const year = current.getFullYear();
            const monthKey = year * 12 + month;
            
            if (!monthsMap.has(monthKey)) {
                // Формируем отображаемое имя: "Апрель, 2025" или "Май, 2026"
                const displayName = `${monthNames[month]}, ${year}`;
                monthsMap.set(monthKey, {
                    month,
                    year,
                    firstDayIndex: dayIndex,
                    displayName
                });
            }
            
            grid.push({
                date: new Date(current),
                count
            });
            current.setDate(current.getDate() + 1);
            dayIndex++;
        }
        
        // Формируем секции месяцев в порядке от старых к новым
        const sections = Array.from(monthsMap.values()).map(item => ({
            name: item.displayName,
            firstDayIndex: item.firstDayIndex
        }));
        
        return { daysGrid: grid, monthSections: sections };
    }, [activity]);

    const getIntensityClass = (count: number): string => {
        if (count === 0) return '';
        if (count <= 25) return styles.mn;
        if (count <= 50) return styles.md;
        return styles.mx;
    };

    const formatDateForTooltip = (date: Date, count: number): string => {
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        const actionsText = count === 0 ? 'Нет действий' : `${count} ${count === 1 ? 'действие' : count < 5 ? 'действия' : 'действий'}`;
        return `${formattedDate} ${actionsText}`;
    };

    if (loading) {
        return (
            <div className={clsx(styles.container, styles.shimmer, className)}>
                <PlatformLoading />
            </div>
        );
    }

    return (
        <div className={clsx(styles.container, className)}>
            <div className={styles.base}>
                <div className={styles.sections}>
                    {monthSections.map((section, idx) => (
                        <span 
                            key={idx} 
                            className={styles.section}
                            style={{ gridColumnStart: section.firstDayIndex + 1 }}
                        >
                            {section.name}
                        </span>
                    ))}
                </div>
                <div className={styles.area}>
                    <div className={styles.grid}>
                        {daysGrid.map((day, index) => (
                            <ModalTooltip 
                                key={index}
                                content={formatDateForTooltip(day.date, day.count)}
                            >
                                <span className={clsx(styles.box, getIntensityClass(day.count))} />
                            </ModalTooltip>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.legend}>
                <div className={styles.item}>
                    <span className={clsx(styles.box)} />
                    <span className={styles.name}>Без активности</span>
                </div>
                <div className={styles.item}>
                    <span className={clsx(styles.box, styles.mn)} />
                    <span className={styles.name}>Минимальная: от 1 до 25 действий</span>
                </div>
                <div className={styles.item}>
                    <span className={clsx(styles.box, styles.md)} />
                    <span className={styles.name}>Средняя: от 25 до 50 действий</span>
                </div>
                <div className={styles.item}>
                    <span className={clsx(styles.box, styles.mx)} />
                    <span className={styles.name}>Максимальная: от 50 действий</span>
                </div>
            </div>
        </div>
    );
}