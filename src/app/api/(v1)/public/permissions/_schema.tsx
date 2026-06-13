import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const permissionFields: JsonField[] = [
    { code: 'code', required: true, type: 'string', title: 'Код', description: 'Уникальный код разрешения (например: fm.transactions.create)' },
    { code: 'lvl', required: true, type: 'int', title: 'Уровень', description: 'Минимальный уровень тарифа, на котором разрешение доступно' },
    { code: 'criticality', required: true, type: 'int', title: 'Критичность', description: 'Степень важности операции (1-10)' },
    { code: 'allow_expired', required: true, type: 'boolean', title: 'Просроченный доступ', description: 'Доступно ли разрешение после окончания тарифа' },
];

const permissionsCode200: string = `{
    "status": true,
    "message": "Permissions retrieved successfully",
    "data": [
        {
            "code": "wm.report",
            "lvl": 2,
            "criticality": 7,
            "allow_expired": false
        },
        {
            "code": "fm.transactions.create",
            "lvl": 1,
            "criticality": 8,
            "allow_expired": false
        },
        {
            "code": "fm.analysis",
            "lvl": 1,
            "criticality": 5,
            "allow_expired": true
        }
    ],
    "meta": {
        "timestamp": "2026-06-13T20:00:00Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-007600",
        "path": "/api/v1/permissions",
        "method": "GET"
    }
}`;

export const permissionsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={permissionsCode200} />
        </>
    }
];