import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const fingerprintListItemFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор отпечатка' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Текущий статус', enum: ['active', 'inactive'] },
    { code: 'masked_key', required: true, type: 'string', title: 'Маска', description: 'Маскированный ключ (например: fp_abc...xyz)' },
    { code: 'last_used_at', required: false, type: 'string', title: 'Последнее использование', description: 'Дата последнего использования (RFC 3339)' },
    { code: 'expired_at', required: false, type: 'string', title: 'Истекает', description: 'Дата истечения срока действия (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
];

export const fingerprintWithKeyFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор отпечатка' },
    { code: 'key', required: true, type: 'string', title: 'Ключ', description: 'Полный ключ (показывается только один раз при создании!)' },
    { code: 'status', required: true, type: 'enum', title: 'Статус', description: 'Текущий статус', enum: ['active', 'inactive'] },
    { code: 'expired_at', required: false, type: 'string', title: 'Истекает', description: 'Дата истечения срока действия (RFC 3339)' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата создания (RFC 3339)' },
];

export const createFingerprintRequestFields: JsonField[] = [
    { code: 'expires_in', required: false, type: 'string', title: 'Срок жизни в часах +h', description: '24h, 48h, never (по умолчанию never)' },
];

export const fingerprintsDataFields: JsonField[] = [
    { code: 'fingerprints', required: true, type: 'array', title: 'Отпечатки', description: 'Список отпечатков (FingerprintListItem[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const fingerprintsList200: string = `{
    "status": true,
    "message": "Fingerprints retrieved successfully",
    "data": {
        "fingerprints": [
            {
                "id": "550e8400-e29b-41d4-a716-446655440050",
                "status": "active",
                "masked_key": "fp_abc...xyz",
                "last_used_at": "2026-06-13T15:29:02Z",
                "expired_at": null,
                "created_at": "2026-05-24T15:27:58Z"
            }
        ],
        "pagination": {
            "total": 1,
            "page": 1,
            "limit": 20,
            "pages": 1
        }
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account/fingerprints",
        "method": "GET"
    }
}`;

const createFingerprint200: string = `{
    "status": true,
    "message": "Fingerprint created successfully",
    "data": {
        "id": "550e8400-e29b-41d4-a716-446655440051",
        "key": "fp_abc123def456ghi789jkl012mno345pq",
        "status": "active",
        "created_at": "2026-06-14T12:00:00Z",
        "expired_at": null
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/account/fingerprints",
        "method": "POST"
    }
}`;

const revokeFingerprint200: string = `{
    "status": true,
    "message": "Fingerprint revoked successfully",
    "data": {},
    "meta": {
        "timestamp": "2026-06-14T12:05:00Z",
        "request_id": "...",
        "path": "/api/v1/account/fingerprints/.../revoke",
        "method": "POST"
    }
}`;

export const fingerprintsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={fingerprintsList200} />
        </>
    },
    {
        code: 401,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Unauthorized",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const createFingerprintResponseCodes: Code[] = [
    {
        code: 201,
        children: <>
            <MDXCodeBlock code={createFingerprint200} />
        </>
    },
    {
        code: 401,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Unauthorized",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];

export const revokeFingerprintResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={revokeFingerprint200} />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock code={`{
    "status": false,
    "message": "Fingerprint not found",
    "data": null,
    "meta": { "...": "..." }
}`} />
        </>
    }
];