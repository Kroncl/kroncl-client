import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const dealTypeFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор типа' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название типа сделки' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const dealTypesDataFields: JsonField[] = [
    { code: 'deal_types', required: true, type: 'array', title: 'Типы', description: 'Список типов сделок (DealType[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getDealTypesParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createDealTypeRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название типа сделки' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
];

export const updateDealTypeRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название типа сделки' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
];

export const deleteDealTypeResponseFields: JsonField[] = [
    { code: 'type_id', required: true, type: 'string', title: 'ID типа', description: 'ID удалённого типа' },
    { code: 'deleted', required: true, type: 'boolean', title: 'Удалён', description: 'Статус удаления' },
];

const getDealTypes200: string = `{
    "status": true,
    "message": "Deal types retrieved successfully",
    "data": {
        "deal_types": [
            {
                "id": "i00e8400-e29b-41d4-a716-446655440140",
                "name": "Продажа",
                "comment": "Стандартная продажа",
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
        "path": "/api/v1/companies/.../modules/dm/types",
        "method": "GET"
    }
}`;

const getDealType200: string = `{
    "status": true,
    "message": "Deal type retrieved successfully",
    "data": {
        "id": "i00e8400-e29b-41d4-a716-446655440140",
        "name": "Продажа",
        "comment": "Стандартная продажа",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/types/...",
        "method": "GET"
    }
}`;

const createDealType201: string = `{
    "status": true,
    "message": "Deal type created successfully",
    "data": {
        "id": "i00e8400-e29b-41d4-a716-446655440141",
        "name": "Закупка",
        "comment": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/types",
        "method": "POST"
    }
}`;

const updateDealType200: string = `{
    "status": true,
    "message": "Deal type updated successfully",
    "data": {
        "id": "i00e8400-e29b-41d4-a716-446655440141",
        "name": "Закупка (обновлено)",
        "comment": "Закупка у поставщиков",
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/types/...",
        "method": "PATCH"
    }
}`;

const deleteDealType200: string = `{
    "status": true,
    "message": "Deal type deleted successfully",
    "data": {
        "type_id": "i00e8400-e29b-41d4-a716-446655440141",
        "deleted": true
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/types/...",
        "method": "DELETE"
    }
}`;

export const getDealTypesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getDealTypes200} />
        </>
    }
];

export const getDealTypeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getDealType200} />
        </>
    }
];

export const createDealTypeResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createDealType201} />
        </>
    }
];

export const updateDealTypeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateDealType200} />
        </>
    }
];

export const deleteDealTypeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deleteDealType200} />
        </>
    }
];