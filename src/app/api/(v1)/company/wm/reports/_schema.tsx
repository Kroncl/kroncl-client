import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";
import { docFields } from "../../docs/_schema";

export { docFields };

export const wmReportRequestFields: JsonField[] = [
    { code: 'types', required: true, type: 'array', title: 'Типы', description: 'Типы отчётов для генерации (string[]: catalog_categories, catalog_units, stock_balance, stock_batches, stock_positions)' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий к отчёту' },
];

export const wmReportResponseFields: JsonField[] = [
    { code: 'download_url', required: true, type: 'string', title: 'Ссылка (deprecated)', description: 'Прямая ссылка на скачивание. Устарело — используйте object_path из doc.' },
    { code: 'doc', required: true, type: 'array', title: 'Документ', description: 'Сгенерированный документ (Doc)' },
];

const wmReport200: string = `{
    "status": true,
    "message": "Report generated successfully",
    "data": {
        "download_url": "https://cdn.kroncl.com/reports/wm-report-2026-06-14.pdf",
        "doc": {
            "id": "a30e8400-e29b-41d4-a716-446655440180",
            "object_path": "reports/wm-report-2026-06-14.pdf",
            "module": "wm",
            "type": "report",
            "comment": "Складской отчёт за июнь",
            "created_at": "2026-06-14T12:00:00Z",
            "updated_at": "2026-06-14T12:00:00Z"
        }
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/wm/report",
        "method": "POST"
    }
}`;

export const wmReportResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={wmReport200} />
        </>
    }
];