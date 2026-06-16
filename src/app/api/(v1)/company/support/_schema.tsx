import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const supportLimitsFields: JsonField[] = [
    { code: 'max_pending_tickets', required: true, type: 'int', title: 'Макс. открытых', description: 'Максимальное количество открытых тикетов (10)' },
    { code: 'max_messages_in_row', required: true, type: 'int', title: 'Макс. сообщений подряд', description: 'Максимальное количество сообщений подряд от одного аккаунта (3)' },
];

export const ticketFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор тикета' },
    { code: 'company_id', required: true, type: 'string', title: 'ID компании', description: 'Идентификатор организации' },
    { code: 'initiator_id', required: true, type: 'string', title: 'ID инициатора', description: 'Идентификатор создателя тикета' },
    { code: 'theme', required: true, type: 'enum', title: 'Тема', description: 'Тема обращения', enum: ['technical_issue', 'billing_payment', 'access_rights', 'feature_request', 'consultation'] },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус тикета', enum: ['pending', 'closed', 'revoked'] },
    { code: 'last_message', required: true, type: 'array', title: 'Последнее сообщение', description: 'Последнее сообщение в тикете (Message)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];
export const createTicketRequestFields: JsonField[] = [
    { code: 'theme', required: true, type: 'enum', title: 'Тема', description: 'Тема обращения', enum: ['technical_issue', 'billing_payment', 'access_rights', 'feature_request', 'consultation'] },
    { code: 'text', required: true, type: 'string', title: 'Текст', description: 'Текст первого сообщения' },
];

export const updateTicketStatusRequestFields: JsonField[] = [
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Новый статус тикета', enum: ['pending', 'closed', 'revoked'] },
];

export const messageFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор сообщения' },
    { code: 'account_id', required: true, type: 'string', title: 'ID аккаунта', description: 'Идентификатор автора' },
    { code: 'ticket_id', required: true, type: 'string', title: 'ID тикета', description: 'Идентификатор тикета' },
    { code: 'text', required: true, type: 'string', title: 'Текст', description: 'Текст сообщения' },
    { code: 'read', required: true, type: 'boolean', title: 'Прочитано', description: 'Статус прочтения' },
    { code: 'is_tech', required: true, type: 'boolean', title: 'Техподдержка', description: 'Отправлено техподдержкой' },
    { code: 'created_at', required: true, type: 'string', title: 'Создано', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлено', description: 'Дата последнего обновления (RFC 3339)' },
];

export const createMessageRequestFields: JsonField[] = [
    { code: 'text', required: true, type: 'string', title: 'Текст', description: 'Текст сообщения' },
];

export const updateMessageReadRequestFields: JsonField[] = [
    { code: 'read', required: true, type: 'boolean', title: 'Прочитано', description: 'Новый статус прочтения' },
];

export const ticketsDataFields: JsonField[] = [
    { code: 'tickets', required: true, type: 'array', title: 'Тикеты', description: 'Список тикетов (Ticket[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const messagesDataFields: JsonField[] = [
    { code: 'messages', required: true, type: 'array', title: 'Сообщения', description: 'Список сообщений (Message[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const ticketsList200: string = `{
    "status": true,
    "message": "Tickets retrieved successfully",
    "data": {
        "tickets": [
            {
                "id": "cc0e8400-e29b-41d4-a716-446655440110",
                "company_id": "660e8400-e29b-41d4-a716-446655440020",
                "initiator_id": "550e8400-e29b-41d4-a716-446655440001",
                "theme": "technical_issue",
                "status": "pending",
                "created_at": "2026-06-14T12:00:00Z",
                "updated_at": "2026-06-14T12:00:00Z",
                "last_message": {
                    "id": "dd0e8400-e29b-41d4-a716-446655440120",
                    "account_id": "550e8400-e29b-41d4-a716-446655440001",
                    "ticket_id": "cc0e8400-e29b-41d4-a716-446655440110",
                    "text": "Проблема с доступом к модулю финансов",
                    "read": true,
                    "is_tech": false,
                    "created_at": "2026-06-14T12:00:00Z",
                    "updated_at": "2026-06-14T12:00:00Z"
                }
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
        "path": "/api/v1/companies/.../modules/support/tickets",
        "method": "GET"
    }
}`;

const createTicket201: string = `{
    "status": true,
    "message": "Ticket created successfully",
    "data": {
        "id": "cc0e8400-e29b-41d4-a716-446655440110",
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "initiator_id": "550e8400-e29b-41d4-a716-446655440001",
        "theme": "technical_issue",
        "status": "pending",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z",
        "last_message": {
            "id": "dd0e8400-e29b-41d4-a716-446655440120",
            "account_id": "550e8400-e29b-41d4-a716-446655440001",
            "ticket_id": "cc0e8400-e29b-41d4-a716-446655440110",
            "text": "Проблема с доступом к модулю финансов",
            "read": true,
            "is_tech": false,
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/support/tickets",
        "method": "POST"
    }
}`;

const getTicket200: string = `{
    "status": true,
    "message": "Ticket retrieved successfully",
    "data": {
        "id": "cc0e8400-e29b-41d4-a716-446655440110",
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "initiator_id": "550e8400-e29b-41d4-a716-446655440001",
        "theme": "technical_issue",
        "status": "pending",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z",
        "last_message": {
            "id": "dd0e8400-e29b-41d4-a716-446655440120",
            "account_id": "550e8400-e29b-41d4-a716-446655440001",
            "ticket_id": "cc0e8400-e29b-41d4-a716-446655440110",
            "text": "Проблема с доступом к модулю финансов",
            "read": true,
            "is_tech": false,
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/support/tickets/...",
        "method": "GET"
    }
}`;

const updateTicketStatus200: string = `{
    "status": true,
    "message": "Ticket status updated successfully",
    "data": {
        "id": "cc0e8400-e29b-41d4-a716-446655440110",
        "company_id": "660e8400-e29b-41d4-a716-446655440020",
        "initiator_id": "550e8400-e29b-41d4-a716-446655440001",
        "theme": "technical_issue",
        "status": "closed",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:05:00Z",
        "last_message": {
            "id": "dd0e8400-e29b-41d4-a716-446655440120",
            "account_id": "550e8400-e29b-41d4-a716-446655440001",
            "ticket_id": "cc0e8400-e29b-41d4-a716-446655440110",
            "text": "Проблема с доступом к модулю финансов",
            "read": true,
            "is_tech": false,
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/support/tickets/...",
        "method": "PATCH"
    }
}`;

const messagesList200: string = `{
    "status": true,
    "message": "Messages retrieved successfully",
    "data": {
        "messages": [
            {
                "id": "dd0e8400-e29b-41d4-a716-446655440120",
                "account_id": "550e8400-e29b-41d4-a716-446655440001",
                "ticket_id": "cc0e8400-e29b-41d4-a716-446655440110",
                "text": "Проблема с доступом к модулю финансов",
                "read": true,
                "is_tech": false,
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
        "path": "/api/v1/companies/.../modules/support/tickets/.../messages",
        "method": "GET"
    }
}`;

const createMessage201: string = `{
    "status": true,
    "message": "Message created successfully",
    "data": {
        "id": "dd0e8400-e29b-41d4-a716-446655440121",
        "account_id": "550e8400-e29b-41d4-a716-446655440001",
        "ticket_id": "cc0e8400-e29b-41d4-a716-446655440110",
        "text": "Дополнительная информация по проблеме",
        "read": false,
        "is_tech": false,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/support/tickets/.../messages",
        "method": "POST"
    }
}`;

const updateMessageRead200: string = `{
    "status": true,
    "message": "Message read status updated successfully",
    "data": {
        "id": "dd0e8400-e29b-41d4-a716-446655440121",
        "account_id": "550e8400-e29b-41d4-a716-446655440001",
        "ticket_id": "cc0e8400-e29b-41d4-a716-446655440110",
        "text": "Дополнительная информация по проблеме",
        "read": true,
        "is_tech": false,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/support/tickets/.../messages/...",
        "method": "PATCH"
    }
}`;

export const ticketsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={ticketsList200} />
        </>
    }
];

export const createTicketResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createTicket201} />
        </>
    }
];

export const getTicketResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getTicket200} />
        </>
    }
];

export const updateTicketStatusResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateTicketStatus200} />
        </>
    }
];

export const messagesListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={messagesList200} />
        </>
    }
];

export const createMessageResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createMessage201} />
        </>
    }
];

export const updateMessageReadResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateMessageRead200} />
        </>
    }
];