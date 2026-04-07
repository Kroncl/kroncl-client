export interface StackItem {
    abb?: string;
    priority: 'mn' | 'md' | 'mx';
    description: string;
}

export const backendStack: StackItem[] = [
    {
        abb: 'Go',
        priority: 'mx',
        description: '90% кодовой базы'
    },
    {
        abb: 'PGX',
        priority: 'md',
        description: 'Драйвер для PostgreSQL'
    },
    {
        abb: 'chi',
        priority: 'md',
        description: 'Роутинг'
    },
    {
        abb: 'minio',
        priority: 'mn',
        description: 'Объектное хранилище. В связке с minio-admin клиентом под Go.'
    },
    {
        abb: 'redis',
        priority: 'mn',
        description: 'Кэш'
    },
    {
        abb: 'prometheus',
        priority: 'mn',
        description: 'Метрики'
    },
    {
        abb: 'grafana',
        priority: 'mn',
        description: 'Визуализация'
    }
]

export const frontendStack: StackItem[] = [
    {
        abb: 'TS',
        priority: 'mx',
        description: 'Типизация API'
    },
    {
        abb: 'Next.js',
        priority: 'mx',
        description: 'App Router, SSR'
    },
    {
        abb: 'React Query',
        priority: 'mn',
        description: 'Кэш'
    },
    {
        abb: 'Recharts',
        priority: 'mn',
        description: 'Графики'
    },
    {
        abb: 'mdx',
        priority: 'mn',
        description: 'Документация'
    },
    {
        abb: 'Framer Motion',
        priority: 'mn',
        description: 'Анимации'
    },
    {
        abb: 'clsx',
        priority: 'mn',
        description: 'Объединение классов'
    },
    {
        abb: 'SCSS',
        priority: 'mn',
        description: 'Модульная стилизация'
    },
]