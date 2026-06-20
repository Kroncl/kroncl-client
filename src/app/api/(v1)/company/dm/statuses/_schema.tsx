import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const dealStatusFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор статуса' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название статуса' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'sort_order', required: true, type: 'int', title: 'Порядок', description: 'Порядок сортировки' },
    { code: 'is_default', required: true, type: 'boolean', title: 'По умолчанию', description: 'Статус по умолчанию' },
    { code: 'color', required: false, type: 'string', title: 'Цвет', description: 'Цвет статуса (HEX)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const dealStatusesDataFields: JsonField[] = [
    { code: 'statuses', required: true, type: 'array', title: 'Статусы', description: 'Список статусов сделок (DealStatus[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getDealStatusesParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createDealStatusRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название статуса' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'sort_order', required: true, type: 'int', title: 'Порядок', description: 'Порядок сортировки' },
    { code: 'color', required: false, type: 'string', title: 'Цвет', description: 'Цвет статуса (HEX)' },
    { code: 'is_default', required: false, type: 'boolean', title: 'По умолчанию', description: 'Статус по умолчанию' },
];

export const updateDealStatusRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название статуса' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'sort_order', required: false, type: 'int', title: 'Порядок', description: 'Порядок сортировки' },
    { code: 'color', required: false, type: 'string', title: 'Цвет', description: 'Цвет статуса (HEX)' },
    { code: 'is_default', required: false, type: 'boolean', title: 'По умолчанию', description: 'Статус по умолчанию' },
];

export const reorderDealStatusesRequestFields: JsonField[] = [
    { code: 'status_ids', required: true, type: 'array', title: 'ID статусов', description: 'Массив ID статусов в новом порядке' },
];

export const reorderDealStatusesResponseFields: JsonField[] = [
    { code: 'reordered', required: true, type: 'boolean', title: 'Пересортировано', description: 'Статус операции' },
    { code: 'status_ids', required: true, type: 'array', title: 'ID статусов', description: 'Массив ID статусов в новом порядке' },
];

export const deleteDealStatusResponseFields: JsonField[] = [
    { code: 'status_id', required: true, type: 'string', title: 'ID статуса', description: 'ID удалённого статуса' },
    { code: 'deleted', required: true, type: 'boolean', title: 'Удалён', description: 'Статус удаления' },
];

const getDealStatuses200: string = `{
    "status": true,
    "message": "Deal statuses retrieved successfully",
    "data": {
        "statuses": [
            {
                "id": "j00e8400-e29b-41d4-a716-446655440150",
                "name": "Новый",
                "comment": "Начальный статус",
                "sort_order": 1,
                "is_default": true,
                "color": "#2196F3",
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
        "path": "/api/v1/companies/.../modules/dm/statuses",
        "method": "GET"
    }
}`;

const getDealStatus200: string = `{
    "status": true,
    "message": "Deal status retrieved successfully",
    "data": {
        "id": "j00e8400-e29b-41d4-a716-446655440150",
        "name": "Новый",
        "comment": "Начальный статус",
        "sort_order": 1,
        "is_default": true,
        "color": "#2196F3",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/statuses/...",
        "method": "GET"
    }
}`;

const createDealStatus201: string = `{
    "status": true,
    "message": "Deal status created successfully",
    "data": {
        "id": "j00e8400-e29b-41d4-a716-446655440151",
        "name": "В работе",
        "comment": null,
        "sort_order": 2,
        "is_default": false,
        "color": "#FF9800",
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/statuses",
        "method": "POST"
    }
}`;

const updateDealStatus200: string = `{
    "status": true,
    "message": "Deal status updated successfully",
    "data": {
        "id": "j00e8400-e29b-41d4-a716-446655440151",
        "name": "В работе (обновлено)",
        "comment": "Активная работа над сделкой",
        "sort_order": 2,
        "is_default": false,
        "color": "#FF9800",
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/statuses/...",
        "method": "PATCH"
    }
}`;

const deleteDealStatus200: string = `{
    "status": true,
    "message": "Deal status deleted successfully",
    "data": {
        "status_id": "j00e8400-e29b-41d4-a716-446655440151",
        "deleted": true
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/statuses/...",
        "method": "DELETE"
    }
}`;

const reorderDealStatuses200: string = `{
    "status": true,
    "message": "Deal statuses reordered successfully",
    "data": {
        "reordered": true,
        "status_ids": [
            "j00e8400-e29b-41d4-a716-446655440150",
            "j00e8400-e29b-41d4-a716-446655440151"
        ]
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/statuses/reorder",
        "method": "PUT"
    }
}`;

export const getDealStatusesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getDealStatuses200} />
        </>
    }
];

export const getDealStatusResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getDealStatus200} />
        </>
    }
];

export const createDealStatusResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createDealStatus201} />
        </>
    }
];

export const updateDealStatusResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateDealStatus200} />
        </>
    }
];

export const deleteDealStatusResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deleteDealStatus200} />
        </>
    }
];

export const reorderDealStatusesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={reorderDealStatuses200} />
        </>
    }
];