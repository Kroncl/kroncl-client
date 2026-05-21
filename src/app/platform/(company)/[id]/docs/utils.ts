
export const getModuleLabel = (module: string | null): string => {
    switch (module) {
        case 'fm': return 'Финансы';
        case 'crm': return 'CRM';
        case 'wm': return 'Склад';
        case 'dm': return 'Сделки';
        case 'hrm': return 'Сотрудники';
        default: return module || 'Документ';
    }
};

export const getTypeLabel = (type: string | null): string => {
    switch (type) {
        case 'transactions': return 'Транзакции';
        case 'categories': return 'Категории';
        case 'counterparties': return 'Контрагенты';
        case 'credits': return 'Кредиты';
        case 'full': return 'Полный отчёт';
        default: return type || 'Отчёт';
    }
};
