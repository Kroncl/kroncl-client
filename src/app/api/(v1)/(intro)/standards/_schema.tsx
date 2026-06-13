import { MDXCodeBlock } from '@/assets/mdx';
import { JsonField } from '@/assets/mdx/json-schema/utils';
import { Code } from '@/assets/mdx/statuses-block';

export const apiResponseFields: JsonField[] = [
    { code: 'status', required: true, type: 'boolean', title: 'Статус', description: 'Успешность выполнения запроса' },
    { code: 'message', required: true, type: 'string', title: 'Сообщение', description: 'Краткое описание результата (сообщение ошибки в случае проблемы)' },
    { code: 'data', required: true, type: 'string', title: 'Данные', description: 'Тело ответа (объект, массив или null)' },
    { code: 'meta', required: true, type: 'string', title: 'Метаданные', description: 'Техническая информация о запросе' },
    // { code: 'meta.timestamp', required: true, type: 'string', title: 'timestamp', description: 'Метка времени (ISO 8601)' },
    // { code: 'meta.request_id', required: true, type: 'string', title: 'request_id', description: 'Уникальный ID запроса' },
    // { code: 'meta.path', required: true, type: 'string', title: 'path', description: 'URL эндпоинта' },
    // { code: 'meta.method', required: true, type: 'string', title: 'method', description: 'HTTP-метод' },
];

// example-codes

const code200: string = `{
    "status": true,
    "message": "Success",
    "data": {
        "status": "ok",
        "timestamp": "2026-06-13T15:14:24Z"
    },
    "meta": {
        "timestamp": "2026-06-13T15:14:24Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-005807",
        "path": "/api/v1/health",
        "method": "GET"
    }
}`;

const code404: string = `{
    "status": false,
    "message": "404 page not found",
    "data": {},
    "meta": {
        "timestamp": "2026-06-13T15:08:22Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-005762",
        "path": "/api/v1/account/authX",
        "method": "POST"
    }
}`;

const code401: string = `{
    "status": false,
    "message": "Authorization header is required",
    "data": {},
    "meta": {
        "timestamp": "2026-06-13T15:15:18Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-005814",
        "path": "/api/v1/account",
        "method": "GET"
    }
}`;

export const responseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock
                code={code200}
            />
        </>
    },
    {
        code: 404,
        children: <>
            <MDXCodeBlock
                code={code404}
            />
        </>
    },
    {
        code: 401,
        children: <>
            <MDXCodeBlock
                code={code401}
            />
        </>
    }
]

// pagination

export const paginationMetaFields: JsonField[] = [
    { code: 'total', required: true, type: 'int', title: 'Всего', description: 'Общее количество записей' },
    { code: 'page', required: true, type: 'int', title: 'Страница', description: 'Текущая страница' },
    { code: 'limit', required: true, type: 'int', title: 'Лимит', description: 'Количество записей на странице' },
    { code: 'pages', required: true, type: 'int', title: 'Страниц', description: 'Общее количество страниц' },
];

export const paginationParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы (по умолчанию 1)' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице (по умолчанию 20, максимум 100)' },
];

export const paginationResponse: string = `{
    "status": true,
    "message": "Invitations retrieved successfully",
    "data": {
        "invitations": null,
        "pagination": {
            "limit": 10,
            "page": 2,
            "pages": 1,
            "total": 0
        }
    },
    "meta": {
        "timestamp": "2026-06-13T15:29:02Z",
        "request_id": "e08cf60221af/7tXcx4SYpF-005900",
        "path": "/api/v1/account/invitations",
        "method": "GET"
    }
}`;