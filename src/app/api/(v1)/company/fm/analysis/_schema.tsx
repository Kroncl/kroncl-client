import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const getAnalysisParamsFields: JsonField[] = [
    { code: 'start_date', required: false, type: 'string', title: 'Начало периода', description: 'Начало периода (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец периода', description: 'Конец периода (RFC 3339)' },
    { code: 'group_by', required: false, type: 'enum', title: 'Группировка', description: 'Тип группировки', enum: ['category', 'employee', 'day', 'month'] },
];

export const analysisSummaryFields: JsonField[] = [
    { code: 'total_income', required: true, type: 'int', title: 'Всего доходов', description: 'Общая сумма доходов' },
    { code: 'total_expense', required: true, type: 'int', title: 'Всего расходов', description: 'Общая сумма расходов' },
    { code: 'net_balance', required: true, type: 'int', title: 'Чистый баланс', description: 'Разница между доходами и расходами' },
    { code: 'transaction_count', required: true, type: 'int', title: 'Кол-во транзакций', description: 'Общее количество транзакций' },
    { code: 'avg_transaction', required: true, type: 'int', title: 'Средняя транзакция', description: 'Средняя сумма транзакции' },
];

export const groupedStatsFields: JsonField[] = [
    { code: 'group_key', required: true, type: 'string', title: 'Ключ группы', description: 'Идентификатор группы' },
    { code: 'group_name', required: true, type: 'string', title: 'Название группы', description: 'Название группы' },
    { code: 'income', required: true, type: 'int', title: 'Доходы', description: 'Сумма доходов в группе' },
    { code: 'expense', required: true, type: 'int', title: 'Расходы', description: 'Сумма расходов в группе' },
    { code: 'net', required: true, type: 'int', title: 'Чистый баланс', description: 'Разница в группе' },
    { code: 'count', required: true, type: 'int', title: 'Кол-во', description: 'Количество транзакций в группе' },
];

const summary200: string = `{
    "status": true,
    "message": "Analysis summary retrieved successfully",
    "data": {
        "total_income": 150000,
        "total_expense": 95000,
        "net_balance": 55000,
        "transaction_count": 45,
        "avg_transaction": 5444
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/analysis/summary",
        "method": "GET"
    }
}`;

const grouped200: string = `{
    "status": true,
    "message": "Grouped analysis retrieved successfully",
    "data": [
        {
            "group_key": "b00e8400-e29b-41d4-a716-446655440050",
            "group_name": "Продажи",
            "income": 120000,
            "expense": 0,
            "net": 120000,
            "count": 30
        },
        {
            "group_key": "b00e8400-e29b-41d4-a716-446655440051",
            "group_name": "Закупки",
            "income": 0,
            "expense": 80000,
            "net": -80000,
            "count": 10
        }
    ],
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/analysis/grouped",
        "method": "GET"
    }
}`;

export const summaryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={summary200} />
        </>
    }
];

export const groupedResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={grouped200} />
        </>
    }
];