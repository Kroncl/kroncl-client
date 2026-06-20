import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const dealFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор сделки' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к сделке' },
    { code: 'type_id', required: false, type: 'string', title: 'ID типа', description: 'Идентификатор типа сделки' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
    { code: 'client_id', required: false, type: 'string', title: 'ID клиента', description: 'Идентификатор клиента' },
    { code: 'client', required: false, type: 'array', title: 'Клиент', description: 'Данные клиента (ClientDetail). Подробнее в статье модуля CRM.' },
    { code: 'employees', required: true, type: 'array', title: 'Сотрудники', description: 'Список сотрудников (Employee[])' },
    { code: 'status', required: false, type: 'array', title: 'Статус', description: 'Текущий статус сделки (DealStatus)' },
    { code: 'type', required: false, type: 'array', title: 'Тип', description: 'Тип сделки (DealType)' },
];

export const dealsDataFields: JsonField[] = [
    { code: 'deals', required: true, type: 'array', title: 'Сделки', description: 'Список сделок (Deal[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getDealsParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'type_id', required: false, type: 'string', title: 'ID типа', description: 'Фильтр по типу сделки' },
    { code: 'status_id', required: false, type: 'string', title: 'ID статуса', description: 'Фильтр по статусу' },
    { code: 'client_id', required: false, type: 'string', title: 'ID клиента', description: 'Фильтр по клиенту' },
    { code: 'employee_id', required: false, type: 'string', title: 'ID сотрудника', description: 'Фильтр по сотруднику' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по комментарию' },
];

export const createDealRequestFields: JsonField[] = [
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к сделке' },
    { code: 'type_id', required: false, type: 'string', title: 'ID типа', description: 'Идентификатор типа сделки' },
];

const getDeals200: string = `{
    "status": true,
    "message": "Deals retrieved successfully",
    "data": {
        "deals": [
            {
                "id": "k00e8400-e29b-41d4-a716-446655440160",
                "comment": "Срочная продажа",
                "type_id": "i00e8400-e29b-41d4-a716-446655440140",
                "created_at": "2026-06-14T12:00:00Z",
                "updated_at": "2026-06-14T12:00:00Z",
                "client_id": "d00e8400-e29b-41d4-a716-446655440090",
                "client": { ... },
                "employees": [],
                "status": {
                    "id": "j00e8400-e29b-41d4-a716-446655440150",
                    "name": "Новый",
                    "color": "#2196F3"
                },
                "type": {
                    "id": "i00e8400-e29b-41d4-a716-446655440140",
                    "name": "Продажа"
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
        "path": "/api/v1/companies/.../modules/dm/deals",
        "method": "GET"
    }
}`;

const createDeal201: string = `{
    "status": true,
    "message": "Deal created successfully",
    "data": {
        "id": "k00e8400-e29b-41d4-a716-446655440161",
        "comment": null,
        "type_id": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z",
        "client_id": null,
        "client": null,
        "employees": [],
        "status": null,
        "type": null
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/deals",
        "method": "POST"
    }
}`;

export const getDealsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getDeals200} />
        </>
    }
];

export const createDealResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createDeal201} />
        </>
    }
];