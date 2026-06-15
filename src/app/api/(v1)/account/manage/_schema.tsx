import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const accountFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор аккаунта' },
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Email, привязанный к аккаунту' },
    { code: 'name', required: true, type: 'string', title: 'Имя', description: 'Отображаемое имя или псевдоним' },
    { code: 'avatar_url', required: false, type: 'string', title: 'Аватар', description: 'URL аватара (null, если не задан)' },
    { code: 'auth_type', required: true, type: 'string', title: 'Тип авторизации', description: 'password, oauth, sso, ldap' },
    { code: 'status', required: true, type: 'string', title: 'Статус', description: 'waiting или confirmed' },
    { code: 'description', required: true, type: 'string', title: 'Описание', description: 'Текущий статус-описание аккаунта' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип аккаунта (важен при общении со специалистом поддержки)', enum: ['owner', 'employee', 'admin', 'outsourcing', 'tech'] },
    { code: 'is_admin', required: false, type: 'boolean', title: 'Админ', description: 'Является ли аккаунт администратором платформы' },
    { code: 'admin_level', required: false, type: 'int', title: 'Уровень админа', description: 'Уровень административного доступа' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата регистрации (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const updateAccountRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Имя', description: 'Новое отображаемое имя' },
    { code: 'description', required: false, type: 'string', title: 'Описание', description: 'Новый статус/описание' },
    { code: 'type', required: false, type: 'string', title: 'Тип', description: 'Новый тип аккаунта' },
];

export const summaryFields: JsonField[] = [
    { code: 'organizations_count', required: true, type: 'int', title: 'Организаций', description: 'Количество организаций, в которых состоит аккаунт' },
    { code: 'invitations_count', required: true, type: 'int', title: 'Приглашений', description: 'Количество активных входящих приглашений' },
    { code: 'fingerprints_count', required: true, type: 'int', title: 'Отпечатков', description: 'Количество активных fingerprint-ключей' },
];

const getAccount200: string = `{
    "status": true,
    "message": "Profile retrieved successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "email": "developer@example.com",
        "name": "Иван Петров",
        "avatar_url": null,
        "auth_type": "password",
        "status": "confirmed",
        "description": "Работаю над интеграцией",
        "type": "developer",
        "created_at": "2026-04-24T00:20:54.94462Z",
        "updated_at": "2026-06-13T15:29:02Z"
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account",
        "method": "GET"
    }
}`;

const updateAccount200: string = `{
    "status": true,
    "message": "Profile updated successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "email": "developer@example.com",
        "name": "Иван Смирнов",
        "avatar_url": null,
        "auth_type": "password",
        "status": "confirmed",
        "description": "Интеграция готова",
        "type": "developer",
        "created_at": "2026-04-24T00:20:54.94462Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account",
        "method": "PATCH"
    }
}`;

const getSummary200: string = `{
    "status": true,
    "message": "Summary retrieved successfully",
    "data": {
        "organizations_count": 3,
        "invitations_count": 1,
        "fingerprints_count": 2
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account/summary",
        "method": "GET"
    }
}`;

export const getAccountResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getAccount200} />
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

export const updateAccountResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateAccount200} />
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

export const summaryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getSummary200} />
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