import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const sourceFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор источника' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название источника' },
    { code: 'url', required: false, type: 'string', title: 'URL', description: 'Ссылка на источник' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип источника', enum: ['organic', 'social', 'referral', 'paid', 'email', 'other'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'system', required: true, type: 'boolean', title: 'Системный', description: 'Системный источник' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const sourcesDataFields: JsonField[] = [
    { code: 'sources', required: true, type: 'array', title: 'Источники', description: 'Список источников (Source[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getSourcesParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Фильтр по типу', enum: ['organic', 'social', 'referral', 'paid', 'email', 'other'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['active', 'inactive'] },
    { code: 'system', required: false, type: 'boolean', title: 'Системный', description: 'Фильтр по системным' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createSourceRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название источника' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип источника', enum: ['organic', 'social', 'referral', 'paid', 'email', 'other'] },
    { code: 'url', required: false, type: 'string', title: 'URL', description: 'Ссылка на источник' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'system', required: false, type: 'boolean', title: 'Системный', description: 'Системный источник' },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус (по умолчанию active)', enum: ['active', 'inactive'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const updateSourceRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название источника' },
    { code: 'url', required: false, type: 'string', title: 'URL', description: 'Ссылка на источник' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Тип источника', enum: ['organic', 'social', 'referral', 'paid', 'email', 'other'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

const getSources200: string = `{
    "status": true,
    "message": "Sources retrieved successfully",
    "data": {
        "sources": [
            {
                "id": "c00e8400-e29b-41d4-a716-446655440080",
                "name": "Яндекс.Директ",
                "url": "https://yandex.ru/direct",
                "type": "paid",
                "comment": "Контекстная реклама",
                "system": false,
                "status": "active",
                "metadata": null,
                "created_at": "2026-06-14T12:00:00Z",
                "updated_at": "2026-06-14T12:00:00Z"
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
        "path": "/api/v1/companies/.../modules/crm/sources",
        "method": "GET"
    }
}`;

const getSource200: string = `{
    "status": true,
    "message": "Source retrieved successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440080",
        "name": "Яндекс.Директ",
        "url": "https://yandex.ru/direct",
        "type": "paid",
        "comment": "Контекстная реклама",
        "system": false,
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/sources/...",
        "method": "GET"
    }
}`;

const createSource201: string = `{
    "status": true,
    "message": "Source created successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440081",
        "name": "Instagram",
        "url": "https://instagram.com",
        "type": "social",
        "comment": null,
        "system": false,
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/sources",
        "method": "POST"
    }
}`;

const updateSource200: string = `{
    "status": true,
    "message": "Source updated successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440081",
        "name": "Instagram (обновлено)",
        "url": "https://instagram.com",
        "type": "social",
        "comment": "Социальная сеть",
        "system": false,
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/sources/...",
        "method": "PATCH"
    }
}`;

const deactivateSource200: string = `{
    "status": true,
    "message": "Source deactivated successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440081",
        "name": "Instagram (обновлено)",
        "url": "https://instagram.com",
        "type": "social",
        "comment": "Социальная сеть",
        "system": false,
        "status": "inactive",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:15:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/sources/.../deactivate",
        "method": "POST"
    }
}`;

const activateSource200: string = `{
    "status": true,
    "message": "Source activated successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440081",
        "name": "Instagram (обновлено)",
        "url": "https://instagram.com",
        "type": "social",
        "comment": "Социальная сеть",
        "system": false,
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:20:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/sources/.../activate",
        "method": "POST"
    }
}`;

export const getSourcesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getSources200} />
        </>
    }
];

export const getSourceResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getSource200} />
        </>
    }
];

export const createSourceResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createSource201} />
        </>
    }
];

export const updateSourceResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateSource200} />
        </>
    }
];

export const deactivateSourceResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deactivateSource200} />
        </>
    }
];

export const activateSourceResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activateSource200} />
        </>
    }
];