// _schema.tsx для прогнозирования

import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const forecastQueryParamsFields: JsonField[] = [
    { code: 'start_date', required: false, type: 'string', title: 'Начало', description: 'Начальная дата анализа (RFC 3339, по умолчанию — первая операция)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец', description: 'Конечная дата анализа (RFC 3339, по умолчанию — сейчас)' },
    { code: 'horizon', required: false, type: 'int', title: 'Горизонт', description: 'На сколько дней вперёд строить прогноз (по умолчанию 30)' },
];

export const forecastDataPointFields: JsonField[] = [
    { code: 'date', required: true, type: 'string', title: 'Дата', description: 'Дата точки (YYYY-MM-DD)' },
    { code: 'balance', required: true, type: 'int', title: 'Баланс', description: 'Баланс на эту дату' },
    { code: 'is_actual', required: true, type: 'boolean', title: 'Факт', description: 'true — исторические данные, false — прогноз' },
];

export const forecastTimelineResponseFields: JsonField[] = [
    { code: 'method', required: true, type: 'enum', title: 'Метод', description: 'Метод прогнозирования', enum: ['theta'] },
    { code: 'points', required: true, type: 'array', title: 'Точки', description: 'Массив точек графика (DataPoint[])' },
    { code: 'horizon', required: true, type: 'int', title: 'Горизонт', description: 'Горизонт прогноза в днях' },
    { code: 'data_points', required: true, type: 'int', title: 'Точек анализа', description: 'Количество исторических точек' },
    { code: 'confidence', required: true, type: 'enum', title: 'Уверенность', description: 'Уровень уверенности в прогнозе', enum: ['low', 'medium', 'high'] },
];

export const forecastSummaryResponseFields: JsonField[] = [
    { code: 'method', required: true, type: 'enum', title: 'Метод', description: 'Метод прогнозирования', enum: ['theta'] },
    { code: 'horizon', required: true, type: 'int', title: 'Горизонт', description: 'Горизонт прогноза в днях' },
    { code: 'data_points', required: true, type: 'int', title: 'Точек анализа', description: 'Количество исторических точек' },
    { code: 'confidence', required: true, type: 'enum', title: 'Уверенность', description: 'Уровень уверенности', enum: ['low', 'medium', 'high'] },
    { code: 'predicted_balance', required: true, type: 'int', title: 'Прогноз баланса', description: 'Баланс на конец периода прогноза' },
    { code: 'predicted_income', required: true, type: 'int', title: 'Доходы', description: 'Прогнозируемые доходы' },
    { code: 'predicted_expense', required: true, type: 'int', title: 'Расходы', description: 'Прогнозируемые расходы' },
    { code: 'predicted_net_flow', required: true, type: 'int', title: 'Чистый поток', description: 'Разница между доходами и расходами' },
    { code: 'predicted_tx_count', required: true, type: 'int', title: 'Операций', description: 'Прогноз количества операций' },
    { code: 'current_balance', required: true, type: 'int', title: 'Текущий баланс', description: 'Баланс на сейчас для сравнения' },
    { code: 'current_income', required: true, type: 'int', title: 'Текущие доходы', description: 'Доходы на сейчас' },
    { code: 'current_expense', required: true, type: 'int', title: 'Текущие расходы', description: 'Расходы на сейчас' },
    { code: 'current_tx_count', required: true, type: 'int', title: 'Текущих операций', description: 'Количество операций на сейчас' },
];

const timeline200: string = `{
    "status": true,
    "message": "Forecast generated successfully",
    "data": {
        "method": "theta",
        "points": [
            { "date": "2026-06-10", "balance": 45000.00, "is_actual": true },
            { "date": "2026-06-11", "balance": 52000.00, "is_actual": true },
            { "date": "2026-06-12", "balance": 48500.00, "is_actual": true },
            { "date": "2026-06-13", "balance": 51000.00, "is_actual": true },
            { "date": "2026-06-14", "balance": 52300.00, "is_actual": false },
            { "date": "2026-06-15", "balance": 53600.00, "is_actual": false }
        ],
        "horizon": 30,
        "data_points": 90,
        "confidence": "high"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/forecast/timeline",
        "method": "GET"
    }
}`;

const summary200: string = `{
    "status": true,
    "message": "Forecast summary generated successfully",
    "data": {
        "method": "theta",
        "horizon": 30,
        "data_points": 90,
        "confidence": "high",
        "predicted_balance": 72000.00,
        "predicted_income": 35000.00,
        "predicted_expense": 15000.00,
        "predicted_net_flow": 20000.00,
        "predicted_tx_count": 45,
        "current_balance": 51000.00,
        "current_income": 28500.00,
        "current_expense": 12000.00,
        "current_tx_count": 12
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/forecast/summary",
        "method": "GET"
    }
}`;

export const timelineResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={timeline200} />
        </>
    }
];

export const summaryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={summary200} />
        </>
    }
];