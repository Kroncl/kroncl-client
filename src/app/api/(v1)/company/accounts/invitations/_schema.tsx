import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const companyInvitationFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор приглашения' },
    { code: 'company_id', required: true, type: 'string', title: 'ID компании', description: 'Идентификатор организации' },
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Email, на который отправлено приглашение' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус приглашения', enum: ['waiting', 'accepted', 'rejected'] },
    { code: 'role_code', required: true, type: 'enum', title: 'Роль', description: 'Назначенная роль', enum: ['owner', 'guest'] },
    { code: 'created_at', required: true, type: 'string', title: 'Создано', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлено', description: 'Дата последнего изменения (RFC 3339)' },
];

export const inviteAccountRequestFields: JsonField[] = [
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Email приглашаемого пользователя' },
    { code: 'role_code', required: false, type: 'enum', title: 'Роль', description: 'Назначенная роль (по умолчанию guest)', enum: ['owner', 'guest'] },
];

export const invitationsDataFields: JsonField[] = [
    { code: 'invitations', required: true, type: 'array', title: 'Приглашения', description: 'Список приглашений (CompanyInvitation[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const revokeInvitationResponseFields: JsonField[] = [
    { code: 'company_id', required: true, type: 'string', title: 'ID компании', description: 'Идентификатор организации' },
    { code: 'invitation_id', required: true, type: 'string', title: 'ID приглашения', description: 'Идентификатор отозванного приглашения' },
    { code: 'revoked', required: true, type: 'boolean', title: 'Отозвано', description: 'Флаг успешного отзыва' },
];

const invitationsList200: string = `{
    "status": true,
    "message": "Invitations retrieved successfully",
    "data": {
        "invitations": [
            {
                "id": "990e8400-e29b-41d4-a716-446655440080",
                "company_id": "660e8400-e29b-41d4-a716-446655440020",
                "email": "newuser@example.com",
                "status": "pending",
                "role_code": "guest",
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
        "path": "/api/v1/companies/.../accounts/invitations",
        "method": "GET"
    }
}`;

const inviteAccount201: string = `{
    "status": true,
    "message": "Invitation created successfully",
    "data": {
        "id": "990e8400-e29b-41d4-a716-446655440080",
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "email": "newuser@example.com",
        "status": "pending",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../accounts/invitations",
        "method": "POST"
    }
}`;

const revokeInvitation200: string = `{
    "status": true,
    "message": "Invitation revoked successfully",
    "data": {
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "invitation_id": "990e8400-e29b-41d4-a716-446655440080",
        "revoked": true
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../accounts/invitations/...",
        "method": "DELETE"
    }
}`;

export const invitationsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={invitationsList200} />
        </>
    }
];

export const inviteAccountResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={inviteAccount201} />
        </>
    }
];

export const revokeInvitationResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={revokeInvitation200} />
        </>
    }
];