import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const employeesSummaryFields: JsonField[] = [
    { code: 'total_positions', required: true, type: 'int', title: 'Должностей', description: 'Общее количество должностей' },
    { code: 'total_employees', required: true, type: 'int', title: 'Сотрудников', description: 'Общее количество сотрудников' },
    { code: 'active_employees', required: true, type: 'int', title: 'Активных', description: 'Количество активных сотрудников' },
    { code: 'inactive_employees', required: true, type: 'int', title: 'Неактивных', description: 'Количество неактивных сотрудников' },
    { code: 'new_employees', required: true, type: 'int', title: 'Новых', description: 'Новых сотрудников за выбранный период' },
];

export const groupedStatsFields: JsonField[] = [
    { code: 'group_key', required: true, type: 'string', title: 'Ключ', description: 'Ключ группировки (дата, месяц)' },
    { code: 'group_name', required: true, type: 'string', title: 'Название', description: 'Отображаемое название группы' },
    { code: 'employees_count', required: true, type: 'int', title: 'Сотрудников', description: 'Общее количество сотрудников' },
    { code: 'active_count', required: true, type: 'int', title: 'Активных', description: 'Количество активных сотрудников' },
    { code: 'inactive_count', required: true, type: 'int', title: 'Неактивных', description: 'Количество неактивных сотрудников' },
];

export const analysisQueryParamsFields: JsonField[] = [
    { code: 'start_date', required: false, type: 'string', title: 'Начало', description: 'Начальная дата (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец', description: 'Конечная дата (RFC 3339)' },
];

export const groupedAnalysisQueryParamsFields: JsonField[] = [
    { code: 'start_date', required: false, type: 'string', title: 'Начало', description: 'Начальная дата (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец', description: 'Конечная дата (RFC 3339)' },
    { code: 'group_by', required: true, type: 'enum', title: 'Группировка', description: 'Тип группировки', enum: ['day', 'month', 'year'] },
];

const analysisSummary200: string = `{
    "status": true,
    "message": "Analysis summary retrieved successfully",
    "data": {
        "total_positions": 5,
        "total_employees": 15,
        "active_employees": 12,
        "inactive_employees": 3,
        "new_employees": 2
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/analysis/summary",
        "method": "GET"
    }
}`;

const analysisGrouped200: string = `{
    "status": true,
    "message": "Grouped analysis retrieved successfully",
    "data": [
        {
            "group_key": "2026-06",
            "group_name": "Июнь 2026",
            "employees_count": 15,
            "active_count": 12,
            "inactive_count": 3
        },
        {
            "group_key": "2026-05",
            "group_name": "Май 2026",
            "employees_count": 13,
            "active_count": 10,
            "inactive_count": 3
        }
    ],
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/analysis/grouped",
        "method": "GET"
    }
}`;

export const analysisSummaryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={analysisSummary200} />
        </>
    }
];

export const analysisGroupedResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={analysisGrouped200} />
        </>
    }
];