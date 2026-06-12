import { defineSchema } from '@/assets/mdx/json-schema/utils';
import { CreateClientRequest } from '@/apps/company/modules/crm/types';

// Образец: required поля заполнены, optional = undefined
const sample: Partial<CreateClientRequest> = {
    first_name: 'John',      // required (значение есть)
    type: 'individual',      // required
    source_id: 'uuid',       // required
    last_name: undefined,    // optional (undefined)
    phone: undefined,        // optional
    email: undefined,        // optional
    comment: undefined,      // optional
    patronymic: undefined,   // optional
    status: undefined,       // optional
    metadata: undefined,     // optional
};

export const clientFields = defineSchema(sample, {
    first_name: { title: 'Имя', description: 'Имя клиента' },
    last_name: { title: 'Фамилия', description: 'Фамилия клиента (опционально)' },
    type: { title: 'Тип клиента', description: 'Физическое или юридическое лицо', enum: ['invividual', 'legal'] },
    source_id: { title: 'Источник', description: 'ID источника привлечения' },
    status: { title: 'Статус', description: 'Статус клиента' },
});