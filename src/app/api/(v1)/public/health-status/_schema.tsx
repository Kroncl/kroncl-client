import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

// health-check

export const healthCheckSchema: JsonField[] = [
    { code: 'status', required: true, type: 'string', title: 'Статус', description: 'Ok/Error' },
    { code: 'timestamp', required: true, type: 'string', title: 'timestamp', description: 'Метка времени (ISO 8601)' },
];

const checkCode200: string = `{
    "status": true,
    "message": "Success",
    "data": {
        "status": "ok",
        "timestamp": "2026-06-13T19:18:34Z"
    },
    "meta": {
        "timestamp": "2026-06-13T19:18:34Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-007347",
        "path": "/api/v1/health",
        "method": "GET"
    }
}`;

export const healthCheckResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={checkCode200} />
        </>
    },
    {
        code: 500,
        children: <>
            <MDXCodeBlock code={`// пустой ответ - внутренняя ошибка платформы`} />
        </>
    }
];

// status

// status

export const incidentFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор инцидента' },
    { code: 'title', required: true, type: 'string', title: 'Заголовок', description: 'Краткое название инцидента' },
    { code: 'description', required: true, type: 'string', title: 'Описание', description: 'Детальное описание проблемы' },
    { code: 'metrics_type', required: true, type: 'enum', title: 'Тип метрики', description: 'Компонент, затронутый инцидентом', enum: ['server', 'db', 'media'] },
    { code: 'severity', required: true, type: 'enum', title: 'Критичность', description: 'Уровень критичности', enum: ['minor', 'major'] },
    { code: 'start_time', required: true, type: 'string', title: 'Начало', description: 'Время начала инцидента (RFC 3339)' },
    { code: 'end_time', required: false, type: 'string', title: 'Конец', description: 'Время окончания, если инцидент завершён (RFC 3339)' },
];

export const dailyStatusFields: JsonField[] = [
    { code: 'date', required: true, type: 'string', title: 'Дата', description: 'День в формате YYYY-MM-DD' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Статус за день', enum: ['operational', 'degraded', 'partial_outage', 'major_outage'] },
    { code: 'incidents', required: false, type: 'array', title: 'Инциденты', description: 'Список инцидентов за день (Incident[])' },
];

export const statusDataFields: JsonField[] = [
    { code: 'current_status', required: true, type: 'enum', title: 'Текущий статус', description: 'Общий статус платформы на сейчас', enum: ['operational', 'degraded', 'partial_outage', 'major_outage'] },
    { code: 'active_incidents', required: true, type: 'array', title: 'Активные инциденты', description: 'Список незавершённых инцидентов (Incident[])' },
    { code: 'daily', required: true, type: 'array', title: 'История по дням', description: 'Общая история статусов за 7 дней (DailyStatus[])' },
    { code: 'components', required: true, type: 'string', title: 'Компоненты', description: 'История по компонентам: all, server, db, media' },
];

export const billingFields: JsonField[] = [
    { code: 'mode', required: true, type: 'enum', title: 'Режим биллинга', description: 'Текущий режим: on или off', enum: ['on', 'off'] },
];

const statusCode200: string = `{
    "status": true,
    "message": "System status retrieved",
    "data": {
        "current_status": "partial_outage",
        "active_incidents": [
            {
                "id": "server-p95-1781308779",
                "title": "Высокое время ответа API",
                "description": "P95 время ответа достигло 1351 мс",
                "metrics_type": "server",
                "severity": "major",
                "start_time": "2026-06-12T23:59:39.002464Z"
            }
        ],
        "daily": [
            {
                "date": "2026-06-13",
                "status": "partial_outage",
                "incidents": []
            }
        ],
        "components": {
            "all": [],
            "server": [],
            "db": [],
            "media": []
        }
    },
    "meta": {
        "timestamp": "2026-06-13T19:26:15Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-007394",
        "path": "/api/v1/status",
        "method": "GET"
    }
}`;

const billingCode200: string = `{
    "status": true,
    "message": "Billing mode retrieved",
    "data": {
        "mode": "on"
    },
    "meta": {
        "timestamp": "2026-06-13T19:26:15Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-007395",
        "path": "/api/v1/status/billing",
        "method": "GET"
    }
}`;

export const statusResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={statusCode200} />
        </>
    },
    {
        code: 500,
        children: <>
            <MDXCodeBlock code={`// пустой ответ — внутренняя ошибка платформы`} language='text' />
        </>
    }
];

export const billingResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={billingCode200} />
        </>
    }
];

// billing-status

