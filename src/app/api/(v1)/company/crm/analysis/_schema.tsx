import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const getAnalysisParamsFields: JsonField[] = [
    { code: 'start_date', required: false, type: 'string', title: 'Начало периода', description: 'Начало периода (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец периода', description: 'Конец периода (RFC 3339)' },
    { code: 'group_by', required: false, type: 'enum', title: 'Группировка', description: 'Тип группировки', enum: ['source', 'day', 'month'] },
];

export const clientsSummaryFields: JsonField[] = [
    { code: 'total_clients', required: true, type: 'int', title: 'Всего клиентов', description: 'Общее количество клиентов' },
    { code: 'active_clients', required: true, type: 'int', title: 'Активных', description: 'Количество активных клиентов' },
    { code: 'inactive_clients', required: true, type: 'int', title: 'Неактивных', description: 'Количество неактивных клиентов' },
    { code: 'individual_clients', required: true, type: 'int', title: 'Физлиц', description: 'Количество физических лиц' },
    { code: 'legal_clients', required: true, type: 'int', title: 'Юрлиц', description: 'Количество юридических лиц' },
    { code: 'new_clients', required: true, type: 'int', title: 'Новых', description: 'Количество новых клиентов за период' },
];

export const groupedClientsStatsFields: JsonField[] = [
    { code: 'group_key', required: true, type: 'string', title: 'Ключ группы', description: 'Идентификатор группы (source_id или дата)' },
    { code: 'group_name', required: true, type: 'string', title: 'Название группы', description: 'Название источника или отформатированная дата' },
    { code: 'clients_count', required: true, type: 'int', title: 'Количество клиентов', description: 'Количество клиентов в группе' },
];

const summary200: string = `{
    "status": true,
    "message": "Clients summary retrieved successfully",
    "data": {
        "total_clients": 150,
        "active_clients": 120,
        "inactive_clients": 30,
        "individual_clients": 100,
        "legal_clients": 50,
        "new_clients": 25
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/analysis/summary",
        "method": "GET"
    }
}`;

const grouped200: string = `{
    "status": true,
    "message": "Grouped clients analysis retrieved successfully",
    "data": [
        {
            "group_key": "c00e8400-e29b-41d4-a716-446655440080",
            "group_name": "Яндекс.Директ",
            "clients_count": 45
        },
        {
            "group_key": "c00e8400-e29b-41d4-a716-446655440081",
            "group_name": "Instagram",
            "clients_count": 30
        },
        {
            "group_key": "c00e8400-e29b-41d4-a716-446655440082",
            "group_name": "Сарафанное радио",
            "clients_count": 75
        }
    ],
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/analysis/grouped",
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