import { MDXCodeBlock } from "@/assets/mdx";
import { JsonField } from "@/assets/mdx/json-schema/utils";
import { Code } from "@/assets/mdx/statuses-block";

export const docFields: JsonField[] = [
    { code: 'id', required: true, type: 'string', title: 'ID', description: 'Уникальный идентификатор документа' },
    { code: 'object_path', required: true, type: 'string', title: 'Путь', description: 'Путь к файлу в объектном хранилище' },
    { code: 'module', required: false, type: 'string', title: 'Модуль', description: 'Модуль, сгенерировавший документ (fm, crm, hrm, wm, dm)' },
    { code: 'type', required: false, type: 'string', title: 'Тип', description: 'Тип документа (report, invoice и др.)' },
    { code: 'comment', required: false, type: 'string', title: 'Комментарий', description: 'Комментарий, указанный при генерации' },
    { code: 'created_at', required: true, type: 'string', title: 'Создан', description: 'Дата генерации (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлён', description: 'Дата последнего обновления (RFC 3339)' },
];

export const docsSettingsFields: JsonField[] = [
    { code: 'legal_name', required: false, type: 'string', title: 'Юр. наименование', description: 'Юридическое наименование организации' },
    { code: 'legal_address', required: false, type: 'string', title: 'Юр. адрес', description: 'Юридический адрес' },
    { code: 'inn', required: false, type: 'string', title: 'ИНН', description: 'ИНН организации' },
    { code: 'ogrn', required: false, type: 'string', title: 'ОГРН', description: 'ОГРН / ОГРНИП' },
    { code: 'bank_name', required: false, type: 'string', title: 'Банк', description: 'Наименование банка' },
    { code: 'bank_bic', required: false, type: 'string', title: 'БИК', description: 'БИК банка' },
    { code: 'bank_account', required: false, type: 'string', title: 'Р/с', description: 'Расчётный счёт' },
    { code: 'director_name', required: false, type: 'string', title: 'Директор', description: 'ФИО руководителя' },
    { code: 'accountant_name', required: false, type: 'string', title: 'Бухгалтер', description: 'ФИО главного бухгалтера' },
    { code: 'warranty_terms', required: false, type: 'string', title: 'Гарантии', description: 'Гарантийные условия' },
    { code: 'additional_terms', required: false, type: 'string', title: 'Доп. условия', description: 'Дополнительные условия продажи' },
    { code: 'created_at', required: true, type: 'string', title: 'Созданы', description: 'Дата создания настроек (RFC 3339)' },
    { code: 'updated_at', required: true, type: 'string', title: 'Обновлены', description: 'Дата последнего обновления (RFC 3339)' },
];

export const updateDocsSettingsRequestFields: JsonField[] = [
    { code: 'legal_name', required: false, type: 'string', title: 'Юр. наименование', description: 'Новое юридическое наименование' },
    { code: 'legal_address', required: false, type: 'string', title: 'Юр. адрес', description: 'Новый юридический адрес' },
    { code: 'inn', required: false, type: 'string', title: 'ИНН', description: 'Новый ИНН' },
    { code: 'ogrn', required: false, type: 'string', title: 'ОГРН', description: 'Новый ОГРН' },
    { code: 'bank_name', required: false, type: 'string', title: 'Банк', description: 'Новое наименование банка' },
    { code: 'bank_bic', required: false, type: 'string', title: 'БИК', description: 'Новый БИК' },
    { code: 'bank_account', required: false, type: 'string', title: 'Р/с', description: 'Новый расчётный счёт' },
    { code: 'director_name', required: false, type: 'string', title: 'Директор', description: 'Новый руководитель' },
    { code: 'accountant_name', required: false, type: 'string', title: 'Бухгалтер', description: 'Новый бухгалтер' },
    { code: 'warranty_terms', required: false, type: 'string', title: 'Гарантии', description: 'Новые гарантийные условия' },
    { code: 'additional_terms', required: false, type: 'string', title: 'Доп. условия', description: 'Новые дополнительные условия' },
];

export const getDocsQueryParamsFields: JsonField[] = [
    { code: 'page', required: false, type: 'int', title: 'Страница', description: 'Номер страницы' },
    { code: 'limit', required: false, type: 'int', title: 'Лимит', description: 'Записей на странице' },
    { code: 'module', required: false, type: 'string', title: 'Модуль', description: 'Фильтр по модулю (fm, crm, hrm, wm, dm)' },
    { code: 'type', required: false, type: 'string', title: 'Тип', description: 'Фильтр по типу документа' },
    { code: 'search', required: false, type: 'string', title: 'Поиск', description: 'Поиск по документам' },
];

export const docsDataFields: JsonField[] = [
    { code: 'docs', required: true, type: 'array', title: 'Документы', description: 'Список документов (Doc[])' },
    { code: 'pagination', required: true, type: 'array' },
];

const docsList200: string = `{
    "status": true,
    "message": "Docs retrieved successfully",
    "data": {
        "docs": [
            {
                "id": "bb0e8400-e29b-41d4-a716-446655440100",
                "object_path": "reports/fm-report-2026-06-14.pdf",
                "module": "fm",
                "type": "report",
                "comment": "Ежемесячный отчёт",
                "created_at": "2026-06-14T12:00:00Z",
                "updated_at": "2026-06-14T12:00:00Z"
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
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/docs",
        "method": "GET"
    }
}`;

const getDoc200: string = `{
    "status": true,
    "message": "Doc retrieved successfully",
    "data": {
        "id": "bb0e8400-e29b-41d4-a716-446655440100",
        "object_path": "reports/fm-report-2026-06-14.pdf",
        "module": "fm",
        "type": "report",
        "comment": "Ежемесячный отчёт",
        "created_at": "2026-06-14T12:00:00Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/docs/...",
        "method": "GET"
    }
}`;

const getSettings200: string = `{
    "status": true,
    "message": "Settings retrieved successfully",
    "data": {
        "legal_name": "ООО Автосервис на Пушкина",
        "legal_address": "г. Москва, ул. Пушкина, д. 1",
        "inn": "7700000000",
        "ogrn": "1234567890123",
        "bank_name": "Сбербанк",
        "bank_bic": "044525225",
        "bank_account": "40702810000000000000",
        "director_name": "Иванов Иван Иванович",
        "accountant_name": null,
        "warranty_terms": "30 дней с момента ремонта",
        "additional_terms": null,
        "created_at": "2026-04-24T00:20:54Z",
        "updated_at": "2026-06-14T00:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T00:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/docs/settings",
        "method": "GET"
    }
}`;

const updateSettings200: string = `{
    "status": true,
    "message": "Settings updated successfully",
    "data": {
        "legal_name": "ООО Автосервис на Пушкина",
        "legal_address": "г. Москва, ул. Пушкина, д. 1",
        "inn": "7700000000",
        "ogrn": "1234567890123",
        "bank_name": "Сбербанк",
        "bank_bic": "044525225",
        "bank_account": "40702810000000000000",
        "director_name": "Петров Пётр Петрович",
        "accountant_name": null,
        "warranty_terms": "60 дней с момента ремонта",
        "additional_terms": null,
        "created_at": "2026-04-24T00:20:54Z",
        "updated_at": "2026-06-14T12:00:00Z"
    },
    "meta": {
        "timestamp": "2026-06-14T12:00:00Z",
        "request_id": "...",
        "path": "/api/v1/companies/.../modules/docs/settings",
        "method": "PATCH"
    }
}`;

export const docsListResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={docsList200} />
        </>
    }
];

export const getDocResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getDoc200} />
        </>
    }
];

export const getSettingsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={getSettings200} />
        </>
    }
];

export const updateSettingsResponseCodes: Code[] = [
    {
        code: 200,
        children: <>
            <MDXCodeBlock code={updateSettings200} />
        </>
    }
];