import { ForecastDataPoint } from '@/apps/company/modules/fm/types';

function generateMockTimeline(): ForecastDataPoint[] {
    const points: ForecastDataPoint[] = [];
    
    const startDate = new Date('2026-03-08');
    const baseBalance = 380000;
    const trendPerDay = 350; // более заметный рост
    const weeklyPattern = [0.7, 0.8, 0.9, 1.0, 1.25, 1.4, 1.15]; // пн-вс: сильнее контраст
    const noise = () => (Math.random() - 0.5) * 55000; // больше разброс ±27.5к
    
    // 90 дней истории
    for (let i = 0; i < 90; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        const dayOfWeek = date.getDay();
        const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        
        const trend = trendPerDay * i;
        const seasonal = (weeklyPattern[dayIndex] - 1) * 70000;
        const randomNoise = noise();
        
        // Иногда добавляем выбросы для реалистичности
        const outlier = Math.random() < 0.08 ? (Math.random() - 0.5) * 80000 : 0;
        
        points.push({
            date: date.toISOString().split('T')[0],
            balance: Math.round((baseBalance + trend + seasonal + randomNoise + outlier) * 100) / 100,
            is_actual: true,
        });
    }
    
    // 30 дней прогноза — уклон в рост
    const forecastStart = new Date(startDate);
    forecastStart.setDate(forecastStart.getDate() + 90);
    
    const forecastTrendPerDay = 520; // ускоренный рост в прогнозе
    const forecastBaseBalance = points[points.length - 1].balance;
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(forecastStart);
        date.setDate(date.getDate() + i);
        
        const dayOfWeek = date.getDay();
        const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        
        const trend = forecastTrendPerDay * (i + 1);
        const seasonal = (weeklyPattern[dayIndex] - 1) * 70000;
        const mildNoise = (Math.random() - 0.5) * 12000; // меньше шума в прогнозе
        
        points.push({
            date: date.toISOString().split('T')[0],
            balance: Math.round((forecastBaseBalance + trend + seasonal + mildNoise) * 100) / 100,
            is_actual: false,
        });
    }
    
    return points;
}

export const mockTimeline: ForecastDataPoint[] = generateMockTimeline();