import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const visitCardFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор организации' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Наименование организации' },
    { code: 'slug', required: true, type: 'string', title: 'Slug', description: 'Уникальный латинский код организации' },
    { code: 'description', required: true, type: 'string', title: 'Описание', description: 'Краткое описание деятельности' },
    { code: 'avatar_url', required: true, type: 'string', title: 'Аватар', description: 'URL логотипа организации' },
    { code: 'is_public', required: true, type: 'boolean', title: 'Публичность', description: 'Является ли компания публичной' },
    { code: 'region', required: true, type: 'string', title: 'Регион', description: 'Основной рабочий регион (РФ, Казахстан и др.)' },
    { code: 'site', required: true, type: 'string', title: 'Сайт', description: 'URL сайта организации' },
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Контактный email представителя' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата регистрации организации (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
];

const visitCard200: string = `{
    "status": true,
    "message": "Company visit card retrieved successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Компания A",
        "slug": "auto-pushkina",
        "description": "Ремонт и обслуживание легковых автомобилей.",
        "avatar_url": "https://cdn.kroncl.com/avatars/auto-pushkina.png",
        "is_public": true,
        "region": "РФ",
        "site": "https://auto-pushkina.ru",
        "email": "info@auto-pushkina.ru",
        "created_at": "2026-04-24T00:20:54.94462Z",
        "updated_at": "2026-06-13T15:29:02Z"
    },
    "meta": {
        "timestamp": "2026-06-13T22:42:35Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-000001",
        "path": "/api/v1/visit-cards/auto-pushkina",
        "method": "GET"
    }
}`;

const visitCard404: string = `{
    "status": false,
    "message": "Company not found or not public",
    "data": null,
    "meta": {
        "timestamp": "2026-06-13T22:42:35Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-008580",
        "path": "/api/v1/visit-cards/x",
        "method": "GET"
    }
}`;

export const visitCardResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={visitCard200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={visitCard404} />
        </>
    }
];