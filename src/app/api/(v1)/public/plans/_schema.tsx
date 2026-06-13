// _schema.tsx — добавляем примеры

import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const pricingPlanFields: JsonField[] = [
    { code: 'code', required: true, type: 'string', title: 'Код', description: 'Уникальный код тарифа (например: finansist, titan, stoik)' },
    { code: 'lvl', required: true, type: 'int', title: 'Уровень', description: 'Порядковый номер уровня тарифа' },
    { code: 'price_per_month', required: true, type: 'int', title: 'Цена в месяц', description: 'Стоимость за месяц в рублях' },
    { code: 'price_per_year', required: true, type: 'int', title: 'Цена в год', description: 'Стоимость за год в рублях' },
    { code: 'price_currency', required: true, type: 'enum', title: 'Валюта', description: 'Валюта цены', enum: ['RUB'] },
    { code: 'name', required: true, type: 'string', title: 'Название', description: 'Отображаемое название тарифа' },
    { code: 'description', required: true, type: 'string', title: 'Описание', description: 'Краткое описание тарифа' },
    { code: 'limit_db_mb', required: true, type: 'int', title: 'Лимит БД (МБ)', description: 'Максимальный объём базы данных в мегабайтах' },
    { code: 'limit_objects_mb', required: true, type: 'int', title: 'Лимит файлов (МБ)', description: 'Максимальный объём файлового хранилища в мегабайтах' },
    { code: 'limit_objects_count', required: true, type: 'int', title: 'Лимит файлов (шт.)', description: 'Максимальное количество файлов в хранилище' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата добавления тарифа (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления тарифа (RFC 3339)' },
];

export const pricingPlansDataFields: JsonField[] = [
    { code: 'plans', required: true, type: 'array', title: 'Тарифы', description: 'Список тарифных планов (PricingPlan[])' },
    { code: 'pagination', required: true, type: 'array'},
];

const plansList200: string = `{
    "status": true,
    "message": "Pricing plans retrieved successfully",
    "data": {
        "plans": [
            {
                "code": "stoic",
                "lvl": 1,
                "name": "Стоик",
                "description": "Полный функционал: финансы, персонал, клиенты, каталог, склад, сделки.",
                "price_per_month": 4800,
                "price_per_year": 51840,
                "price_currency": "RUB",
                "limit_db_mb": 300,
                "limit_objects_mb": 700,
                "limit_objects_count": 5000,
                "created_at": "2026-04-24T00:17:05.329482Z",
                "updated_at": "2026-05-24T15:28:33.953552Z"
            },
            {
                "code": "titan",
                "lvl": 2,
                "name": "Титан",
                "description": "Клиентская база + каталог и склад.",
                "price_per_month": 2600,
                "price_per_year": 28080,
                "price_currency": "RUB",
                "limit_db_mb": 200,
                "limit_objects_mb": 500,
                "limit_objects_count": 2000,
                "created_at": "2026-04-24T00:17:05.329482Z",
                "updated_at": "2026-05-24T15:27:58.214746Z"
            }
        ],
        "pagination": {
            "total": 2,
            "page": 1,
            "limit": 20,
            "pages": 1
        }
    },
    "meta": {
        "timestamp": "2026-06-13T19:55:25Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-007574",
        "path": "/api/v1/plans",
        "method": "GET"
    }
}`;

const planByCode200: string = `{
    "status": true,
    "message": "Pricing plan retrieved successfully",
    "data": {
        "code": "titan",
        "lvl": 2,
        "name": "Титан",
        "description": "Клиентская база + каталог и склад.",
        "price_per_month": 2600,
        "price_per_year": 28080,
        "price_currency": "RUB",
        "limit_db_mb": 200,
        "limit_objects_mb": 500,
        "limit_objects_count": 2000,
        "created_at": "2026-04-24T00:17:05.329482Z",
        "updated_at": "2026-05-24T15:27:58.214746Z"
    },
    "meta": {
        "timestamp": "2026-06-13T19:55:37Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-007576",
        "path": "/api/v1/plans/titan",
        "method": "GET"
    }
}`;

export const plansListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={plansList200} />
        </>
    }
];

export const planByCodeResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={planByCode200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Pricing plan not found",
    "data": null,
    "meta": {
        "timestamp": "2026-06-13T19:55:37Z",
        "request_id": "...",
        "path": "/api/v1/plans/unknown",
        "method": "GET"
    }
}`} />
        </>
    }
];