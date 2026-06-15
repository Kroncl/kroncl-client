// _schema.tsx

import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const mediaBucketStatsFields: JsonField[] = [
    { code: 'name', required: true, type: 'string', title: 'Имя', description: 'Имя бакета' },
    { code: 'creation_date', required: true, type: 'string', title: 'Создан', description: 'Дата создания бакета (RFC 3339)' },
    { code: 'size_mb', required: true, type: 'int', title: 'Размер (МБ)', description: 'Общий объём файлов в мегабайтах' },
    { code: 'object_count', required: true, type: 'int', title: 'Файлов', description: 'Количество объектов в бакете' },
];

const bucketStats200: string = `{
    "status": true,
    "message": "Bucket stats retrieved successfully",
    "data": {
        "name": "company-660e8400",
        "creation_date": "2026-04-24T00:20:54Z",
        "size_mb": 128,
        "object_count": 45
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../storage/media",
        "method": "GET"
    }
}`;

export const bucketStatsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={bucketStats200} />
        </>
    }
];