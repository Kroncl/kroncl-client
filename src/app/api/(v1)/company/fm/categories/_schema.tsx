import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const categoryFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор категории' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название категории' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Описание категории' },
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление', enum: ['income', 'expense'] },
    { code: 'system', required: true, type: 'boolean', title: 'Системная', description: 'Системная категория' },
    { code: 'slug', required: true, type: 'string', title: 'Slug', description: 'Уникальный идентификатор' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const categoriesDataFields: JsonField[] = [
    { code: 'categories', required: true, type: 'array', title: 'Категории', description: 'Список категорий (Category[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getCategoriesParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'direction', required: false, type: 'enum', title: 'Направление', description: 'Фильтр по направлению', enum: ['income', 'expense'] },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createCategoryRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название категории' },
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление', enum: ['income', 'expense'] },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Описание категории' },
];

export const updateCategoryRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название категории' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Описание категории' },
    { code: 'direction', required: false, type: 'enum', title: 'Направление', description: 'Направление', enum: ['income', 'expense'] },
];

export const deleteCategoryResponseFields: JsonField[] = [
    { code: 'category_id', required: true, type: 'string', title: 'ID категории', description: 'ID удалённой категории' },
    { code: 'deleted', required: true, type: 'boolean', title: 'Удалена', description: 'Статус удаления' },
];

const getCategories200: string = `{
    "status": true,
    "message": "Categories retrieved successfully",
    "data": {
        "categories": [
            {
                "id": "b00e8400-e29b-41d4-a716-446655440050",
                "name": "Продажи",
                "description": "Доходы от продаж",
                "direction": "income",
                "system": false,
                "slug": "sales",
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
        "path": "/api/v1/companies/.../modules/fm/transactions/categories",
        "method": "GET"
    }
}`;

const getCategory200: string = `{
    "status": true,
    "message": "Category retrieved successfully",
    "data": {
        "id": "b00e8400-e29b-41d4-a716-446655440050",
        "name": "Продажи",
        "description": "Доходы от продаж",
        "direction": "income",
        "system": false,
        "slug": "sales",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/transactions/categories/...",
        "method": "GET"
    }
}`;

const createCategory201: string = `{
    "status": true,
    "message": "Category created successfully",
    "data": {
        "id": "b00e8400-e29b-41d4-a716-446655440051",
        "name": "Закупки",
        "description": "Расходы на закупки",
        "direction": "expense",
        "system": false,
        "slug": "purchases",
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/transactions/categories",
        "method": "POST"
    }
}`;

const updateCategory200: string = `{
    "status": true,
    "message": "Category updated successfully",
    "data": {
        "id": "b00e8400-e29b-41d4-a716-446655440051",
        "name": "Закупки (обновлено)",
        "description": "Расходы на закупки и материалы",
        "direction": "expense",
        "system": false,
        "slug": "purchases",
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/transactions/categories/...",
        "method": "PATCH"
    }
}`;

const deleteCategory200: string = `{
    "status": true,
    "message": "Category deleted successfully",
    "data": {
        "category_id": "b00e8400-e29b-41d4-a716-446655440051",
        "deleted": true
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/transactions/categories/...",
        "method": "DELETE"
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

export const deleteCategoryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deleteCategory200} />
        </>
    }
];