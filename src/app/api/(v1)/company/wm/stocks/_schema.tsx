import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const getStockBalanceParamsFields: JsonField[] = [
    { code: 'unit_id', required: false, type: 'string', title: 'ID товарной позиции', description: 'Фильтр по товарной позиции' },
];

export const stockBalanceItemFields: JsonField[] = [
    { code: 'unit_id', required: true, type: 'string', title: 'ID позиции', description: 'Идентификатор товарной позиции' },
    { code: 'unit_name', required: true, type: 'string', title: 'Название', description: 'Название товарной позиции' },
    { code: 'quantity', required: true, type: 'int', title: 'Всего', description: 'Общее количество на складе' },
    { code: 'reserved', required: true, type: 'int', title: 'Зарезервировано', description: 'Количество в резерве' },
    { code: 'available', required: true, type: 'int', title: 'Доступно', description: 'Доступное количество (quantity - reserved)' },
    { code: 'unit', required: true, type: 'array', title: 'Товарная позиция', description: 'Данные товарной позиции (CatalogUnit)' },
];

const stockBalance200: string = `{
    "status": true,
    "message": "Stock balance retrieved successfully",
    "data": [
        {
            "unit_id": "f00e8400-e29b-41d4-a716-446655440110",
            "unit_name": "Ноутбук Dell XPS",
            "quantity": 15,
            "reserved": 3,
            "available": 12,
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
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/stocks/balance",
        "method": "GET"
    }
}`;

export const stockBalanceResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={stockBalance200} />
        </>
    }
];