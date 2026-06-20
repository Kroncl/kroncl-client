import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const transactionDetailFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор транзакции' },
    { code: 'base_amount', required: true, type: 'int', title: 'Сумма', description: 'Сумма транзакции' },
    { code: 'currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление', enum: ['income', 'expense'] },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус', enum: ['pending', 'completed', 'failed', 'cancelled'] },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к транзакции' },
    { code: 'reverse_to', required: false, type: 'string', title: 'Сторнирует', description: 'ID транзакции, которую сторнирует' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'employee_id', required: false, type: 'string', title: 'ID сотрудника', description: 'Идентификатор сотрудника' },
    { code: 'employee_first_name', required: false, type: 'string', title: 'Имя сотрудника', description: 'Имя сотрудника' },
    { code: 'employee_last_name', required:false, type: 'string', title: 'Фамилия сотрудника', description: 'Фамилия сотрудника' },
    { code: 'category_id', required: false, type: 'string', title: 'ID категории', description: 'Идентификатор категории' },
    { code: 'category_name', required: false, type: 'string', title: 'Название категории', description: 'Название категории' },
];

export const transactionsDataFields: JsonField[] = [
    { code: 'transactions', required: true, type: 'array', title: 'Транзакции', description: 'Список транзакций (TransactionDetail[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getTransactionsParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'start_date', required: false, type: 'string', title: 'Начало периода', description: 'Начало периода (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец периода', description: 'Конец периода (RFC 3339)' },
    { code: 'direction', required: false, type: 'enum', title: 'Направление', description: 'Фильтр по направлению', enum: ['income', 'expense'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['pending', 'completed', 'failed', 'cancelled'] },
    { code: 'category_id', required: false, type: 'string', title: 'ID категории', description: 'Фильтр по категории' },
    { code: 'employee_id', required: false, type: 'string', title: 'ID сотрудника', description: 'Фильтр по сотруднику' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по комментарию' },
];

export const createTransactionRequestFields: JsonField[] = [
    { code: 'base_amount', required: true, type: 'int', title: 'Сумма', description: 'Сумма транзакции' },
    { code: 'currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'direction', required: true, type: 'enum', title: 'Направление', description: 'Направление', enum: ['income', 'expense'] },
    { code: 'employee_id', required: false, type: 'string', title: 'ID сотрудника', description: 'Идентификатор сотрудника' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к транзакции' },
    { code: 'category_id', required: false, type: 'string', title: 'ID категории', description: 'Идентификатор категории' },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Статус', enum: ['pending', 'completed', 'failed', 'cancelled'] },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const dealTransactionsSummaryFields: JsonField[] = [
    { code: 'total_amount', required: true, type: 'int', title: 'Всего', description: 'Общая сумма всех транзакций' },
    { code: 'income_amount', required: true, type: 'int', title: 'Доходы', description: 'Сумма доходных транзакций' },
    { code: 'expense_amount', required: true, type: 'int', title: 'Расходы', description: 'Сумма расходных транзакций' },
    { code: 'income_count', required: true, type: 'int', title: 'Кол-во доходов', description: 'Количество доходных транзакций' },
    { code: 'expense_count', required: true, type: 'int', title: 'Кол-во расходов', description: 'Количество расходных транзакций' },
    { code: 'total_count', required: true, type: 'int', title: 'Кол-во транзакций', description: 'Общее количество транзакций' },
];

const getTransactions200: string = `{
    "status": true,
    "message": "Transactions retrieved successfully",
    "data": {
        "transactions": [
            {
                "id": "a00e8400-e29b-41d4-a716-446655440100",
                "base_amount": 10000,
                "currency": "RUB",
                "direction": "income",
                "status": "completed",
                "comment": "Оплата по сделке",
                "reverse_to": null,
                "created_at": "2026-06-14T12:00:00Z",
                "metadata": null,
                "employee_id": "a00e8400-e29b-41d4-a716-446655440150",
                "employee_first_name": "Иван",
                "employee_last_name": "Петров",
                "category_id": "b00e8400-e29b-41d4-a716-446655440050",
                "category_name": "Продажи"
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
        "path": "/api/v1/companies/.../modules/dm/deals/.../transactions",
        "method": "GET"
    }
}`;

const createTransaction201: string = `{
    "status": true,
    "message": "Transaction created successfully",
    "data": {
        "id": "a00e8400-e29b-41d4-a716-446655440101",
        "base_amount": 5000,
        "currency": "RUB",
        "direction": "expense",
        "status": "pending",
        "comment": "Закупка материалов",
        "reverse_to": null,
        "created_at": "2026-06-14T12:05:00Z",
        "metadata": null,
        "employee_id": null,
        "employee_first_name": null,
        "employee_last_name": null,
        "category_id": null,
        "category_name": null
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/deals/.../transactions",
        "method": "POST"
    }
}`;

const getSummary200: string = `{
    "status": true,
    "message": "Transactions summary retrieved successfully",
    "data": {
        "total_amount": 150000,
        "income_amount": 100000,
        "expense_amount": 50000,
        "income_count": 5,
        "expense_count": 3,
        "total_count": 8
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/dm/deals/.../transactions/summary",
        "method": "GET"
    }
}`;

export const getTransactionsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getTransactions200} />
        </>
    }
];

export const createTransactionResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createTransaction201} />
        </>
    }
];

export const getSummaryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getSummary200} />
        </>
    }
];