import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";
import { docFields } from "../../docs/_schema";

export { docFields };

export const crmReportRequestFields: JsonField[] = [
    { code: 'types', required: true, type: 'array', title: 'Типы', description: 'Типы отчётов для генерации (string[]: clients, sources)' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к отчёту' },
];

export const crmReportResponseFields: JsonField[] = [
    { code: 'download_url', required: true, type: 'string', title: 'Ссылка (deprecated)', description: 'Прямая ссылка на скачивание. Устарело — используйте object_path из doc.' },
    { code: 'doc', required: true, type: 'array', title: 'Документ', description: 'Сгенерированный документ (Doc)' },
];

const crmReport200: string = `{
    "status": true,
    "message": "Report generated successfully",
    "data": {
        "download_url": "https://cdn.kroncl.com/reports/crm-report-2026-06-14.pdf",
        "doc": {
            "id": "a20e8400-e29b-41d4-a716-446655440170",
            "object_path": "reports/crm-report-2026-06-14.pdf",
            "module": "crm",
            "type": "report",
            "comment": "Отчёт по клиентам за июнь",
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/crm/report",
        "method": "POST"
    }
}`;

export const crmReportResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={crmReport200} />
        </>
    }
];