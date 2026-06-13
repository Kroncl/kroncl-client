import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const invitationsDataFields: JsonField[] = [
    { code: 'invitations', required: true, type: 'array', title: 'Приглашения', description: 'Список входящих приглашений (Invitation[])' },
    { code: 'pagination', required: true, type: 'array'}
];

export const invitationFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор приглашения' },
    { code: 'email', required: true, type: 'string', title: 'Почта', description: 'Email, на который отправлено приглашение' },
    { code: 'company_id', required: true, type: 'string', title: 'ID организации', description: 'Уникальный идентификатор организации' },
    { code: 'company_name', required: true, type: 'string', title: 'Организация', description: 'Название организации, в которую пригласили' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус приглашения', enum: ['waiting', 'accepted', 'rejected'] },
    { code: 'created_at', required: true, type: 'string', title: 'Создано', description: 'Дата отправки приглашения (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлено', description: 'Дата последнего изменения (RFC 3339)' },
];

const invitationsList200: string = `{
    "status": true,
    "message": "Invitations retrieved successfully",
    "data": {
        "invitations": [
            {
                "id": "550e8400-e29b-41d4-a716-446655440010",
                "email": "developer@example.com",
                "company_id": "660e8400-e29b-41d4-a716-446655440020",
                "company_name": "Автосервис на Пушкина",
                "status": "pending",
                "created_at": "2026-06-13T15:29:02Z",
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
        "path": "/api/v1/account/invitations",
        "method": "GET"
    }
}`;

const acceptInvitation200: string = `{
    "status": true,
    "message": "Invitation accepted successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "email": "developer@example.com",
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "status": "accepted",
        "created_at": "2026-06-13T15:29:02Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account/invitations/.../accept",
        "method": "POST"
    }
}`;

const rejectInvitation200: string = `{
    "status": true,
    "message": "Invitation rejected successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440010",
        "email": "developer@example.com",
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "status": "rejected",
        "created_at": "2026-06-13T15:29:02Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/account/invitations/.../reject",
        "method": "POST"
    }
}`;

export const invitationsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={invitationsList200} />
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

export const acceptInvitationResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={acceptInvitation200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Invitation not found",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const rejectInvitationResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={rejectInvitation200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Invitation not found",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];