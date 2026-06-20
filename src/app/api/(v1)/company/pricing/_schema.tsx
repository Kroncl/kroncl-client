import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const companyPricingPlanFields: JsonField[] = [
    { code: 'is_trial', required: true, type: 'boolean', title: 'Пробный', description: 'Активен ли тестовый период' },
    { code: 'expires_at', required: true, type: 'string', title: 'Истекает', description: 'Дата окончания текущего периода (RFC 3339)' },
    { code: 'days_left', required: true, type: 'int', title: 'Осталось дней', description: 'Количество дней до окончания' },
    { code: 'days_total', required: true, type: 'int', title: 'Всего дней', description: 'Общая длительность периода' },
    { code: 'current_plan', required: true, type: 'array', title: 'Текущий тариф', description: 'Текущий тарифный план (PricingPlan)' },
    { code: 'next_plan', required: false, type: 'array', title: 'Следующий тариф', description: 'Следующий тарифный план, если задан (PricingPlan)' },
];

export const migratePlanRequestFields: JsonField[] = [
    { code: 'plan_code', required: true, type: 'string', title: 'Код тарифа', description: 'Код нового тарифного плана (financier, titan, stoic)' },
    { code: 'period', required: true, type: 'enum', title: 'Период', description: 'Период оплаты', enum: ['month', 'year'] },
    { code: 'success_url', required: false, type: 'string', title: 'URL успеха', description: 'URL для редиректа после успешной оплаты' },
];

export const initPaymentResponseFields: JsonField[] = [
    { code: 'transaction', required: true, type: 'array', title: 'Транзакция', description: 'Созданная транзакция (PricingTransaction)' },
    { code: 'payment_page_url', required: true, type: 'string', title: 'Ссылка на оплату', description: 'Ссылка на страницу оплаты Т-Банка' },
    { code: 'payment_id', required: true, type: 'string', title: 'ID платежа', description: 'Идентификатор платежа в Т-Банке' },
];

export const pricingTransactionFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор транзакции' },
    { code: 'company_id', required: true, type: 'string', title: 'ID компании', description: 'Идентификатор организации' },
    { code: 'account_id', required: true, type: 'string', title: 'ID аккаунта', description: 'Идентификатор инициатора' },
    { code: 'amount', required: false, type: 'int', title: 'Сумма', description: 'Сумма в рублях (null для trial)' },
    { code: 'currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта платежа', enum: ['RUB'] },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус транзакции', enum: ['success', 'pending', 'unsuccess', 'revoked'] },
    { code: 'plan_code', required: false, type: 'string', title: 'Тариф', description: 'Код оплаченного тарифа' },
    { code: 'is_trial', required: true, type: 'boolean', title: 'Пробный', description: 'Относится ли к тестовому периоду' },
    { code: 'next_plan_code', required: false, type: 'string', title: 'Следующий тариф', description: 'Код следующего тарифа (для запланированного перехода)' },
    { code: 'expires_at', required: true, type: 'string', title: 'Истекает', description: 'Дата окончания периода (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлена', description: 'Дата обновления (RFC 3339)' },
];

export const pricingTransactionsDataFields: JsonField[] = [
    { code: 'transactions', required: true, type: 'array', title: 'Транзакции', description: 'Список транзакций (PricingTransaction[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const currentPlan200: string = `{
    "status": true,
    "message": "Company pricing plan retrieved successfully",
    "data": {
        "is_trial": true,
        "expires_at": "2026-07-14T00:00:00Z",
        "days_left": 30,
        "days_total": 90,
        "current_plan": {
            "code": "stoic",
            "name": "Стоик",
            "lvl": 1,
            "price_per_month": 4800,
            "price_per_year": 51840,
            "price_currency": "RUB",
            "description": "Полный функционал.",
            "limit_db_mb": 300,
            "limit_objects_mb": 700,
            "limit_objects_count": 5000,
            "created_at": "2026-04-24T00:17:05Z",
            "updated_at": "2026-05-24T15:28:33Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../pricing",
        "method": "GET"
    }
}`;

const migratePlan200: string = `{
    "status": true,
    "message": "Payment initiated successfully",
    "data": {
        "transaction": {
            "id": "880e8400-e29b-41d4-a716-446655440070",
            "company_id": "660e8400-e29b-41d4-a716-446655440020",
            "account_id": "550e8400-e29b-41d4-a716-446655440001",
            "amount": 4800,
            "currency": "RUB",
            "status": "pending",
            "plan_code": "stoic",
            "is_trial": false,
            "next_plan_code": null,
            "expires_at": "2026-07-14T00:00:00Z",
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        },
        "payment_page_url": "https://securepay.tinkoff.ru/pay/xxx",
        "payment_id": "1234567890"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../pricing/migrate",
        "method": "POST"
    }
}`;

const transactionsList200: string = `{
    "status": true,
    "message": "Pricing transactions retrieved successfully",
    "data": {
        "transactions": [
            {
                "id": "880e8400-e29b-41d4-a716-446655440070",
                "company_id": "660e8400-e29b-41d4-a716-446655440020",
                "account_id": "550e8400-e29b-41d4-a716-446655440001",
                "amount": 4800,
                "currency": "RUB",
                "status": "success",
                "plan_code": "stoic",
                "is_trial": false,
                "next_plan_code": null,
                "expires_at": "2026-07-14T00:00:00Z",
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
        "path": "/api/v1/companies/.../pricing/transactions",
        "method": "GET"
    }
}`;

const revokeTransaction200: string = `{
    "status": true,
    "message": "Transaction revoked successfully",
    "data": {},
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../pricing/transactions/.../revoke",
        "method": "POST"
    }
}`;

export const currentPlanResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={currentPlan200} />
        </>
    }
];

export const migratePlanResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={migratePlan200} />
        </>
    },
    {
        code: 400,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Invalid plan code",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const transactionsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={transactionsList200} />
        </>
    }
];

export const revokeTransactionResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={revokeTransaction200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Transaction not found",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];