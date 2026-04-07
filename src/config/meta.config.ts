type MetaConfig = {
    title: string;
    description?: string;
}

const metaConfigs: Record<string, MetaConfig> = {
    'wm': {
        title: 'Kroncl | Каталог & Склад',
    },
    'dm': {
        title: 'Kroncl | Управление сделками',
    },
    'crm': {
        title: 'Kroncl | Клиентская база',
    },
    'fm': {
        title: 'Kroncl | Управление финансами',
    },
    'hrm': {
        title: 'Kroncl | Управление сотрудниками',
    },
    'support': {
        title: 'Kroncl | Поддержка',
    },
    'pricing': {
        title: 'Kroncl | Тарификация',
    },
    'businessmans': {
        title: 'Kroncl | Предпринимателям',
    },
    'dev': {
        title: 'Kroncl | Разработчикам',
    },
    'docs': {
        title: 'Kroncl | Документация',
    },
    'become-partner': {
        title: 'Kroncl | Стать партнёром',
    },
    'sso': {
        title: 'Kroncl | Вход в аккаунт',
    },
    'platform': {
        title: 'Kroncl | Платформа',
    }
};

// Дефолтные значения
export const defaultMeta: MetaConfig = {
    title: 'Kroncl | Операционный учёт МСБ',
    description: 'Облачная учётная система #1 малого бизнеса. 30 дней бесплатного использования для новых организаций.'
};

// Получение конфига по коду
export const getMetaConfig = (code?: string): MetaConfig => {
    if (!code) return defaultMeta;
    return metaConfigs[code] || defaultMeta;
};

// Экспортируемые функции
export const metaTitle = (code?: string): string => {
    return getMetaConfig(code).title;
};

export const metaDescription = (code?: string): string => {
    return getMetaConfig(code).description || defaultMeta.description || '';
};

export const metaCodes = Object.keys(metaConfigs) as string[];

export const metaConfigsAll = Object.entries(metaConfigs).map(([code, config]) => ({
    code,
    ...config
}));