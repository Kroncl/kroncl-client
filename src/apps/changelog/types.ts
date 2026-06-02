export type ChangelogItemStatus = 'planned' | 'in-progress' | 'completed';

export interface ChangelogItem {
    title: string;
    description: string;
    version: string;
    status: ChangelogItemStatus;
}

export const getChangelogStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
        'planned': 'Запланировано',
        'in-progress': 'Работаем',
        'completed': 'Завершено',
    };
    return labels[status] || status;
};