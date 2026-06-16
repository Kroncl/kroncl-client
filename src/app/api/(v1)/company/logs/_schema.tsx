import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const getLogsQueryParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20, максимум 100)' },
    { code: 'account_id', required: false, type: 'string', title: 'ID аккаунта', description: 'Фильтр по инициатору действия' },
    { code: 'key', required: false, type: 'string', title: 'Ключ', description: 'Фильтр по коду разрешения (например: fm.transactions.create)' },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['success', 'error', 'pending'] },
    { code: 'min_criticality', required: false, type: 'int', title: 'Мин. критичность', description: 'Нижняя граница критичности (1-10)' },
    { code: 'max_criticality', required: false, type: 'int', title: 'Макс. критичность', description: 'Верхняя граница критичности (1-10)' },
    { code: 'start_date', required: false, type: 'string', title: 'Начало', description: 'Начальная дата фильтрации (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец', description: 'Конечная дата фильтрации (RFC 3339)' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по метаданным' },
];

export const getActivityQueryParamsFields: JsonField[] = [
    { code: 'start_date', required: false, type: 'string', title: 'Начало', description: 'Начальная дата (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец', description: 'Конечная дата (RFC 3339)' },
];

export const logFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор записи лога' },
    { code: 'key', required: true, type: 'string', title: 'Ключ', description: 'Код разрешения (например: fm.transactions.create)' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус выполнения операции', enum: ['success', 'error', 'pending'] },
    { code: 'criticality', required: true, type: 'int', title: 'Критичность', description: 'Степень важности (1-10)' },
    { code: 'account_id', required: true, type: 'string', title: 'ID аккаунта', description: 'Идентификатор инициатора' },
    { code: 'request_id', required: false, type: 'string', title: 'ID запроса', description: 'Идентификатор запроса для группировки' },
    { code: 'user_agent', required: false, type: 'string', title: 'User-Agent', description: 'Клиентское приложение' },
    { code: 'ip', required: false, type: 'string', title: 'IP', description: 'IP-адрес инициатора' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания записи (RFC 3339)' },
];

export const logActivityFields: JsonField[] = [
    { code: 'date', required: true, type: 'string', title: 'Дата', description: 'День в формате YYYY-MM-DD' },
    { code: 'count', required: true, type: 'int', title: 'Действий', description: 'Количество действий за день' },
];

export const logsDataFields: JsonField[] = [
    { code: 'logs', required: true, type: 'array', title: 'Логи', description: 'Список записей логов (Log[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const logsList200: string = `{
    "status": true,
    "message": "Logs retrieved successfully",
    "data": {
        "logs": [
            {
                "id": "aa0e8400-e29b-41d4-a716-446655440090",
                "key": "fm.transactions.create",
                "status": "success",
                "criticality": 8,
                "account_id": "550e8400-e29b-41d4-a716-446655440001",
                "request_id": "e08cf60221af/7tXcx4SYpF-007394",
                "user_agent": "Mozilla/5.0 ...",
                "ip": "1.1.1.1",
                "created_at": "2026-06-14T12:00:00Z"
            }
        ],
        "pagination": {
            "total": 1,
            "page": 1,
            "limit": 20,
            "pages": 1
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/logs",
        "method": "GET"
    }
}`;

const getLog200: string = `{
    "status": true,
    "message": "Log retrieved successfully",
    "data": {
        "id": "aa0e8400-e29b-41d4-a716-446655440090",
        "key": "fm.transactions.create",
        "status": "success",
        "criticality": 8,
        "account_id": "550e8400-e29b-41d4-a716-446655440001",
        "request_id": "e08cf60221af/7tXcx4SYpF-007394",
        "user_agent": "Mozilla/5.0 ...",
        "ip": "1.1.1.1",
        "metadata": {
            "amount": 5000,
            "direction": "income"
        },
        "created_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/logs/...",
        "method": "GET"
    }
}`;

const clearLogs200: string = `{
    "status": true,
    "message": "Logs cleared successfully",
    "data": {},
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/logs/clear",
        "method": "POST"
    }
}`;

const optimizeLogs200: string = `{
    "status": true,
    "message": "Logs optimized successfully",
    "data": {},
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/logs/optimize",
        "method": "POST"
    }
}`;

const activity200: string = `{
    "status": true,
    "message": "Activity retrieved successfully",
    "data": [
        {
            "date": "2026-06-14",
            "count": 42
        },
        {
            "date": "2026-06-13",
            "count": 58
        }
    ],
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/logs/activity",
        "method": "GET"
    }
}`;

export const logsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={logsList200} />
        </>
    }
];

export const getLogResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getLog200} />
        </>
    }
];

export const clearLogsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={clearLogs200} />
        </>
    }
];

export const optimizeLogsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={optimizeLogs200} />
        </>
    }
];

export const activityResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activity200} />
        </>
    }
];