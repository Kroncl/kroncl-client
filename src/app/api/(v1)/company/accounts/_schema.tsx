import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const companyAccountFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор аккаунта' },
    { code: 'name', required: true, type: 'string', title: 'Имя', description: 'Отображаемое имя участника' },
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Email участника' },
    { code: 'avatar_url', required: false, type: 'string', title: 'Аватар', description: 'URL аватара' },
    { code: 'role_code', required: true, type: 'enum', title: 'Роль', description: 'Роль в организации', enum: ['owner', 'guest'] },
    { code: 'status', required: true, type: 'string', title: 'Статус', description: 'Статус аккаунта' },
    { code: 'joined_at', required: true, type: 'string', title: 'Вступил', description: 'Дата вступления в организацию (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата регистрации аккаунта (RFC 3339)' },
];

export const companyAccountsDataFields: JsonField[] = [
    { code: 'accounts', required: true, type: 'array', title: 'Участники', description: 'Список участников (CompanyAccount[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const companyAccountSettingsFields: JsonField[] = [
    { code: 'account_id', required: true, type: 'string', title: 'ID аккаунта', description: 'Идентификатор участника' },
    { code: 'increase_permissions', required: false, type: 'array', title: 'Добавленные', description: 'Список добавленных разрешений (string[])' },
    { code: 'reduce_permissions', required: false, type: 'array', title: 'Убранные', description: 'Список убранных разрешений (string[])' },
    { code: 'created_at', required: true, type: 'string', title: 'Созданы', description: 'Дата создания настроек (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлены', description: 'Дата последнего обновления (RFC 3339)' },
];

export const updateAccountSettingsRequestFields: JsonField[] = [
    { code: 'increase_permissions', required: false, type: 'array', title: 'Добавить', description: 'Разрешения для добавления (string[])' },
    { code: 'reduce_permissions', required: false, type: 'array', title: 'Убрать', description: 'Разрешения для удаления (string[])' },
];

const accountsList200: string = `{
    "status": true,
    "message": "Company accounts retrieved successfully",
    "data": {
        "accounts": [
            {
                "id": "550e8400-e29b-41d4-a716-446655440001",
                "name": "Иван Петров",
                "email": "developer@example.com",
                "avatar_url": null,
                "role_code": "owner",
                "status": "confirmed",
                "joined_at": "2026-04-24T00:20:54Z",
                "created_at": "2026-04-24T00:17:05Z"
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
        "path": "/api/v1/companies/.../accounts",
        "method": "GET"
    }
}`;

const getAccount200: string = `{
    "status": true,
    "message": "Company account retrieved successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Иван Петров",
        "email": "developer@example.com",
        "avatar_url": null,
        "role_code": "owner",
        "status": "confirmed",
        "joined_at": "2026-04-24T00:20:54Z",
        "created_at": "2026-04-24T00:17:05Z"
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../accounts/...",
        "method": "GET"
    }
}`;

const getSettings200: string = `{
    "status": true,
    "message": "Account settings retrieved successfully",
    "data": {
        "account_id": "550e8400-e29b-41d4-a716-446655440001",
        "increase_permissions": ["fm.transactions.create"],
        "reduce_permissions": null,
        "created_at": "2026-04-24T00:20:54Z",
        "updated_at": "2026-06-14T00:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/accounts/.../settings",
        "method": "GET"
    }
}`;

const updateSettings200: string = `{
    "status": true,
    "message": "Account settings updated successfully",
    "data": {
        "account_id": "550e8400-e29b-41d4-a716-446655440001",
        "increase_permissions": ["fm.transactions.create", "crm.clients"],
        "reduce_permissions": null,
        "created_at": "2026-04-24T00:20:54Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/accounts/.../settings",
        "method": "PATCH"
    }
}`;

const dropAccount200: string = `{
    "status": true,
    "message": "Account removed successfully",
    "data": {
        "account_id": "550e8400-e29b-41d4-a716-446655440002",
        "removed": true
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/accounts/...",
        "method": "DELETE"
    }
}`;

export const accountsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={accountsList200} />
        </>
    }
];

export const getAccountResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getAccount200} />
        </>
    }
];

export const getSettingsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getSettings200} />
        </>
    }
];

export const updateSettingsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateSettings200} />
        </>
    }
];

export const dropAccountResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={dropAccount200} />
        </>
    }
];

const accountPermissions200: string = `{
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
            "code": "crm.clients",
            "lvl": 2,
            "criticality": 5,
            "allow_expired": true
        }
    ],
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/accounts/.../permissions",
        "method": "GET"
    }
}`;

export const accountPermissionsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={accountPermissions200} />
        </>
    }
];

export const companyPermissionsFields: JsonField[] = [
    { code: 'code', required: true, type: 'string', title: 'Код', description: 'Уникальный код разрешения' },
    { code: 'lvl', required: true, type: 'int', title: 'Уровень', description: 'Минимальный уровень тарифа' },
    { code: 'criticality', required: true, type: 'int', title: 'Критичность', description: 'Степень важности (1-10)' },
    { code: 'allow_expired', required: true, type: 'boolean', title: 'Просроченный доступ', description: 'Доступно ли после окончания тарифа' },
];
