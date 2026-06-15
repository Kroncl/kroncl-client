import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const apiKeyListItemFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор ключа' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название приложения' },
    { code: 'key_prefix', required: true, type: 'string', title: 'Префикс', description: 'Первые символы ключа для идентификации (например: kron_abc...)' },
    { code: 'daily_requests', required: true, type: 'int', title: 'Лимит в день', description: 'Максимальное количество запросов в сутки' },
    { code: 'last_used_at', required: false, type: 'string', title: 'Последнее использование', description: 'Дата последнего запроса с этим ключом (RFC 3339)' },
    { code: 'expires_at', required: false, type: 'string', title: 'Истекает', description: 'Дата истечения срока действия (RFC 3339)' },
    { code: 'revoked_at', required: false, type: 'string', title: 'Отозван', description: 'Дата отзыва ключа (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
];

export const apiKeyWithRawFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор ключа' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название приложения' },
    { code: 'raw_key', required: true, type: 'string', title: 'Ключ', description: 'Полный ключ (показывается только один раз при создании!)' },
    { code: 'key_prefix', required: true, type: 'string', title: 'Префикс', description: 'Первые символы ключа' },
    { code: 'daily_requests', required: true, type: 'int', title: 'Лимит в день', description: 'Максимальное количество запросов в сутки' },
    { code: 'expires_at', required: false, type: 'string', title: 'Истекает', description: 'Дата истечения срока действия (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
];

export const apiKeyDetailFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор ключа' },
    { code: 'account_id', required: true, type: 'string', title: 'ID аккаунта', description: 'Идентификатор владельца ключа' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название приложения' },
    { code: 'key_prefix', required: true, type: 'string', title: 'Префикс', description: 'Первые символы ключа' },
    { code: 'daily_requests', required: true, type: 'int', title: 'Лимит в день', description: 'Максимальное количество запросов в сутки' },
    { code: 'last_used_at', required: false, type: 'string', title: 'Последнее использование', description: 'Дата последнего запроса (RFC 3339)' },
    { code: 'expires_at', required: false, type: 'string', title: 'Истекает', description: 'Дата истечения срока (RFC 3339)' },
    { code: 'revoked_at', required: false, type: 'string', title: 'Отозван', description: 'Дата отзыва (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const createApiKeyRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название приложения (например: Мой бот)' },
    { code: 'expires_in', required: false, type: 'string', title: 'Срок жизни в часах +h', description: '24h, 48h, never (по умолчанию never)' },
    { code: 'daily_requests', required: false, type: 'int', title: 'Лимит в день', description: 'Максимальное количество запросов в сутки (по умолчанию 1000)' },
];

export const apiKeysDataFields: JsonField[] = [
    { code: 'api_keys', required: true, type: 'array', title: 'Ключи', description: 'Список API-ключей (ApiKeyListItem[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const apiKeysList200: string = `{
    "status": true,
    "message": "API keys retrieved successfully",
    "data": {
        "api_keys": [
            {
                "id": "550e8400-e29b-41d4-a716-446655440060",
                "name": "Мой бот",
                "key_prefix": "kron_abc123de",
                "daily_requests": 1000,
                "last_used_at": "2026-06-13T15:29:02Z",
                "expires_at": null,
                "revoked_at": null,
                "created_at": "2026-05-24T15:27:58Z"
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
        "path": "/api/v1/account/api-keys",
        "method": "GET"
    }
}`;

const getApiKey200: string = `{
    "status": true,
    "message": "API key retrieved successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440060",
        "account_id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Мой бот",
        "key_prefix": "kron_abc123de",
        "daily_requests": 1000,
        "last_used_at": "2026-06-13T15:29:02Z",
        "expires_at": null,
        "revoked_at": null,
        "created_at": "2026-05-24T15:27:58Z",
        "updated_at": "2026-06-13T15:29:02Z"
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account/api-keys/...",
        "method": "GET"
    }
}`;

const createApiKey201: string = `{
    "status": true,
    "message": "API key created successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440061",
        "name": "Мой бот",
        "raw_key": "kron_abc123def456ghi789jkl012mno345pq678rst",
        "key_prefix": "kron_abc123de",
        "daily_requests": 1000,
        "expires_at": null,
        "created_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account/api-keys",
        "method": "POST"
    }
}`;

const revokeApiKey200: string = `{
    "status": true,
    "message": "API key revoked successfully",
    "data": {},
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/account/api-keys/.../revoke",
        "method": "POST"
    }
}`;

export const apiKeysListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={apiKeysList200} />
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

export const getApiKeyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getApiKey200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "API key not found",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const createApiKeyResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createApiKey201} />
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

export const revokeApiKeyResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={revokeApiKey200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "API key not found",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];