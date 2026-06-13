import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const accountCompanyFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор организации' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Наименование организации' },
    { code: 'slug', required: true, type: 'string', title: 'Slug', description: 'Уникальный латинский код организации' },
    { code: 'description', required: true, type: 'string', title: 'Описание', description: 'Краткое описание деятельности' },
    { code: 'avatar_url', required: true, type: 'string', title: 'Аватар', description: 'URL логотипа организации' },
    { code: 'is_public', required: true, type: 'boolean', title: 'Публичность', description: 'Является ли компания публичной' },
    { code: 'region', required: true, type: 'string', title: 'Регион', description: 'Основной рабочий регион' },
    { code: 'site', required: true, type: 'string', title: 'Сайт', description: 'URL сайта организации' },
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Контактный email представителя' },
    { code: 'role_code', required: true, type: 'enum', title: 'Роль', description: 'Роль аккаунта в организации', enum: ['owner', 'guest'] },
    { code: 'joined_at', required: true, type: 'string', title: 'Вступил', description: 'Дата вступления в организацию (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата регистрации организации (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
];

export const createCompanyRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Наименование организации' },
    { code: 'slug', required: true, type: 'string', title: 'Slug', description: 'Уникальный латинский код (генерируется автоматически из названия)' },
    { code: 'is_public', required: true, type: 'boolean', title: 'Публичность', description: 'Сделать визитную карточку публичной?' },
    { code: 'plan_code', required: true, type: 'string', title: 'Тариф', description: 'Код тарифного плана (financier, titan, stoic)' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Краткое описание деятельности' },
    { code: 'region', required: false, type: 'string', title: 'Регион', description: 'Основной рабочий регион (по умолчанию РФ)' },
    { code: 'promocode', required: false, type: 'string', title: 'Промокод', description: 'Промокод для увеличенного тестового периода' },
];

export const slugUniqueQueryFields: JsonField[] = [
    { code: 'slug', required: true, type: 'string', title: 'Slug', description: 'Проверяемый slug' },
];

export const slugUniqueFields: JsonField[] = [
    { code: 'slug', required: true, type: 'string', title: 'Slug', description: 'Проверяемый slug' },
    { code: 'unique', required: true, type: 'boolean', title: 'Уникален', description: 'Свободен ли slug' },
];

export const companiesDataFields: JsonField[] = [
    { code: 'companies', required: true, type: 'array', title: 'Компании', description: 'Список организаций аккаунта (AccountCompany[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const companiesList200: string = `{
    "status": true,
    "message": "Companies retrieved successfully",
    "data": {
        "companies": [
            {
                "id": "660e8400-e29b-41d4-a716-446655440020",
                "name": "Автосервис на Пушкина",
                "slug": "auto-pushkina",
                "description": "Ремонт и обслуживание легковых автомобилей.",
                "avatar_url": "",
                "is_public": true,
                "region": "РФ",
                "site": "",
                "email": "",
                "role_code": "admin",
                "joined_at": "2026-04-24T00:20:54Z",
                "created_at": "2026-04-24T00:17:05Z",
                "updated_at": "2026-06-13T15:29:02Z"
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
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/my",
        "method": "GET"
    }
}`;

const createCompany201: string = `{
    "status": true,
    "message": "Company created successfully",
    "data": {
        "id": "770e8400-e29b-41d4-a716-446655440030",
        "name": "МойКлад",
        "slug": "moiklad",
        "description": "Складской учёт",
        "avatar_url": "",
        "is_public": false,
        "region": "РФ",
        "site": "",
        "email": "",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies",
        "method": "POST"
    }
}`;

const checkSlug200: string = `{
    "status": true,
    "message": "Slug unique check result",
    "data": {
        "slug": "my-warehouse",
        "unique": true
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/check-slug-unique",
        "method": "GET"
    }
}`;

export const companiesListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={companiesList200} />
        </>
    },
    {
        code: 401,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Unauthorized",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const createCompanyResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createCompany201} />
        </>
    },
    {
        code: 400,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Validation failed: name is required",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const checkSlugResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={checkSlug200} title='/companies/check-slug-unique?slug=my-warehouse' />
        </>
    }
];