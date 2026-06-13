import { JsonField } from "@/assets/mdx/json-schema/utils";

export const limitsFields: JsonField[] = [
    { code: 'keys_per_account', required: true, type: 'int', title: 'Приложений на аккаунт', description: '10'  },
    { code: 'req_per_day', required: true, type: 'int', title: 'Запросы/день на ключ', description: '10000'  },
    { code: 'req_public_per_min', required: true, type: 'int', title: 'Запросы/минута к публичным методам', description: '20'  },
    { code: 'req_private_per_min', required: true, type: 'int', title: 'Запросы/минута к приватным методам (требуют ключ)', description: '2000'  },
    { code: 'files_per_min', required: true, type: 'int', title: 'Файлов/минута - генерация', description: '5'  }
];