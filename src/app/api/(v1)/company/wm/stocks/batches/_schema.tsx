import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const stockBatchFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор партии' },
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление движения', enum: ['income', 'outcome'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к партии' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
];

export const stockBatchesDataFields: JsonField[] = [
    { code: 'batches', required: true, type: 'array', title: 'Партии', description: 'Список партий (StockBatch[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getStockBatchesParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'direction', required: false, type: 'enum', title: 'Направление', description: 'Фильтр по направлению', enum: ['income', 'outcome'] },
    { code: 'unit_id', required: false, type: 'string', title: 'ID позиции', description: 'Фильтр по товарной позиции' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по комментарию' },
];

export const createStockBatchRequestFields: JsonField[] = [
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление движения', enum: ['income', 'outcome'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к партии' },
    { code: 'positions', required: true, type: 'array', title: 'Позиции', description: 'Список позиций в партии (StockBatchPosition[])' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const createStockBatchResponseFields: JsonField[] = [
    { code: 'batch_id', required: true, type: 'string', title: 'ID партии', description: 'Идентификатор созданной партии' },
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление движения', enum: ['income', 'outcome'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к партии' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
    { code: 'positions', required: true, type: 'array', title: 'Позиции', description: 'Список позиций в партии (PositionWithUnit[])' },
];

export const positionWithUnitFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Идентификатор позиции' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип позиции', enum: ['batch', 'serial'] },
    { code: 'unit_id', required: true, type: 'string', title: 'ID товарной позиции', description: 'Идентификатор товарной позиции' },
    { code: 'quantity', required: true, type: 'int', title: 'Количество', description: 'Количество в позиции' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'batch_id', required: true, type: 'string', title: 'ID партии', description: 'Идентификатор партии' },
    { code: 'unit', required: true, type: 'array', title: 'Товарная позиция', description: 'Данные товарной позиции (CatalogUnit)' },
];

export const batchWithPositionsFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор партии' },
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление движения', enum: ['income', 'outcome'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к партии' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата последнего обновления (RFC 3339)' },
    { code: 'positions', required: true, type: 'array', title: 'Позиции', description: 'Список позиций в партии (PositionWithUnit[])' },
];

const getStockBatches200: string = `{
    "status": true,
    "message": "Stock batches retrieved successfully",
    "data": {
        "batches": [
            {
                "id": "g00e8400-e29b-41d4-a716-446655440120",
                "direction": "income",
                "comment": "Поставка от поставщика",
                "metadata": null,
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
        "path": "/api/v1/companies/.../modules/wm/stocks/batches",
        "method": "GET"
    }
}`;

const getStockBatch200: string = `{
    "status": true,
    "message": "Stock batch retrieved successfully",
    "data": {
        "id": "g00e8400-e29b-41d4-a716-446655440120",
        "direction": "income",
        "comment": "Поставка от поставщика",
        "metadata": null,
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z",
        "positions": [
            {
                "id": "h00e8400-e29b-41d4-a716-446655440130",
                "type": "batch",
                "unit_id": "f00e8400-e29b-41d4-a716-446655440110",
                "quantity": 10,
                "created_at": "2026-06-14T12:00:00Z",
                "batch_id": "g00e8400-e29b-41d4-a716-446655440120",
                "unit": {
                    "id": "f00e8400-e29b-41d4-a716-446655440110",
                    "name": "Ноутбук Dell XPS",
                    "type": "product",
                    "unit": "шт",
                    "sale_price": 150000,
                    "currency": "RUB"
                }
            }
        ]
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/stocks/batches/...",
        "method": "GET"
    }
}`;

const createStockBatch201: string = `{
    "status": true,
    "message": "Stock batch created successfully",
    "data": {
        "batch_id": "g00e8400-e29b-41d4-a716-446655440121",
        "direction": "income",
        "comment": "Новая поставка",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z",
        "positions": [
            {
                "id": "h00e8400-e29b-41d4-a716-446655440131",
                "type": "batch",
                "unit_id": "f00e8400-e29b-41d4-a716-446655440110",
                "quantity": 5,
                "created_at": "2026-06-14T12:05:00Z",
                "batch_id": "g00e8400-e29b-41d4-a716-446655440121",
                "unit": {
                    "id": "f00e8400-e29b-41d4-a716-446655440110",
                    "name": "Ноутбук Dell XPS",
                    "type": "product",
                    "unit": "шт",
                    "sale_price": 150000,
                    "currency": "RUB"
                }
            }
        ]
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/stocks/batches",
        "method": "POST"
    }
}`;

export const getStockBatchesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getStockBatches200} />
        </>
    }
];

export const getStockBatchResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getStockBatch200} />
        </>
    }
];

export const createStockBatchResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createStockBatch201} />
        </>
    }
];