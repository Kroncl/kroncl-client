import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const categoryFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор категории' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название категории' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'parent_id', required: false, type: 'string', title: 'Родитель', description: 'ID родительской категории' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
];

export const categoriesDataFields: JsonField[] = [
    { code: 'categories', required: true, type: 'array', title: 'Категории', description: 'Список категорий (Category[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getCategoriesParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['active', 'inactive'] },
    { code: 'parent_id', required: false, type: 'string', title: 'ID родителя', description: 'Фильтр по родительской категории' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createCategoryRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название категории' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'parent_id', required: false, type: 'string', title: 'Родитель', description: 'ID родительской категории' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const updateCategoryRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название категории' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'parent_id', required: false, type: 'string', title: 'Родитель', description: 'ID родительской категории' },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

const getCategories200: string = `{
    "status": true,
    "message": "Categories retrieved successfully",
    "data": {
        "categories": [
            {
                "id": "e00e8400-e29b-41d4-a716-446655440100",
                "name": "Электроника",
                "comment": "Все виды электроники",
                "status": "active",
                "parent_id": null,
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
        "path": "/api/v1/companies/.../modules/wm/catalog/categories",
        "method": "GET"
    }
}`;

const getCategory200: string = `{
    "status": true,
    "message": "Category retrieved successfully",
    "data": {
        "id": "e00e8400-e29b-41d4-a716-446655440100",
        "name": "Электроника",
        "comment": "Все виды электроники",
        "status": "active",
        "parent_id": null,
        "metadata": null,
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/categories/...",
        "method": "GET"
    }
}`;

const createCategory201: string = `{
    "status": true,
    "message": "Category created successfully",
    "data": {
        "id": "e00e8400-e29b-41d4-a716-446655440101",
        "name": "Ноутбуки",
        "comment": null,
        "status": "active",
        "parent_id": "e00e8400-e29b-41d4-a716-446655440100",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/categories",
        "method": "POST"
    }
}`;

const updateCategory200: string = `{
    "status": true,
    "message": "Category updated successfully",
    "data": {
        "id": "e00e8400-e29b-41d4-a716-446655440101",
        "name": "Ноутбуки и планшеты",
        "comment": "Портативные устройства",
        "status": "active",
        "parent_id": "e00e8400-e29b-41d4-a716-446655440100",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/categories/...",
        "method": "PATCH"
    }
}`;

const deactivateCategory200: string = `{
    "status": true,
    "message": "Category deactivated successfully",
    "data": {
        "id": "e00e8400-e29b-41d4-a716-446655440101",
        "name": "Ноутбуки и планшеты",
        "comment": "Портативные устройства",
        "status": "inactive",
        "parent_id": "e00e8400-e29b-41d4-a716-446655440100",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:15:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/categories/.../deactivate",
        "method": "POST"
    }
}`;

const activateCategory200: string = `{
    "status": true,
    "message": "Category activated successfully",
    "data": {
        "id": "e00e8400-e29b-41d4-a716-446655440101",
        "name": "Ноутбуки и планшеты",
        "comment": "Портативные устройства",
        "status": "active",
        "parent_id": "e00e8400-e29b-41d4-a716-446655440100",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:20:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/catalog/categories/.../activate",
        "method": "POST"
    }
}`;

export const getCategoriesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCategories200} />
        </>
    }
];

export const getCategoryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCategory200} />
        </>
    }
];

export const createCategoryResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createCategory201} />
        </>
    }
];

export const updateCategoryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateCategory200} />
        </>
    }
];

export const deactivateCategoryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deactivateCategory200} />
        </>
    }
];

export const activateCategoryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activateCategory200} />
        </>
    }
];