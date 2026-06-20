import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const unitFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор товарной позиции' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название товарной позиции' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип позиции', enum: ['product', 'service'] },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'inventory_type', required: true, type: 'enum', title: 'Тип учёта', description: 'Тип складского учёта', enum: ['tracked', 'untracked'] },
    { code: 'tracking_detail', required: false, type: 'enum', title: 'Детали учёта', description: 'Детализация учёта', enum: ['batch', 'serial'] },
    { code: 'tracked_type', required: false, type: 'enum', title: 'Способ учёта', description: 'Способ списания', enum: ['fifo', 'lifo'] },
    { code: 'unit', required: true, type: 'string', title: 'Единица', description: 'Единица измерения' },
    { code: 'sale_price', required: true, type: 'int', title: 'Цена продажи', description: 'Цена продажи в рублях' },
    { code: 'purchase_price', required: false, type: 'int', title: 'Цена закупки', description: 'Цена закупки в рублях' },
    { code: 'currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'category_id', required: true, type: 'string', title: 'ID категории', description: 'Идентификатор категории' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
];

export const unitsDataFields: JsonField[] = [
    { code: 'units', required: true, type: 'array', title: 'Позиции', description: 'Список товарных позиций (Unit[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getUnitsParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Фильтр по типу', enum: ['product', 'service'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['active', 'inactive'] },
    { code: 'inventory_type', required: false, type: 'enum', title: 'Тип учёта', description: 'Фильтр по типу учёта', enum: ['tracked', 'untracked'] },
    { code: 'tracking_detail', required: false, type: 'enum', title: 'Детали учёта', description: 'Фильтр по детализации учёта', enum: ['batch', 'serial'] },
    { code: 'category_id', required: false, type: 'string', title: 'ID категории', description: 'Фильтр по категории' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createUnitRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название товарной позиции' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип позиции', enum: ['product', 'service'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус (по умолчанию active)', enum: ['active', 'inactive'] },
    { code: 'inventory_type', required: true, type: 'enum', title: 'Тип учёта', description: 'Тип складского учёта', enum: ['tracked', 'untracked'] },
    { code: 'tracking_detail', required: false, type: 'enum', title: 'Детали учёта', description: 'Детализация учёта', enum: ['batch', 'serial'] },
    { code: 'tracked_type', required: false, type: 'enum', title: 'Способ учёта', description: 'Способ списания', enum: ['fifo', 'lifo'] },
    { code: 'unit', required: true, type: 'string', title: 'Единица', description: 'Единица измерения' },
    { code: 'sale_price', required: true, type: 'int', title: 'Цена продажи', description: 'Цена продажи в рублях' },
    { code: 'purchase_price', required: false, type: 'int', title: 'Цена закупки', description: 'Цена закупки в рублях' },
    { code: 'currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'category_id', required: true, type: 'string', title: 'ID категории', description: 'Идентификатор категории' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const updateUnitRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название товарной позиции' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Тип позиции', enum: ['product', 'service'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'inventory_type', required: false, type: 'enum', title: 'Тип учёта', description: 'Тип складского учёта', enum: ['tracked', 'untracked'] },
    { code: 'tracking_detail', required: false, type: 'enum', title: 'Детали учёта', description: 'Детализация учёта', enum: ['batch', 'serial'] },
    { code: 'tracked_type', required: false, type: 'enum', title: 'Способ учёта', description: 'Способ списания', enum: ['fifo', 'lifo'] },
    { code: 'unit', required: false, type: 'string', title: 'Единица', description: 'Единица измерения' },
    { code: 'sale_price', required: false, type: 'int', title: 'Цена продажи', description: 'Цена продажи в рублях' },
    { code: 'purchase_price', required: false, type: 'int', title: 'Цена закупки', description: 'Цена закупки в рублях' },
    { code: 'currency', required: false, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'category_id', required: false, type: 'string', title: 'ID категории', description: 'Идентификатор категории' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

const getUnits200: string = `{
    "status": true,
    "message": "Units retrieved successfully",
    "data": {
        "units": [
            {
                "id": "f00e8400-e29b-41d4-a716-446655440110",
                "name": "Ноутбук Dell XPS",
                "comment": "Флагманская модель",
                "type": "product",
                "status": "active",
                "inventory_type": "tracked",
                "tracking_detail": "serial",
                "tracked_type": "fifo",
                "unit": "шт",
                "sale_price": 150000,
                "purchase_price": 120000,
                "currency": "RUB",
                "category_id": "e00e8400-e29b-41d4-a716-446655440101",
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
        "path": "/api/v1/companies/.../modules/wm/catalog/units",
        "method": "GET"
    }
}`;

const getUnit200: string = `{
    "status": true,
    "message": "Unit retrieved successfully",
    "data": {
        "id": "f00e8400-e29b-41d4-a716-446655440110",
        "name": "Ноутбук Dell XPS",
        "comment": "Флагманская модель",
        "type": "product",
        "status": "active",
        "inventory_type": "tracked",
        "tracking_detail": "serial",
        "tracked_type": "fifo",
        "unit": "шт",
        "sale_price": 150000,
        "purchase_price": 120000,
        "currency": "RUB",
        "category_id": "e00e8400-e29b-41d4-a716-446655440101",
        "metadata": null,
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/units/...",
        "method": "GET"
    }
}`;

const createUnit201: string = `{
    "status": true,
    "message": "Unit created successfully",
    "data": {
        "id": "f00e8400-e29b-41d4-a716-446655440111",
        "name": "Консультация",
        "comment": null,
        "type": "service",
        "status": "active",
        "inventory_type": "untracked",
        "tracking_detail": null,
        "tracked_type": null,
        "unit": "ч",
        "sale_price": 5000,
        "purchase_price": null,
        "currency": "RUB",
        "category_id": "e00e8400-e29b-41d4-a716-446655440102",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/units",
        "method": "POST"
    }
}`;

const updateUnit200: string = `{
    "status": true,
    "message": "Unit updated successfully",
    "data": {
        "id": "f00e8400-e29b-41d4-a716-446655440111",
        "name": "Консультация (обновлено)",
        "comment": "Часовая консультация",
        "type": "service",
        "status": "active",
        "inventory_type": "untracked",
        "tracking_detail": null,
        "tracked_type": null,
        "unit": "ч",
        "sale_price": 5500,
        "purchase_price": null,
        "currency": "RUB",
        "category_id": "e00e8400-e29b-41d4-a716-446655440102",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/units/...",
        "method": "PATCH"
    }
}`;

const deactivateUnit200: string = `{
    "status": true,
    "message": "Unit deactivated successfully",
    "data": {
        "id": "f00e8400-e29b-41d4-a716-446655440111",
        "name": "Консультация (обновлено)",
        "comment": "Часовая консультация",
        "type": "service",
        "status": "inactive",
        "inventory_type": "untracked",
        "tracking_detail": null,
        "tracked_type": null,
        "unit": "ч",
        "sale_price": 5500,
        "purchase_price": null,
        "currency": "RUB",
        "category_id": "e00e8400-e29b-41d4-a716-446655440102",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:15:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/units/.../deactivate",
        "method": "POST"
    }
}`;

const activateUnit200: string = `{
    "status": true,
    "message": "Unit activated successfully",
    "data": {
        "id": "f00e8400-e29b-41d4-a716-446655440111",
        "name": "Консультация (обновлено)",
        "comment": "Часовая консультация",
        "type": "service",
        "status": "active",
        "inventory_type": "untracked",
        "tracking_detail": null,
        "tracked_type": null,
        "unit": "ч",
        "sale_price": 5500,
        "purchase_price": null,
        "currency": "RUB",
        "category_id": "e00e8400-e29b-41d4-a716-446655440102",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:20:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/units/.../activate",
        "method": "POST"
    }
}`;

export const getUnitsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getUnits200} />
        </>
    }
];

export const getUnitResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getUnit200} />
        </>
    }
];

export const createUnitResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createUnit201} />
        </>
    }
];

export const updateUnitResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateUnit200} />
        </>
    }
];

export const deactivateUnitResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deactivateUnit200} />
        </>
    }
];

export const activateUnitResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activateUnit200} />
        </>
    }
];