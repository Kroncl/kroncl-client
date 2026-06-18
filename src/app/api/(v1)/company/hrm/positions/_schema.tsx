import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const positionFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор должности' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Наименование должности' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Описание должности' },
    { code: 'permissions', required: true, type: 'array', title: 'Разрешения', description: 'Список кодов разрешений (string[])' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
];

export const createPositionRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Наименование должности' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Описание должности' },
    { code: 'permissions', required: false, type: 'array', title: 'Разрешения', description: 'Список кодов разрешений (string[])' },
];

export const updatePositionRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Новое наименование' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Новое описание' },
    { code: 'permissions', required: false, type: 'array', title: 'Разрешения', description: 'Новый список кодов разрешений (string[])' },
];

export const positionsDataFields: JsonField[] = [
    { code: 'positions', required: true, type: 'array', title: 'Должности', description: 'Список должностей (Position[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const positionsList200: string = `{
    "status": true,
    "message": "Positions retrieved successfully",
    "data": {
        "positions": [
            {
                "id": "ff0e8400-e29b-41d4-a716-446655440140",
                "name": "Менеджер",
                "description": "Работа с клиентами и сделками",
                "permissions": ["crm.clients", "dm.deals.create"],
                "created_at": "2026-04-24T00:20:54Z",
                "updated_at": "2026-06-14T00:00:00Z"
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
        "path": "/api/v1/companies/.../modules/hrm/positions",
        "method": "GET"
    }
}`;

const getPosition200: string = `{
    "status": true,
    "message": "Position retrieved successfully",
    "data": {
        "id": "ff0e8400-e29b-41d4-a716-446655440140",
        "name": "Менеджер",
        "description": "Работа с клиентами и сделками",
        "permissions": ["crm.clients", "dm.deals.create"],
        "created_at": "2026-04-24T00:20:54Z",
        "updated_at": "2026-06-14T00:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/positions/...",
        "method": "GET"
    }
}`;

const createPosition201: string = `{
    "status": true,
    "message": "Position created successfully",
    "data": {
        "id": "ff0e8400-e29b-41d4-a716-446655440141",
        "name": "Бухгалтер",
        "description": null,
        "permissions": ["fm.transactions.create", "fm.analysis"],
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/positions",
        "method": "POST"
    }
}`;

const updatePosition200: string = `{
    "status": true,
    "message": "Position updated successfully",
    "data": {
        "id": "ff0e8400-e29b-41d4-a716-446655440141",
        "name": "Старший бухгалтер",
        "description": "Полный доступ к финансам",
        "permissions": ["fm.transactions.create", "fm.analysis", "fm.counterparties"],
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/positions/...",
        "method": "PATCH"
    }
}`;

const deletePosition200: string = `{
    "status": true,
    "message": "Position deleted successfully",
    "data": {},
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/positions/...",
        "method": "DELETE"
    }
}`;

export const positionsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={positionsList200} />
        </>
    }
];

export const getPositionResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getPosition200} />
        </>
    }
];

export const createPositionResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createPosition201} />
        </>
    }
];

export const updatePositionResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updatePosition200} />
        </>
    }
];

export const deletePositionResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deletePosition200} />
        </>
    }
];