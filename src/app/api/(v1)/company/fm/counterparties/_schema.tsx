import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const counterpartyFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор контрагента' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название контрагента' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип контрагента', enum: ['bank', 'organization', 'person'] },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const counterpartiesDataFields: JsonField[] = [
    { code: 'counterparties', required: true, type: 'array', title: 'Контрагенты', description: 'Список контрагентов (Counterparty[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getCounterpartiesParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Фильтр по типу', enum: ['bank', 'organization', 'person'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['active', 'inactive'] },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createCounterpartyRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название контрагента' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип контрагента', enum: ['bank', 'organization', 'person'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const updateCounterpartyRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название контрагента' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Тип контрагента', enum: ['bank', 'organization', 'person'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

const getCounterparties200: string = `{
    "status": true,
    "message": "Counterparties retrieved successfully",
    "data": {
        "counterparties": [
            {
                "id": "c00e8400-e29b-41d4-a716-446655440060",
                "name": "ООО Ромашка",
                "comment": "Поставщик",
                "type": "organization",
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
        "path": "/api/v1/companies/.../modules/fm/counterparties",
        "method": "GET"
    }
}`;

const getCounterparty200: string = `{
    "status": true,
    "message": "Counterparty retrieved successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440060",
        "name": "ООО Ромашка",
        "comment": "Поставщик",
        "type": "organization",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/counterparties/...",
        "method": "GET"
    }
}`;

const createCounterparty201: string = `{
    "status": true,
    "message": "Counterparty created successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440061",
        "name": "ИП Иванов",
        "comment": null,
        "type": "person",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/counterparties",
        "method": "POST"
    }
}`;

const updateCounterparty200: string = `{
    "status": true,
    "message": "Counterparty updated successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440061",
        "name": "ИП Иванов (обновлено)",
        "comment": "Поставщик материалов",
        "type": "person",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/counterparties/...",
        "method": "PATCH"
    }
}`;

const deactivateCounterparty200: string = `{
    "status": true,
    "message": "Counterparty deactivated successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440061",
        "name": "ИП Иванов (обновлено)",
        "comment": "Поставщик материалов",
        "type": "person",
        "status": "inactive",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:15:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/counterparties/.../deactivate",
        "method": "POST"
    }
}`;

const activateCounterparty200: string = `{
    "status": true,
    "message": "Counterparty activated successfully",
    "data": {
        "id": "c00e8400-e29b-41d4-a716-446655440061",
        "name": "ИП Иванов (обновлено)",
        "comment": "Поставщик материалов",
        "type": "person",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:20:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/counterparties/.../activate",
        "method": "POST"
    }
}`;

export const getCounterpartiesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCounterparties200} />
        </>
    }
];

export const getCounterpartyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCounterparty200} />
        </>
    }
];

export const createCounterpartyResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createCounterparty201} />
        </>
    }
];

export const updateCounterpartyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateCounterparty200} />
        </>
    }
];

export const deactivateCounterpartyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deactivateCounterparty200} />
        </>
    }
];

export const activateCounterpartyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activateCounterparty200} />
        </>
    }
];