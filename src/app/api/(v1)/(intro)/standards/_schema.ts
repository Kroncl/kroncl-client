import { JsonField } from '@/assets/mdx/json-schema/utils';

export const apiResponseFields: JsonField[] = [
    { code: 'status', required: true, type: 'boolean', title: 'Статус', description: 'Успешность выполнения запроса' },
    { code: 'message', required: true, type: 'string', title: 'Сообщение', description: 'Краткое описание результата' },
    { code: 'data', required: true, type: 'string', title: 'Данные', description: 'Тело ответа (объект, массив или null)' },
    { code: 'meta', required: true, type: 'string', title: 'Метаданные', description: 'Техническая информация о запросе' },
    { code: 'meta.timestamp', required: true, type: 'string', title: 'timestamp', description: 'Метка времени (ISO 8601)' },
    { code: 'meta.request_id', required: true, type: 'string', title: 'request_id', description: 'Уникальный ID запроса' },
    { code: 'meta.path', required: true, type: 'string', title: 'path', description: 'URL эндпоинта' },
    { code: 'meta.method', required: true, type: 'string', title: 'method', description: 'HTTP-метод' },
];