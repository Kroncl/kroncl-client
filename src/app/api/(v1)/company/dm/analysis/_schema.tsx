import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const analysisParamsFields: JsonField[] = [
    { code: 'start_date', required: false, type: 'string', title: 'Начало периода', description: 'Начало периода (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец периода', description: 'Конец периода (RFC 3339)' },
    { code: 'type_id', required: false, type: 'string', title: 'ID типа', description: 'Фильтр по типу сделки' },
    { code: 'status_id', required: false, type: 'string', title: 'ID статуса', description: 'Фильтр по статусу' },
    { code: 'client_id', required: false, type: 'string', title: 'ID клиента', description: 'Фильтр по клиенту' },
    { code: 'employee_id', required: false, type: 'string', title: 'ID сотрудника', description: 'Фильтр по сотруднику' },
];

export const groupedAnalysisParamsFields: JsonField[] = [
    ...analysisParamsFields,
    { code: 'group_by', required: true, type: 'enum', title: 'Группировка', description: 'Тип группировки', enum: ['type', 'status', 'employee', 'client', 'day', 'month', 'year'] },
];

export const dealAnalysisSummaryFields: JsonField[] = [
    { code: 'total_deals', required: true, type: 'int', title: 'Всего сделок', description: 'Общее количество сделок' },
    { code: 'default_status_id', required: false, type: 'string', title: 'ID статуса по умолчанию', description: 'Идентификатор статуса по умолчанию' },
    { code: 'default_status_name', required: false, type: 'string', title: 'Статус по умолчанию', description: 'Название статуса по умолчанию' },
    { code: 'deals_in_default', required: true, type: 'int', title: 'Сделок в статусе по умолчанию', description: 'Количество сделок в статусе по умолчанию' },
    { code: 'avg_deal_amount', required: false, type: 'int', title: 'Средняя сумма', description: 'Средняя сумма сделки' },
];

export const groupedStatsFields: JsonField[] = [
    { code: 'group_key', required: true, type: 'string', title: 'Ключ группы', description: 'Идентификатор группы' },
    { code: 'group_name', required: true, type: 'string', title: 'Название группы', description: 'Название группы' },
    { code: 'count', required: true, type: 'int', title: 'Количество', description: 'Количество сделок в группе' },
];

export const dealTransactionsSummaryFields: JsonField[] = [
    { code: 'total_amount', required: true, type: 'int', title: 'Всего', description: 'Общая сумма всех транзакций' },
    { code: 'income_amount', required: true, type: 'int', title: 'Доходы', description: 'Сумма доходных транзакций' },
    { code: 'expense_amount', required: true, type: 'int', title: 'Расходы', description: 'Сумма расходных транзакций' },
    { code: 'income_count', required: true, type: 'int', title: 'Кол-во доходов', description: 'Количество доходных транзакций' },
    { code: 'expense_count', required: true, type: 'int', title: 'Кол-во расходов', description: 'Количество расходных транзакций' },
    { code: 'total_count', required: true, type: 'int', title: 'Кол-во транзакций', description: 'Общее количество транзакций' },
];

const summary200: string = `{
    "status": true,
    "message": "Deal analysis summary retrieved successfully",
    "data": {
        "total_deals": 25,
        "default_status_id": "j00e8400-e29b-41d4-a716-446655440150",
        "default_status_name": "Новый",
        "deals_in_default": 12,
        "avg_deal_amount": 50000
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/analysis/summary",
        "method": "GET"
    }
}`;

const grouped200: string = `{
    "status": true,
    "message": "Grouped deal analysis retrieved successfully",
    "data": [
        {
            "group_key": "i00e8400-e29b-41d4-a716-446655440140",
            "group_name": "Продажа",
            "count": 15
        },
        {
            "group_key": "i00e8400-e29b-41d4-a716-446655440141",
            "group_name": "Закупка",
            "count": 10
        }
    ],
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/analysis/grouped",
        "method": "GET"
    }
}`;

const financialSummary200: string = `{
    "status": true,
    "message": "Financial summary retrieved successfully",
    "data": {
        "total_amount": 1500000,
        "income_amount": 1200000,
        "expense_amount": 300000,
        "income_count": 30,
        "expense_count": 15,
        "total_count": 45
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/analysis/financial-summary",
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

export const financialSummaryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={financialSummary200} />
        </>
    }
];