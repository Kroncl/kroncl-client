import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const companyDetailFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор организации' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Наименование организации' },
    { code: 'slug', required: true, type: 'string', title: 'Slug', description: 'Уникальный латинский код' },
    { code: 'description', required: true, type: 'string', title: 'Описание', description: 'Краткое описание деятельности' },
    { code: 'avatar_url', required: true, type: 'string', title: 'Аватар', description: 'URL логотипа' },
    { code: 'is_public', required: true, type: 'boolean', title: 'Публичность', description: 'Публичная ли компания' },
    { code: 'region', required: true, type: 'string', title: 'Регион', description: 'Основной рабочий регион' },
    { code: 'site', required: true, type: 'string', title: 'Сайт', description: 'URL сайта' },
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Контактный email' },
    { code: 'role_code', required: true, type: 'enum', title: 'Роль', description: 'Роль аккаунта в организации', enum: ['owner', 'guest'] },
    { code: 'joined_at', required: true, type: 'string', title: 'Вступил', description: 'Дата вступления (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата регистрации (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
];

export const updateCompanyRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Новое наименование' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Новое описание' },
    { code: 'region', required: false, type: 'string', title: 'Регион', description: 'Новый регион' },
    { code: 'is_public', required: false, type: 'boolean', title: 'Публичность', description: 'Сменить видимость' },
    { code: 'site', required: false, type: 'string', title: 'Сайт', description: 'Новый URL сайта' },
    { code: 'email', required: false, type: 'string', title: 'Почта', description: 'Новый контактный email' },
];

export const companyPermissionsFields: JsonField[] = [
    { code: 'code', required: true, type: 'string', title: 'Код', description: 'Уникальный код разрешения' },
    { code: 'lvl', required: true, type: 'int', title: 'Уровень', description: 'Минимальный уровень тарифа' },
    { code: 'criticality', required: true, type: 'int', title: 'Критичность', description: 'Степень важности (1-10)' },
    { code: 'allow_expired', required: true, type: 'boolean', title: 'Просроченный доступ', description: 'Доступно ли после окончания тарифа' },
];

const getCompany200: string = `{
    "status": true,
    "message": "Company retrieved successfully",
    "data": {
        "id": "660e8400-e29b-41d4-a716-446655440020",
        "name": "Автосервис на Пушкина",
        "slug": "auto-pushkina",
        "description": "Ремонт и обслуживание легковых автомобилей.",
        "avatar_url": "",
        "is_public": true,
        "region": "РФ",
        "site": "",
        "email": "",
        "role_code": "owner",
        "joined_at": "2026-04-24T00:20:54Z",
        "created_at": "2026-04-24T00:17:05Z",
        "updated_at": "2026-06-13T15:29:02Z"
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/...",
        "method": "GET"
    }
}`;

const updateCompany200: string = `{
    "status": true,
    "message": "Company updated successfully",
    "data": {
        "id": "660e8400-e29b-41d4-a716-446655440020",
        "name": "Автосервис на Пушкина",
        "slug": "auto-pushkina",
        "description": "Обновлённое описание.",
        "avatar_url": "",
        "is_public": false,
        "region": "РФ",
        "site": "https://auto-pushkina.ru",
        "email": "info@auto-pushkina.ru",
        "role_code": "owner",
        "joined_at": "2026-04-24T00:20:54Z",
        "created_at": "2026-04-24T00:17:05Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/...",
        "method": "PATCH"
    }
}`;

const permissions200: string = `{
    "status": true,
    "message": "Permissions retrieved successfully",
    "data": [
        {
            "code": "fm.transactions.create",
            "lvl": 1,
            "criticality": 8,
            "allow_expired": false
        },
        {
            "code": "fm.analysis",
            "lvl": 1,
            "criticality": 5,
            "allow_expired": true
        }
    ],
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../permissions",
        "method": "GET"
    }
}`;

const deleteCompany200: string = `{
    "status": true,
    "message": "Company deleted successfully",
    "data": {
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "dropped": true
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../delete",
        "method": "POST"
    }
}`;

export const getCompanyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCompany200} />
        </>
    },
    {
        code: 403,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Forbidden",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const updateCompanyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateCompany200} />
        </>
    },
    {
        code: 403,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Forbidden",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const permissionsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={permissions200} />
        </>
    }
];

export const deleteCompanyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deleteCompany200} />
        </>
    },
    {
        code: 403,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Forbidden",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];