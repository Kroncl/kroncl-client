import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const databaseStorageStatusFields: JsonField[] = [
    { code: 'is_ready', required: true, type: 'boolean', title: 'Готово', description: 'Готово ли хранилище БД к использованию' },
    { code: 'status', required: true, type: 'string', title: 'Статус', description: 'Текущий статус развёртывания' },
    { code: 'message', required: true, type: 'string', title: 'Сообщение', description: 'Описание текущего состояния' },
    { code: 'schema_name', required: true, type: 'string', title: 'Схема', description: 'Имя схемы PostgreSQL для организации' },
    { code: 'schema_exists', required: true, type: 'boolean', title: 'Схема существует', description: 'Существует ли схема в БД' },
];

export const mediaBucketStatusFields: JsonField[] = [
    { code: 'is_ready', required: true, type: 'boolean', title: 'Готово', description: 'Готово ли файловое хранилище к использованию' },
    { code: 'message', required: true, type: 'string', title: 'Сообщение', description: 'Описание текущего состояния' },
    { code: 'exists', required: true, type: 'boolean', title: 'Существует', description: 'Существует ли бакет в объектном хранилище' },
];

export const storageSummaryFields: JsonField[] = [
    { code: 'database', required: true, type: 'string', title: 'База данных', description: 'Статус хранилища БД' },
    { code: 'media', required: true, type: 'string', title: 'Файлы', description: 'Статус объектного хранилища' },
];

const storageSummary200: string = `{
    "status": true,
    "message": "Storage summary retrieved successfully",
    "data": {
        "database": {
            "is_ready": true,
            "status": "active",
            "message": "Schema is ready",
            "schema_name": "company_660e8400",
            "schema_exists": true
        },
        "media": {
            "is_ready": true,
            "message": "Bucket is ready",
            "exists": true
        }
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../storage",
        "method": "GET"
    }
}`;

export const storageSummaryResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={storageSummary200} />
        </>
    },
    {
        code: 403,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Forbidden",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];