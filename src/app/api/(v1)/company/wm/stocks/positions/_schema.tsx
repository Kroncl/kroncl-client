import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const positionWithUnitFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Идентификатор позиции' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип позиции', enum: ['batch', 'serial'] },
    { code: 'unit_id', required: true, type: 'string', title: 'ID товарной позиции', description: 'Идентификатор товарной позиции' },
    { code: 'quantity', required: true, type: 'int', title: 'Количество', description: 'Количество в позиции' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'batch_id', required: true, type: 'string', title: 'ID партии', description: 'Идентификатор партии' },
    { code: 'unit', required: true, type: 'array', title: 'Товарная позиция', description: 'Данные товарной позиции (CatalogUnit)' },
];

export const stockPositionsDataFields: JsonField[] = [
    { code: 'positions', required: true, type: 'array', title: 'Позиции', description: 'Список позиций (PositionWithUnit[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getStockPositionsParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Фильтр по типу позиции', enum: ['batch', 'serial'] },
    { code: 'unit_id', required: false, type: 'string', title: 'ID товарной позиции', description: 'Фильтр по товарной позиции' },
    { code: 'batch_id', required: false, type: 'string', title: 'ID партии', description: 'Фильтр по партии' },
    { code: 'in_stock', required: false, type: 'boolean', title: 'В наличии', description: 'Фильтр по наличию на складе' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по товарной позиции' },
];

const getStockPositions200: string = `{
    "status": true,
    "message": "Stock positions retrieved successfully",
    "data": {
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
        "path": "/api/v1/companies/.../modules/wm/stocks/positions",
        "method": "GET"
    }
}`;

const getStockPosition200: string = `{
    "status": true,
    "message": "Stock position retrieved successfully",
    "data": {
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
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/stocks/positions/...",
        "method": "GET"
    }
}`;

export const getStockPositionsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getStockPositions200} />
        </>
    }
];

export const getStockPositionResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getStockPosition200} />
        </>
    }
];