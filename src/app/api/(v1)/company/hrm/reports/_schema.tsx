import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";
import { docFields } from "../../docs/_schema";

export { docFields };

export const generateReportRequestFields: JsonField[] = [
    { code: 'types', required: true, type: 'array', title: 'Типы', description: 'Типы отчётов для генерации (string[]: employees, positions)' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к отчёту' },
];

export const generateReportResponseFields: JsonField[] = [
    { code: 'download_url', required: true, type: 'string', title: 'Ссылка (deprecated)', description: 'Прямая ссылка на скачивание. Устарело — используйте object_path из doc.' },
    { code: 'doc', required: true, type: 'array', title: 'Документ', description: 'Сгенерированный документ (Doc)' },
];

const generateReport200: string = `{
    "status": true,
    "message": "Report generated successfully",
    "data": {
        "download_url": "https://cdn.kroncl.com/reports/hrm-report-2026-06-14.pdf",
        "doc": {
            "id": "ee0e8400-e29b-41d4-a716-446655440130",
            "object_path": "reports/hrm-report-2026-06-14.pdf",
            "module": "hrm",
            "type": "report",
            "comment": "Отчёт по сотрудникам",
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/hrm/report",
        "method": "POST"
    }
}`;

export const generateReportResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={generateReport200} />
        </>
    }
];