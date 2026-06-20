import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const clientFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор клиента' },
    { code: 'first_name', required: true, type: 'string', title: 'Имя', description: 'Имя клиента' },
    { code: 'last_name', required: false, type: 'string', title: 'Фамилия', description: 'Фамилия клиента' },
    { code: 'patronymic', required: false, type: 'string', title: 'Отчество', description: 'Отчество клиента' },
    { code: 'phone', required: false, type: 'string', title: 'Телефон', description: 'Номер телефона' },
    { code: 'email', required: false, type: 'string', title: 'Почта', description: 'Email адрес' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип клиента', enum: ['individual', 'legal'] },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const clientDetailFields: JsonField[] = [
    ...clientFields,
    { code: 'source', required: true, type: 'array', title: 'Источник', description: 'Источник клиента (Source)' },
];

export const clientsDataFields: JsonField[] = [
    { code: 'clients', required: true, type: 'array', title: 'Клиенты', description: 'Список клиентов (ClientDetail[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getClientsParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Фильтр по типу', enum: ['individual', 'legal'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['active', 'inactive'] },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по имени, фамилии, email' },
    { code: 'source_id', required: false, type: 'string', title: 'ID источника', description: 'Фильтр по источнику' },
];

export const createClientRequestFields: JsonField[] = [
    { code: 'first_name', required: true, type: 'string', title: 'Имя', description: 'Имя клиента' },
    { code: 'last_name', required: false, type: 'string', title: 'Фамилия', description: 'Фамилия клиента' },
    { code: 'patronymic', required: false, type: 'string', title: 'Отчество', description: 'Отчество клиента' },
    { code: 'phone', required: false, type: 'string', title: 'Телефон', description: 'Номер телефона' },
    { code: 'email', required: false, type: 'string', title: 'Почта', description: 'Email адрес' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип клиента', enum: ['individual', 'legal'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус (по умолчанию active)', enum: ['active', 'inactive'] },
    { code: 'source_id', required: true, type: 'string', title: 'ID источника', description: 'Идентификатор источника' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const updateClientRequestFields: JsonField[] = [
    { code: 'first_name', required: false, type: 'string', title: 'Имя', description: 'Имя клиента' },
    { code: 'last_name', required: false, type: 'string', title: 'Фамилия', description: 'Фамилия клиента' },
    { code: 'patronymic', required: false, type: 'string', title: 'Отчество', description: 'Отчество клиента' },
    { code: 'phone', required: false, type: 'string', title: 'Телефон', description: 'Номер телефона' },
    { code: 'email', required: false, type: 'string', title: 'Почта', description: 'Email адрес' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Тип клиента', enum: ['individual', 'legal'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'inactive'] },
    { code: 'source_id', required: false, type: 'string', title: 'ID источника', description: 'Идентификатор источника' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

const getClients200: string = `{
    "status": true,
    "message": "Clients retrieved successfully",
    "data": {
        "clients": [
            {
                "id": "d00e8400-e29b-41d4-a716-446655440090",
                "first_name": "Иван",
                "last_name": "Петров",
                "patronymic": "Иванович",
                "phone": "+79000000000",
                "email": "ivan@example.com",
                "comment": "Постоянный клиент",
                "type": "individual",
                "status": "active",
                "metadata": null,
                "created_at": "2026-06-14T12:00:00Z",
                "updated_at": "2026-06-14T12:00:00Z",
                "source": {
                    "id": "c00e8400-e29b-41d4-a716-446655440080",
                    "name": "Яндекс.Директ",
                    "type": "paid",
                    "status": "active"
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
        "path": "/api/v1/companies/.../modules/crm/clients",
        "method": "GET"
    }
}`;

const getClient200: string = `{
    "status": true,
    "message": "Client retrieved successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440090",
        "first_name": "Иван",
        "last_name": "Петров",
        "patronymic": "Иванович",
        "phone": "+79000000000",
        "email": "ivan@example.com",
        "comment": "Постоянный клиент",
        "type": "individual",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z",
        "source": {
            "id": "c00e8400-e29b-41d4-a716-446655440080",
            "name": "Яндекс.Директ",
            "url": "https://yandex.ru/direct",
            "type": "paid",
            "comment": "Контекстная реклама",
            "system": false,
            "status": "active",
            "metadata": null,
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/clients/...",
        "method": "GET"
    }
}`;

const createClient201: string = `{
    "status": true,
    "message": "Client created successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440091",
        "first_name": "Пётр",
        "last_name": "Сидоров",
        "patronymic": null,
        "phone": "+79000000001",
        "email": null,
        "comment": null,
        "type": "individual",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z",
        "source": {
            "id": "c00e8400-e29b-41d4-a716-446655440080",
            "name": "Яндекс.Директ",
            "type": "paid",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/clients",
        "method": "POST"
    }
}`;

const updateClient200: string = `{
    "status": true,
    "message": "Client updated successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440091",
        "first_name": "Пётр",
        "last_name": "Сидоров (обновлено)",
        "patronymic": null,
        "phone": "+79000000001",
        "email": "petr@example.com",
        "comment": "Новый клиент",
        "type": "individual",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z",
        "source": {
            "id": "c00e8400-e29b-41d4-a716-446655440080",
            "name": "Яндекс.Директ",
            "type": "paid",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/clients/...",
        "method": "PATCH"
    }
}`;

const deactivateClient200: string = `{
    "status": true,
    "message": "Client deactivated successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440091",
        "first_name": "Пётр",
        "last_name": "Сидоров (обновлено)",
        "patronymic": null,
        "phone": "+79000000001",
        "email": "petr@example.com",
        "comment": "Новый клиент",
        "type": "individual",
        "status": "inactive",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:15:00Z",
        "source": {
            "id": "c00e8400-e29b-41d4-a716-446655440080",
            "name": "Яндекс.Директ",
            "type": "paid",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/clients/.../deactivate",
        "method": "POST"
    }
}`;

const activateClient200: string = `{
    "status": true,
    "message": "Client activated successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440091",
        "first_name": "Пётр",
        "last_name": "Сидоров (обновлено)",
        "patronymic": null,
        "phone": "+79000000001",
        "email": "petr@example.com",
        "comment": "Новый клиент",
        "type": "individual",
        "status": "active",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:20:00Z",
        "source": {
            "id": "c00e8400-e29b-41d4-a716-446655440080",
            "name": "Яндекс.Директ",
            "type": "paid",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/clients/.../activate",
        "method": "POST"
    }
}`;

export const getClientsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getClients200} />
        </>
    }
];

export const getClientResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getClient200} />
        </>
    }
];

export const createClientResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createClient201} />
        </>
    }
];

export const updateClientResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateClient200} />
        </>
    }
];

export const deactivateClientResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deactivateClient200} />
        </>
    }
];

export const activateClientResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activateClient200} />
        </>
    }
];