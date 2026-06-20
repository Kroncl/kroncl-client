import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const dealWithPositionsFields: JsonField[] = [
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
    { code: 'positions', required: true, type: 'array', title: 'Позиции', description: 'Список позиций в сделке (DealPosition[])' },
];

export const dealPositionFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Идентификатор позиции' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название позиции' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'price', required: true, type: 'int', title: 'Цена', description: 'Цена за единицу' },
    { code: 'quantity', required: true, type: 'int', title: 'Количество', description: 'Количество' },
    { code: 'unit', required: true, type: 'string', title: 'Единица', description: 'Единица измерения' },
    { code: 'unit_id', required: false, type: 'string', title: 'ID товарной позиции', description: 'Идентификатор товарной позиции из каталога' },
    { code: 'position_id', required: false, type: 'string', title: 'ID складской позиции', description: 'Идентификатор складской позиции' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
    { code: 'catalog_unit', required: false, type: 'array', title: 'Товарная позиция', description: 'Данные товарной позиции из каталога (CatalogUnit). Подробнее в статье модуля WM.' },
    { code: 'catalog_position', required: false, type: 'array', title: 'Складская позиция', description: 'Данные складской позиции (StockPosition). Подробнее в статье модуля WM.' },
];

export const updateDealPositionFields: JsonField[] = [
    { code: 'id', required: false, type: 'string', title: 'ID', description: 'Идентификатор позиции (для обновления существующей)' },
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название позиции' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'price', required: false, type: 'int', title: 'Цена', description: 'Цена за единицу' },
    { code: 'quantity', required: false, type: 'int', title: 'Количество', description: 'Количество' },
    { code: 'unit', required: false, type: 'string', title: 'Единица', description: 'Единица измерения' },
    { code: 'unit_id', required: false, type: 'string', title: 'ID товарной позиции', description: 'Идентификатор товарной позиции из каталога' },
    { code: 'position_id', required: false, type: 'string', title: 'ID складской позиции', description: 'Идентификатор складской позиции' },
    { code: 'delete', required: false, type: 'boolean', title: 'Удалить', description: 'Если true — удалить позицию' },
];

export const updateDealRequestFields: JsonField[] = [
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к сделке' },
    { code: 'type_id', required: false, type: 'string', title: 'ID типа', description: 'Идентификатор типа сделки' },
    { code: 'client_id', required: false, type: 'string', title: 'ID клиента', description: 'Идентификатор клиента' },
    { code: 'status_id', required: false, type: 'string', title: 'ID статуса', description: 'Идентификатор статуса' },
    { code: 'employees', required: false, type: 'array', title: 'Сотрудники', description: 'Полная замена списка сотрудников (string[])' },
    { code: 'positions', required: false, type: 'array', title: 'Позиции', description: 'Список позиций для обновления (UpdateDealPosition[])' },
];

export const deleteDealResponseFields: JsonField[] = [
    { code: 'deal_id', required: true, type: 'string', title: 'ID сделки', description: 'ID удалённой сделки' },
    { code: 'deleted', required: true, type: 'boolean', title: 'Удалена', description: 'Статус удаления' },
];

export const invoiceRequestFields: JsonField[] = [
    { code: 'legal_name', required: false, type: 'string', title: 'Юр. название', description: 'Юридическое название компании' },
    { code: 'inn', required: false, type: 'string', title: 'ИНН', description: 'ИНН компании' },
    { code: 'ogrn', required: false, type: 'string', title: 'ОГРН', description: 'ОГРН компании' },
    { code: 'bank_name', required: false, type: 'string', title: 'Банк', description: 'Название банка' },
    { code: 'warranty_terms', required: false, type: 'string', title: 'Гарантия', description: 'Условия гарантии' },
    { code: 'additional_terms', required: false, type: 'string', title: 'Доп. условия', description: 'Дополнительные условия' },
    { code: 'positions', required: true, type: 'array', title: 'Позиции', description: 'Список позиций для накладной (InvoicePosition[])' },
    { code: 'total_amount', required: true, type: 'int', title: 'Итого', description: 'Общая сумма' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
];

export const invoicePositionFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название позиции' },
    { code: 'quantity', required: true, type: 'int', title: 'Количество', description: 'Количество' },
    { code: 'price', required: true, type: 'int', title: 'Цена', description: 'Цена за единицу' },
];

export const invoiceResponseFields: JsonField[] = [
    { code: 'download_url', required: true, type: 'string', title: 'Ссылка (deprecated)', description: 'Прямая ссылка на скачивание. Устарело — используйте object_path из doc.' },
    { code: 'doc', required: true, type: 'array', title: 'Документ', description: 'Сгенерированный документ (Doc)' },
];

const getDeal200: string = `{
    "status": true,
    "message": "Deal retrieved successfully",
    "data": {
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
        },
        "positions": [
            {
                "id": "l00e8400-e29b-41d4-a716-446655440170",
                "name": "Ноутбук Dell XPS",
                "comment": "Флагманская модель",
                "price": 150000,
                "quantity": 1,
                "unit": "шт",
                "unit_id": "f00e8400-e29b-41d4-a716-446655440110",
                "position_id": null,
                "created_at": "2026-06-14T12:00:00Z",
                "updated_at": "2026-06-14T12:00:00Z",
                "catalog_unit": { ... },
                "catalog_position": null
            }
        ]
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/deals/...",
        "method": "GET"
    }
}`;

const updateDeal200: string = `{
    "status": true,
    "message": "Deal updated successfully",
    "data": {
        "id": "k00e8400-e29b-41d4-a716-446655440160",
        "comment": "Обновлённая сделка",
        "type_id": "i00e8400-e29b-41d4-a716-446655440140",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:10:00Z",
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
        },
        "positions": []
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/deals/...",
        "method": "PATCH"
    }
}`;

const deleteDeal200: string = `{
    "status": true,
    "message": "Deal deleted successfully",
    "data": {
        "deal_id": "k00e8400-e29b-41d4-a716-446655440160",
        "deleted": true
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/deals/...",
        "method": "DELETE"
    }
}`;

const invoice200: string = `{
    "status": true,
    "message": "Invoice generated successfully",
    "data": {
        "download_url": "https://cdn.kroncl.com/invoices/invoice-2026-06-14.pdf",
        "doc": {
            "id": "m00e8400-e29b-41d4-a716-446655440180",
            "object_path": "invoices/invoice-2026-06-14.pdf",
            "module": "dm",
            "type": "invoice",
            "comment": "Накладная по сделке",
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/deals/.../invoice",
        "method": "POST"
    }
}`;

export const getDealResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getDeal200} />
        </>
    }
];

export const updateDealResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateDeal200} />
        </>
    }
];

export const deleteDealResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deleteDeal200} />
        </>
    }
];

export const invoiceResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={invoice200} />
        </>
    }
];