import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";
import { docFields } from "../../docs/_schema";

export { docFields };

export const fmReportRequestFields: JsonField[] = [
    { code: 'types', required: true, type: 'array', title: 'Типы', description: 'Типы отчётов для генерации (string[]: transactions, categories, counterparties, credits)' },
    { code: 'start_date', required: false, type: 'string', title: 'Начало', description: 'Начальная дата фильтрации (RFC 3339)' },
    { code: 'end_date', required: false, type: 'string', title: 'Конец', description: 'Конечная дата фильтрации (RFC 3339)' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к отчёту' },
];

export const fmReportResponseFields: JsonField[] = [
    { code: 'download_url', required: true, type: 'string', title: 'Ссылка (deprecated)', description: 'Прямая ссылка на скачивание. Устарело — используйте object_path из doc.' },
    { code: 'doc', required: true, type: 'array', title: 'Документ', description: 'Сгенерированный документ (Doc)' },
];

const fmReport200: string = `{
    "status": true,
    "message": "Report generated successfully",
    "data": {
        "download_url": "https://cdn.kroncl.com/reports/fm-report-2026-06-14.pdf",
        "doc": {
            "id": "a10e8400-e29b-41d4-a716-446655440160",
            "object_path": "reports/fm-report-2026-06-14.pdf",
            "module": "fm",
            "type": "report",
            "comment": "Финансовый отчёт за июнь",
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/fm/report",
        "method": "POST"
    }
}`;

export const fmReportResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={fmReport200} />
        </>
    }
];