import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const databaseStorageFields: JsonField[] = [
    { code: 'schema_name', required: true, type: 'string', title: 'Схема', description: 'Имя схемы PostgreSQL' },
    { code: 'total_size_mb', required: true, type: 'int', title: 'Общий размер (МБ)', description: 'Общий объём данных в мегабайтах' },
    { code: 'total_size_pretty', required: true, type: 'string', title: 'Размер', description: 'Человекочитаемый формат размера' },
    { code: 'table_size_mb', required: true, type: 'int', title: 'Таблицы (МБ)', description: 'Объём таблиц' },
    { code: 'index_size_mb', required: true, type: 'int', title: 'Индексы (МБ)', description: 'Объём индексов' },
    { code: 'table_count', required: true, type: 'int', title: 'Таблиц', description: 'Количество таблиц' },
    { code: 'total_rows', required: true, type: 'int', title: 'Строк', description: 'Общее количество строк' },
    { code: 'active_connections', required: true, type: 'int', title: 'Подключений', description: 'Количество активных подключений' },
    { code: 'schema_exists', required: true, type: 'boolean', title: 'Существует', description: 'Существует ли схема' },
];

export const databaseSourcesFields: JsonField[] = [
    { code: 'schema_name', required: true, type: 'string', title: 'Схема', description: 'Имя схемы PostgreSQL' },
    { code: 'total_size_mb', required: true, type: 'int', title: 'Общий размер (МБ)', description: 'Общий объём данных' },
    { code: 'total_size_pretty', required: true, type: 'string', title: 'Размер', description: 'Человекочитаемый формат размера' },
    { code: 'table_size_mb', required: true, type: 'int', title: 'Таблицы (МБ)', description: 'Объём таблиц' },
    { code: 'index_size_mb', required: true, type: 'int', title: 'Индексы (МБ)', description: 'Объём индексов' },
    { code: 'toast_size_mb', required: true, type: 'int', title: 'TOAST (МБ)', description: 'Объём TOAST-данных' },
    { code: 'table_count', required: true, type: 'int', title: 'Таблиц', description: 'Количество таблиц' },
    { code: 'index_count', required: true, type: 'int', title: 'Индексов', description: 'Количество индексов' },
    { code: 'sequence_count', required: true, type: 'int', title: 'Последовательностей', description: 'Количество sequences' },
    { code: 'view_count', required: true, type: 'int', title: 'Представлений', description: 'Количество views' },
    { code: 'materialized_view_count', required: true, type: 'int', title: 'Материализованных', description: 'Количество materialized views' },
    { code: 'total_rows', required: true, type: 'int', title: 'Строк', description: 'Общее количество строк' },
    { code: 'dead_rows', required: true, type: 'int', title: 'Мёртвых строк', description: 'Количество dead rows' },
    { code: 'active_connections', required: true, type: 'int', title: 'Подключений', description: 'Количество активных подключений' },
    { code: 'last_vacuum', required: false, type: 'string', title: 'Последний vacuum', description: 'Дата последнего vacuum (RFC 3339)' },
    { code: 'last_autovacuum', required: false, type: 'string', title: 'Последний autovacuum', description: 'Дата последнего autovacuum (RFC 3339)' },
    { code: 'last_analyze', required: false, type: 'string', title: 'Последний analyze', description: 'Дата последнего analyze (RFC 3339)' },
    { code: 'schema_exists', required: true, type: 'boolean', title: 'Существует', description: 'Существует ли схема' },
    { code: 'created_at', required: false, type: 'string', title: 'Создана', description: 'Дата создания (RFC 3339)' },
    { code: 'updated_at', required: false, type: 'string', title: 'Обновлена', description: 'Дата обновления (RFC 3339)' },
];

export const moduleStatsFields: JsonField[] = [
    { code: 'module', required: true, type: 'string', title: 'Модуль', description: 'Название модуля (fm, crm, hrm, wm, dm)' },
    { code: 'row_count', required: true, type: 'int', title: 'Строк', description: 'Количество строк в таблицах модуля' },
    { code: 'table_count', required: true, type: 'int', title: 'Таблиц', description: 'Количество таблиц модуля' },
    { code: 'total_size_mb', required: true, type: 'int', title: 'Размер (МБ)', description: 'Общий объём данных модуля' },
];

export const totalStatsFields: JsonField[] = [
    { code: 'module', required: true, type: 'enum', title: 'Модуль', description: 'Всегда "total"', enum: ['total'] },
    { code: 'row_count', required: true, type: 'int', title: 'Строк', description: 'Общее количество строк' },
    { code: 'table_count', required: true, type: 'int', title: 'Таблиц', description: 'Общее количество таблиц' },
    { code: 'total_bytes', required: true, type: 'int', title: 'Байт', description: 'Общий объём в байтах' },
    { code: 'total_size_mb', required: true, type: 'int', title: 'Размер (МБ)', description: 'Общий объём в мегабайтах' },
];

export const storageModulesDataFields: JsonField[] = [
    { code: 'modules', required: true, type: 'array', title: 'Модули', description: 'Статистика по модулям (ModuleStats[])' },
    { code: 'total', required: true, type: 'array', title: 'Итого', description: 'Суммарная статистика по всем модулям (TotalStats)' },
];

const dbInfo200: string = `{
    "status": true,
    "message": "Database storage retrieved successfully",
    "data": {
        "schema_name": "company_660e8400",
        "total_size_mb": 42,
        "total_size_pretty": "42 MB",
        "table_size_mb": 30,
        "index_size_mb": 12,
        "table_count": 24,
        "total_rows": 15000,
        "active_connections": 3,
        "schema_exists": true
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../storage/db",
        "method": "GET"
    }
}`;

const dbSources200: string = `{
    "status": true,
    "message": "Database sources retrieved successfully",
    "data": {
        "schema_name": "company_660e8400",
        "total_size_mb": 42,
        "total_size_pretty": "42 MB",
        "table_size_mb": 30,
        "index_size_mb": 10,
        "toast_size_mb": 2,
        "table_count": 24,
        "index_count": 48,
        "sequence_count": 12,
        "view_count": 4,
        "materialized_view_count": 2,
        "total_rows": 15000,
        "dead_rows": 200,
        "active_connections": 3,
        "last_vacuum": "2026-06-13T00:00:00Z",
        "last_autovacuum": "2026-06-14T00:00:00Z",
        "last_analyze": "2026-06-14T06:00:00Z",
        "schema_exists": true,
        "created_at": "2026-04-24T00:20:54Z",
        "updated_at": "2026-06-14T00:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../storage/db/sources",
        "method": "GET"
    }
}`;

const dbModules200: string = `{
    "status": true,
    "message": "Modules data retrieved successfully",
    "data": {
        "modules": {
            "fm": {
                "module": "fm",
                "row_count": 5000,
                "table_count": 6,
                "total_size_mb": 15
            },
            "crm": {
                "module": "crm",
                "row_count": 3000,
                "table_count": 4,
                "total_size_mb": 10
            }
        },
        "total": {
            "module": "total",
            "row_count": 15000,
            "table_count": 24,
            "total_bytes": 44040192,
            "total_size_mb": 42
        }
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../storage/db/sources/modules",
        "method": "GET"
    }
}`;

export const dbInfoResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={dbInfo200} />
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

export const dbSourcesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={dbSources200} />
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

export const dbModulesResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={dbModules200} />
        </>
    }
];