import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";
import { transactionDetailFields } from "../transactions/_schema";

export { transactionDetailFields };

export const creditFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор кредита' },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название кредита' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип', enum: ['debt', 'credit'] },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус', enum: ['active', 'closed'] },
    { code: 'total_amount', required: true, type: 'int', title: 'Сумма', description: 'Общая сумма кредита' },
    { code: 'currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'interest_rate', required: true, type: 'int', title: 'Ставка', description: 'Процентная ставка' },
    { code: 'start_date', required: true, type: 'string', title: 'Начало', description: 'Дата начала (RFC 3339)' },
    { code: 'end_date', required: true, type: 'string', title: 'Окончание', description: 'Дата окончания (RFC 3339)' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const creditDetailFields: JsonField[] = [
    ...creditFields,
    { code: 'counterparty', required: true, type: 'array', title: 'Контрагент', description: 'Контрагент по кредиту' },
];

export const creditsDataFields: JsonField[] = [
    { code: 'credits', required: true, type: 'array', title: 'Кредиты', description: 'Список кредитов (CreditDetail[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const creditPaymentsResponseFields: JsonField[] = [
    { code: 'transactions', required: true, type: 'array', title: 'Транзакции', description: 'Список транзакций (TransactionDetail[])' },
    { code: 'pagination', required: true, type: 'array' },
];

export const getCreditsParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20)' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Фильтр по типу', enum: ['debt', 'credit'] },
    { code: 'status', required: false, type: 'enum', title: 'Статус', description: 'Фильтр по статусу', enum: ['active', 'closed'] },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по названию' },
];

export const createCreditRequestFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Название кредита' },
    { code: 'type', required: true, type: 'enum', title: 'Тип', description: 'Тип', enum: ['debt', 'credit'] },
    { code: 'total_amount', required: true, type: 'int', title: 'Сумма', description: 'Общая сумма кредита' },
    { code: 'currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'interest_rate', required: true, type: 'int', title: 'Ставка', description: 'Процентная ставка' },
    { code: 'start_date', required: true, type: 'string', title: 'Начало', description: 'Дата начала (RFC 3339)' },
    { code: 'end_date', required: true, type: 'string', title: 'Окончание', description: 'Дата окончания (RFC 3339)' },
    { code: 'counterparty_id', required: true, type: 'string', title: 'ID контрагента', description: 'Идентификатор контрагента' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const updateCreditRequestFields: JsonField[] = [
    { code: 'name', required: false, type: 'string', title: 'Название', description: 'Название кредита' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
    { code: 'type', required: false, type: 'enum', title: 'Тип', description: 'Тип', enum: ['debt', 'credit'] },
    { code: 'total_amount', required: false, type: 'int', title: 'Сумма', description: 'Общая сумма кредита' },
    { code: 'currency', required: false, type: 'enum', title: 'Валюта', description: 'Валюта', enum: ['RUB'] },
    { code: 'interest_rate', required: false, type: 'int', title: 'Ставка', description: 'Процентная ставка' },
    { code: 'start_date', required: false, type: 'string', title: 'Начало', description: 'Дата начала (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Окончание', description: 'Дата окончания (RFC 3339)' },
    { code: 'counterparty_id', required: false, type: 'string', title: 'ID контрагента', description: 'Идентификатор контрагента' },
    { code: 'metadata', required: false, type: 'array', title: 'Метаданные', description: 'Дополнительные данные' },
];

export const payCreditRequestFields: JsonField[] = [
    { code: 'employee_id', required: true, type: 'string', title: 'ID сотрудника', description: 'Идентификатор сотрудника' },
    { code: 'amount', required: true, type: 'int', title: 'Сумма', description: 'Сумма платежа' },
    { code: 'paid_at', required: true, type: 'string', title: 'Дата платежа', description: 'Дата платежа (RFC 3339)' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий' },
];

const getCredits200: string = `{
    "status": true,
    "message": "Credits retrieved successfully",
    "data": {
        "credits": [
            {
                "id": "d00e8400-e29b-41d4-a716-446655440070",
                "name": "Кредит в банке",
                "comment": "На развитие бизнеса",
                "type": "credit",
                "status": "active",
                "total_amount": 1000000,
                "currency": "RUB",
                "interest_rate": 15,
                "start_date": "2026-01-01T00:00:00Z",
                "end_date": "2027-01-01T00:00:00Z",
                "metadata": null,
                "created_at": "2026-06-14T12:00:00Z",
                "updated_at": "2026-06-14T12:00:00Z",
                "counterparty": {
                    "id": "c00e8400-e29b-41d4-a716-446655440060",
                    "name": "ООО Ромашка",
                    "type": "organization",
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
        "path": "/api/v1/companies/.../modules/fm/credits",
        "method": "GET"
    }
}`;

const getCredit200: string = `{
    "status": true,
    "message": "Credit retrieved successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440070",
        "name": "Кредит в банке",
        "comment": "На развитие бизнеса",
        "type": "credit",
        "status": "active",
        "total_amount": 1000000,
        "currency": "RUB",
        "interest_rate": 15,
        "start_date": "2026-01-01T00:00:00Z",
        "end_date": "2027-01-01T00:00:00Z",
        "metadata": null,
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z",
        "counterparty": {
            "id": "c00e8400-e29b-41d4-a716-446655440060",
            "name": "ООО Ромашка",
            "comment": "Поставщик",
            "type": "organization",
            "status": "active",
            "metadata": null,
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/credits/...",
        "method": "GET"
    }
}`;

const createCredit201: string = `{
    "status": true,
    "message": "Credit created successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440071",
        "name": "Заём от учредителя",
        "comment": null,
        "type": "debt",
        "status": "active",
        "total_amount": 500000,
        "currency": "RUB",
        "interest_rate": 0,
        "start_date": "2026-06-14T00:00:00Z",
        "end_date": "2026-12-14T00:00:00Z",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:05:00Z",
        "counterparty": {
            "id": "c00e8400-e29b-41d4-a716-446655440061",
            "name": "ИП Иванов",
            "type": "person",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/credits",
        "method": "POST"
    }
}`;

const updateCredit200: string = `{
    "status": true,
    "message": "Credit updated successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440071",
        "name": "Заём от учредителя (обновлено)",
        "comment": "Беспроцентный заём",
        "type": "debt",
        "status": "active",
        "total_amount": 500000,
        "currency": "RUB",
        "interest_rate": 0,
        "start_date": "2026-06-14T00:00:00Z",
        "end_date": "2026-12-14T00:00:00Z",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:10:00Z",
        "counterparty": {
            "id": "c00e8400-e29b-41d4-a716-446655440061",
            "name": "ИП Иванов",
            "type": "person",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:10:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/credits/...",
        "method": "PATCH"
    }
}`;

const deactivateCredit200: string = `{
    "status": true,
    "message": "Credit deactivated successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440071",
        "name": "Заём от учредителя (обновлено)",
        "comment": "Беспроцентный заём",
        "type": "debt",
        "status": "closed",
        "total_amount": 500000,
        "currency": "RUB",
        "interest_rate": 0,
        "start_date": "2026-06-14T00:00:00Z",
        "end_date": "2026-12-14T00:00:00Z",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:15:00Z",
        "counterparty": {
            "id": "c00e8400-e29b-41d4-a716-446655440061",
            "name": "ИП Иванов",
            "type": "person",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:15:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/credits/.../deactivate",
        "method": "POST"
    }
}`;

const activateCredit200: string = `{
    "status": true,
    "message": "Credit activated successfully",
    "data": {
        "id": "d00e8400-e29b-41d4-a716-446655440071",
        "name": "Заём от учредителя (обновлено)",
        "comment": "Беспроцентный заём",
        "type": "debt",
        "status": "active",
        "total_amount": 500000,
        "currency": "RUB",
        "interest_rate": 0,
        "start_date": "2026-06-14T00:00:00Z",
        "end_date": "2026-12-14T00:00:00Z",
        "metadata": null,
        "created_at": "2026-06-14T12:05:00Z",
        "updated_at": "2026-06-14T12:20:00Z",
        "counterparty": {
            "id": "c00e8400-e29b-41d4-a716-446655440061",
            "name": "ИП Иванов",
            "type": "person",
            "status": "active"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:20:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/credits/.../activate",
        "method": "POST"
    }
}`;

const payCredit200: string = `{
    "status": true,
    "message": "Credit payment created successfully",
    "data": {
        "id": "a00e8400-e29b-41d4-a716-446655440103",
        "base_amount": 100000,
        "currency": "RUB",
        "direction": "expense",
        "status": "completed",
        "comment": "Платёж по кредиту d00e8400-e29b-41d4-a716-446655440071",
        "reverse_to": null,
        "created_at": "2026-06-14T12:25:00Z",
        "metadata": null,
        "employee_id": "a00e8400-e29b-41d4-a716-446655440150",
        "employee_first_name": "Иван",
        "employee_last_name": "Петров",
        "category_id": "b00e8400-e29b-41d4-a716-446655440051",
        "category_name": "Кредиты"
    },
    "meta": {
        "timestamp": "2026-06-14T12:25:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/credits/.../pay",
        "method": "POST"
    }
}`;

const getCreditTransactions200: string = `{
    "status": true,
    "message": "Credit transactions retrieved successfully",
    "data": {
        "transactions": [
            {
                "id": "a00e8400-e29b-41d4-a716-446655440103",
                "base_amount": 100000,
                "currency": "RUB",
                "direction": "expense",
                "status": "completed",
                "comment": "Платёж по кредиту d00e8400-e29b-41d4-a716-446655440071",
                "reverse_to": null,
                "created_at": "2026-06-14T12:25:00Z",
                "metadata": null,
                "employee_id": "a00e8400-e29b-41d4-a716-446655440150",
                "employee_first_name": "Иван",
                "employee_last_name": "Петров",
                "category_id": "b00e8400-e29b-41d4-a716-446655440051",
                "category_name": "Кредиты"
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
        "timestamp": "2026-06-14T12:30:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/credits/.../transactions",
        "method": "GET"
    }
}`;

export const getCreditsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCredits200} />
        </>
    }
];

export const getCreditResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCredit200} />
        </>
    }
];

export const createCreditResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createCredit201} />
        </>
    }
];

export const updateCreditResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateCredit200} />
        </>
    }
];

export const deactivateCreditResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={deactivateCredit200} />
        </>
    }
];

export const activateCreditResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={activateCredit200} />
        </>
    }
];

export const payCreditResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={payCredit200} />
        </>
    }
];

export const getCreditTransactionsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getCreditTransactions200} />
        </>
    }
];