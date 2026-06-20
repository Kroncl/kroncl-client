import { DevNavSectionProps } from "../components/panel/components/nav-section/section";

export const navigationSections: DevNavSectionProps[] = [
    {
        label: 'Мои приложения',
        href: '/api/apps'
    },
    {
        label: 'Введение',
        href: '/api',
        childrens: [
            {
                label: 'Стандарты',
                href: '/api/standards'
            },
            {
                label: 'Авторизация',
                href: '/api/authorization'
            },
            {
                label: 'Лимиты',
                href: '/api/limits'
            }
        ]
    },
    {
        label: 'Публичные методы',
        href: '/api/public',
        childrens: [
            {
                label: 'Health & Статус',
                href: '/api/public/health-status',
                childrens: [
                    {
                        label: 'Health-Check',
                        href: '/api/public/health-status#health-check',
                        method: 'GET'
                    },
                    {
                        label: 'Статус системы',
                        href: '/api/public/health-status#status',
                        method: 'GET'
                    },
                    {
                        label: 'Режим биллинга',
                        href: '/api/public/health-status#billing',
                        method: 'GET'
                    }
                ]
            },
            {
                label: 'Тарифы',
                href: '/api/public/plans',
                childrens: [
                    {
                        label: 'Список',
                        href: '/api/public/plans#list',
                        method: 'GET'
                    },
                    {
                        label: 'Тариф по коду',
                        href: '/api/public/plans#one',
                        method: 'GET'
                    }
                ]
            },
            {
                label: 'Разрешения платформы',
                href: '/api/public/permissions',
                method: 'GET'
            },
            {
                label: 'Публичные компании',
                href: '/api/public/companies',
                method: 'GET'
            },
        ]
    },
    {
        label: 'Аккаунт',
        href: '/api/account',
        childrens: [
            {
                label: 'Управление',
                href: '/api/account/manage',
                childrens: [
                    {
                        label: 'Профиль',
                        href: '/api/account/manage#get',
                        method: 'GET'
                    },
                    {
                        label: 'Обновить профиль',
                        href: '/api/account/manage#update',
                        method: 'PATCH'
                    },
                    {
                        label: 'Сводка аккаунта',
                        href: '/api/account/manage#summary',
                        method: 'GET'
                    },
                ]
            },
            {
                label: 'Приглашения',
                href: '/api/account/invitations',
                childrens: [
                    {
                        label: 'Список',
                        href: '/api/account/invitations#list',
                        method: 'GET'
                    },
                    {
                        label: 'Принять',
                        href: '/api/account/invitations#accept',
                        method: 'POST'
                    },
                    {
                        label: 'Отклонить',
                        href: '/api/account/invitations#reject',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'Отпечатки (Доступ третьим лицам)',
                href: '/api/account/fingerprints',
                childrens: [
                    {
                        label: 'Список',
                        href: '/api/account/fingerprints#list',
                        method: 'GET'
                    },
                    {
                        label: 'Создать',
                        href: '/api/account/fingerprints#create',
                        method: 'POST'
                    },
                    {
                        label: 'Отозвать',
                        href: '/api/account/fingerprints#revoke',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'API-ключи',
                href: '/api/account/api-keys',
                childrens: [
                    {
                        label: 'Список',
                        href: '/api/account/api-keys#list',
                        method: 'GET'
                    },
                    {
                        label: 'Создать ключ',
                        href: '/api/account/api-keys#create',
                        method: 'POST'
                    },
                    {
                        label: 'Получить ключ',
                        href: '/api/account/api-keys#get',
                        method: 'GET'
                    },
                    {
                        label: 'Отозвать ключ',
                        href: '/api/account/api-keys#revoke',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'Компании',
                href: '/api/account/companies',
                childrens: [
                    {
                        label: 'Мои компании',
                        href: '/api/account/companies#list',
                        method: 'GET'
                    },
                    {
                        label: 'Создать компанию',
                        href: '/api/account/companies#create',
                        method: 'POST'
                    },
                    {
                        label: 'Проверить slug',
                        href: '/api/account/companies#check-slug-unique',
                        method: 'GET'
                    }
                ]
            },
        ]
    },
    {
        label: 'Компания',
        href: '/api/company',
        childrens: [
            {
                label: 'Базовые действия',
                href: '/api/company/base',
                childrens: [
                    
                    {
                        label: 'Получение компании',
                        href: '/api/company/base#get',
                        method: 'GET'
                    },
                    {
                        label: 'Обновить',
                        href: '/api/company/base#update',
                        method: 'PATCH'
                    },
                    {
                        label: 'Разрешения компании',
                        href: '/api/company/base#permissions',
                        method: 'GET'
                    },
                    {
                        label: 'Удалить',
                        href: '/api/company/base#delete',
                        method: 'POST'
                    },
                ]
            },
            {
                label: 'Хранилище',
                href: '/api/company/storage',
                childrens: [
                    {
                        label: 'Статус хранилища',
                        href: '/api/company/storage#summary',
                        method: 'GET'
                    },
                    {
                        label: 'База данных',
                        href: '/api/company/storage/db',
                        childrens: [
                            {
                                label: 'Информация о БД',
                                href: '/api/company/storage/db#info',
                                method: 'GET'
                            },
                            {
                                label: 'Ресурсы',
                                href: '/api/company/storage/db#sources',
                                method: 'GET'
                            },
                            {
                                label: 'Распределение по модулям',
                                href: '/api/company/storage/db#modules',
                                method: 'GET'
                            }
                        ]
                    },
                    {
                        label: 'Объектное хранилище',
                        href: '/api/company/storage/media',
                        childrens: [
                            {
                                label: 'Статистика бакета',
                                href: '/api/company/storage/media#stats',
                                method: 'GET'
                            },
                            {
                                label: 'Получить файл',
                                href: '/api/company/storage/media#get-file',
                                method: 'GET'
                            },
                            // {
                            //     label: 'Presigned URL',
                            //     href: '/api/company/storage/media#presigned-url',
                            //     method: 'GET'
                            // },
                            // {
                            //     label: 'Загрузить файл',
                            //     href: '/api/company/storage/media#upload',
                            //     method: 'POST'
                            // }
                        ]
                    }
                ]
            },
            {
                label: 'Тарификация',
                href: '/api/company/pricing',
                childrens: [
                    {
                        label: 'Текущий план',
                        href: '/api/company/pricing#current',
                        method: 'GET'
                    },
                    {
                        label: 'Транзакции',
                        href: '/api/company/pricing#transactions',
                        method: 'GET'
                    },
                    {
                        label: 'Отменить транзакцию',
                        href: '/api/company/pricing#revoke-transaction',
                        method: 'POST'
                    },
                    {
                        label: 'Сменить тариф',
                        href: '/api/company/pricing#migrate',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'Участники',
                href: '/api/company/accounts',
                childrens: [
                    {
                        label: 'Список',
                        href: '/api/company/accounts#list',
                        method: 'GET'
                    },
                    {
                        label: 'Участник',
                        href: '/api/company/accounts#one',
                        method: 'GET',
                    },
                    {
                        label: 'Разрешения участника',
                        href: '/api/company/accounts#permissions',
                        method: 'GET'
                    },
                    {
                        label: 'Настройки участника',
                        href: '/api/company/accounts#settings',
                        method: 'GET'
                    },
                    {
                        label: 'Обновить настройки участника',
                        href: '/api/company/accounts#update-settings',
                        method: 'PATCH'
                    },
                    {
                        label: 'Исключить участника',
                        href: '/api/company/accounts#delete',
                        method: 'DELETE'
                    },
                    {
                        label: 'Приглашения',
                        href: '/api/company/accounts/invitations',
                        childrens: [
                            {
                                label: 'Список',
                                href: '/api/company/accounts/invitations#list',
                                method: 'GET'
                            },
                            {
                                label: 'Создать',
                                href: '/api/company/accounts/invitations#create',
                                method: 'POST'
                            },
                            {
                                label: 'Отозвать',
                                href: '/api/company/accounts/invitations#revoke',
                                method: 'DELETE'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Логи',
                href: '/api/company/logs',
                childrens: [
                    { label: 'Список', href: '/api/company/logs#list', method: 'GET' },
                    { label: 'Запись', href: '/api/company/logs#one', method: 'GET' },
                    { label: 'Очистить', href: '/api/company/logs#clear', method: 'POST' },
                    { label: 'Оптимизировать', href: '/api/company/logs#optimize', method: 'POST' },
                    { label: 'Активность', href: '/api/company/logs#activity', method: 'GET' }
                ]
            },
            {
                label: 'Документы',
                href: '/api/company/docs',
                childrens: [
                    { label: 'Список', href: '/api/company/docs#list', method: 'GET' },
                    { label: 'Документ', href: '/api/company/docs#one', method: 'GET' },
                    { label: 'Настройки', href: '/api/company/docs#settings', method: 'GET' },
                    { label: 'Обновить настройки', href: '/api/company/docs#update-settings', method: 'PATCH' }
                ]
            },
            {
                label: 'Поддержка',
                href: '/api/company/support',
                childrens: [
                    { label: 'Список тикетов', href: '/api/company/support#tickets', method: 'GET' },
                    { label: 'Создать тикет', href: '/api/company/support#create-ticket', method: 'POST' },
                    { label: 'Тикет', href: '/api/company/support#ticket', method: 'GET' },
                    { label: 'Обновить статус', href: '/api/company/support#update-status', method: 'PATCH' },
                    { label: 'Сообщения', href: '/api/company/support#messages', method: 'GET' },
                    { label: 'Отправить', href: '/api/company/support#create-message', method: 'POST' },
                    { label: 'Прочитатать', href: '/api/company/support#read-message', method: 'PATCH' },
                    // { label: 'WebSocket', href: '/api/companies/{id}/modules/support/tickets/{ticketId}/messages/ws', method: 'GET' }
                ]
            },
            {
                label: 'Персонал (HRM)',
                href: '/api/company/hrm',
                childrens: [
                    { label: 'Отчёт', href: '/api/company/hrm/reports', method: 'POST' },
                    {
                        label: 'Должности',
                        href: '/api/company/hrm/positions',
                        childrens: [
                            { label: 'Список', href: '/api/company/hrm/positions#list', method: 'GET' },
                            { label: 'Создать', href: '/api/company/hrm/positions#create', method: 'POST' },
                            { label: 'Карточка', href: '/api/company/hrm/positions#one', method: 'GET' },
                            { label: 'Обновить', href: '/api/company/hrm/positions#update', method: 'PATCH' },
                            { label: 'Удалить', href: '/api/company/hrm/positions#delete', method: 'DELETE' }
                        ]
                    },
                    {
                        label: 'Сотрудники',
                        href: '/api/company/hrm/employees',
                        childrens: [
                            { label: 'Список', href: '/api/company/hrm/employees#list', method: 'GET' },
                            { label: 'Создать', href: '/api/company/hrm/employees#create', method: 'POST' },
                            { label: 'Карточка', href: '/api/company/hrm/employees#one', method: 'GET' },
                            { label: 'Обновить', href: '/api/company/hrm/employees#update', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/company/hrm/employees#deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/company/hrm/employees#activate', method: 'POST' },
                            { label: 'Привязать аккаунт', href: '/api/company/hrm/employees#link-account', method: 'POST' },
                            { label: 'Отвязать аккаунт', href: '/api/company/hrm/employees#unlink-account', method: 'POST' },
                            { label: 'Назначить должность', href: '/api/company/hrm/employees#link-position', method: 'POST' },
                            { label: 'Снять с должности', href: '/api/company/hrm/employees#unlink-position', method: 'POST' },
                        ]
                    },
                    {
                        label: 'Аналитика',
                        href: '/api/company/hrm/analysis',
                        childrens: [
                            { label: 'Сводка', href: '/api/company/hrm/analysis#summary', method: 'GET' },
                            { label: 'Группировка', href: '/api/company/hrm/analysis#grouped', method: 'GET' }
                        ]
                    },
                ]
            },
            {
                label: 'Финансы (FM)',
                href: '/api/company/fm',
                childrens: [
                    { label: 'Отчёт', href: '/api/company/fm/reports#create', method: 'POST' },
                    {
                        label: 'Прогнозирование',
                        href: '/api/company/fm/forecast',
                        childrens: [
                            { label: 'График', href: '/api/company/fm/forecast#timeline', method: 'GET' },
                            { label: 'Сводка', href: '/api/company/fm/forecast#summary', method: 'GET' }
                        ]
                    },
                    {
                        label: 'Транзакции',
                        href: '/api/company/fm/transactions',
                        childrens: [
                            { label: 'Список', href: '/api/company/fm/transactions#list', method: 'GET' },
                            { label: 'Создать', href: '/api/company/fm/transactions#create', method: 'POST' },
                            { label: 'Детали', href: '/api/company/fm/transactions#one', method: 'GET' },
                            { label: 'Сторнировать', href: '/api/company/fm/transactions#reverse', method: 'POST' },
                            {
                                label: 'Категории',
                                href: '/api/company/fm/categories',
                                childrens: [
                                    { label: 'Список', href: '/api/company/fm/categories#list', method: 'GET' },
                                    { label: 'Создать', href: '/api/company/fm/categories#create', method: 'POST' },
                                    { label: 'Детали', href: '/api/company/fm/categories#one', method: 'GET' },
                                    { label: 'Обновить', href: '/api/company/fm/categories#update', method: 'PATCH' },
                                    { label: 'Удалить', href: '/api/company/fm/categories#delete', method: 'DELETE' }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Аналитика',
                        href: '/api/company/fm/analysis',
                        childrens: [
                            { label: 'Сводка', href: '/api/company/fm/analysis#summary', method: 'GET' },
                            { label: 'Группировка', href: '/api/company/fm/analysis#grouped', method: 'GET' }
                        ]
                    },
                    {
                        label: 'Контрагенты',
                        href: '/api/company/fm/counterparties',
                        childrens: [
                            { label: 'Список', href: '/api/company/fm/counterparties#list', method: 'GET' },
                            { label: 'Создать', href: '/api/company/fm/counterparties#create', method: 'POST' },
                            { label: 'Детали', href: '/api/company/fm/counterparties#one', method: 'GET' },
                            { label: 'Обновить', href: '/api/company/fm/counterparties#update', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/company/fm/counterparties#deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/company/fm/counterparties#activate', method: 'POST' }
                        ]
                    },
                    {
                        label: 'Кредиты',
                        href: '/api/company/fm/credits',
                        childrens: [
                            { label: 'Список', href: '/api/company/fm/credits#list', method: 'GET' },
                            { label: 'Создать', href: '/api/company/fm/credits#create', method: 'POST' },
                            { label: 'Детали', href: '/api/company/fm/credits#one', method: 'GET' },
                            { label: 'Транзакции', href: '/api/company/fm/credits#transactions', method: 'GET' },
                            { label: 'Платёж', href: '/api/company/fm/credits#pay', method: 'POST' },
                            { label: 'Обновить', href: '/api/company/fm/credits#update', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/company/fm/credits#deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/company/fm/credits#activate', method: 'POST' }
                        ]
                    }
                ]
            },
            {
                label: "Клиенты (CRM)",
                href: "/api/company/crm",
                childrens: [
                    { label: "Отчёт", href: "/api/company/crm/reports#create", method: "POST" },
                    {
                        label: "Источники",
                        href: "/api/company/crm/sources",
                        childrens: [
                            { label: "Список", href: "/api/company/crm/sources#list", method: "GET" },
                            { label: "Создать", href: "/api/company/crm/sources#create", method: "POST" },
                            { label: "Детали", href: "/api/company/crm/sources#one", method: "GET" },
                            { label: "Обновить", href: "/api/company/crm/sources#update", method: "PATCH" },
                            { label: "Деактивировать", href: "/api/company/crm/sources#deactivate", method: "POST" },
                            { label: "Активировать", href: "/api/company/crm/sources#activate", method: "POST" }
                        ]
                    },
                    {
                        label: "Клиенты",
                        href: "/api/company/crm/clients",
                        childrens: [
                            { label: "Список", href: "/api/company/crm/clients#list", method: "GET" },
                            { label: "Создать", href: "/api/company/crm/clients#create", method: "POST" },
                            { label: "Детали", href: "/api/company/crm/clients#one", method: "GET" },
                            { label: "Обновить", href: "/api/company/crm/clients#update", method: "PATCH" },
                            { label: "Деактивировать", href: "/api/company/crm/clients#deactivate", method: "POST" },
                            { label: "Активировать", href: "/api/company/crm/clients#activate", method: "POST" }
                        ]
                    },
                    {
                        label: "Аналитика",
                        href: "/api/company/crm/analysis",
                        childrens: [
                            { label: "Сводка", href: "/api/company/crm/analysis#summary", method: "GET" },
                            { label: "Группировка", href: "/api/company/crm/analysis#grouped", method: "GET" }
                        ]
                    }
                ]
            },
            {
                label: "Склад (WM)",
                href: "/api/company/wm",
                childrens: [
                    { label: "Отчёт", href: "/api/company/wm/reports#create", method: "POST" },
                    {
                        label: "Каталог",
                        href: "/api/company/wm/catalog",
                        childrens: [
                            {
                                label: "Категории",
                                href: "/api/company/wm/catalog/categories",
                                childrens: [
                                    { label: "Список", href: "/api/company/wm/catalog/categories#list", method: "GET" },
                                    { label: "Создать", href: "/api/company/wm/catalog/categories#create", method: "POST" },
                                    { label: "Детали", href: "/api/company/wm/catalog/categories#one", method: "GET" },
                                    { label: "Обновить", href: "/api/company/wm/catalog/categories#update", method: "PATCH" },
                                    { label: "Деактивировать", href: "/api/company/wm/catalog/categories#deactivate", method: "POST" },
                                    { label: "Активировать", href: "/api/company/wm/catalog/categories#activate", method: "POST" }
                                ]
                            },
                            {
                                label: "Товарные позиции",
                                href: "/api/company/wm/catalog/units",
                                childrens: [
                                    { label: "Список", href: "/api/company/wm/catalog/units#list", method: "GET" },
                                    { label: "Создать", href: "/api/company/wm/catalog/units#create", method: "POST" },
                                    { label: "Детали", href: "/api/company/wm/catalog/units#one", method: "GET" },
                                    { label: "Обновить", href: "/api/company/wm/catalog/units#update", method: "PATCH" },
                                    { label: "Деактивировать", href: "/api/company/wm/catalog/units#deactivate", method: "POST" },
                                    { label: "Активировать", href: "/api/company/wm/catalog/units#activate", method: "POST" }
                                ]
                            }
                        ]
                    },
                    {
                        label: "Склад",
                        href: "/api/company/wm/stocks",
                        childrens: [
                            { label: "Остатки", href: "/api/company/wm/stocks#balance", method: "GET" },
                            {
                                label: "Партии",
                                href: "/api/company/wm/stocks/batches",
                                childrens: [
                                    { label: "Список", href: "/api/company/wm/stocks/batches#list", method: "GET" },
                                    { label: "Создать", href: "/api/company/wm/stocks/batches#create", method: "POST" },
                                    { label: "Детали", href: "/api/company/wm/stocks/batches#one", method: "GET" }
                                ]
                            },
                            {
                                label: "Позиции",
                                href: "/api/company/wm/stocks/positions",
                                childrens: [
                                    { label: "Список", href: "/api/company/wm/stocks/positions#list", method: "GET" },
                                    { label: "Детали", href: "/api/company/wm/stocks/positions#one", method: "GET" }
                                ]
                            }
                        ]
                    }
                ]
            }
            // {
            //     label: 'Сделки (DM)',
            //     href: '/api/companies/{id}/modules/dm',
            //     childrens: [
            //         {
            //             label: 'Типы',
            //             href: '/api/companies/{id}/modules/dm/types',
            //             childrens: [
            //                 { label: 'Список', href: '/api/companies/{id}/modules/dm/types', method: 'GET' },
            //                 { label: 'Создать', href: '/api/companies/{id}/modules/dm/types', method: 'POST' },
            //                 { label: 'Детали', href: '/api/companies/{id}/modules/dm/types/{typeId}', method: 'GET' },
            //                 { label: 'Обновить', href: '/api/companies/{id}/modules/dm/types/{typeId}', method: 'PATCH' },
            //                 { label: 'Удалить', href: '/api/companies/{id}/modules/dm/types/{typeId}', method: 'DELETE' }
            //             ]
            //         },
            //         {
            //             label: 'Статусы',
            //             href: '/api/companies/{id}/modules/dm/statuses',
            //             childrens: [
            //                 { label: 'Список', href: '/api/companies/{id}/modules/dm/statuses', method: 'GET' },
            //                 { label: 'Создать', href: '/api/companies/{id}/modules/dm/statuses', method: 'POST' },
            //                 { label: 'Пересортировать', href: '/api/companies/{id}/modules/dm/statuses/reorder', method: 'PUT' },
            //                 { label: 'Детали', href: '/api/companies/{id}/modules/dm/statuses/{statusId}', method: 'GET' },
            //                 { label: 'Обновить', href: '/api/companies/{id}/modules/dm/statuses/{statusId}', method: 'PATCH' },
            //                 { label: 'Удалить', href: '/api/companies/{id}/modules/dm/statuses/{statusId}', method: 'DELETE' }
            //             ]
            //         },
            //         {
            //             label: 'Сделки',
            //             href: '/api/companies/{id}/modules/dm/deals',
            //             childrens: [
            //                 { label: 'Список', href: '/api/companies/{id}/modules/dm/deals', method: 'GET' },
            //                 { label: 'Создать', href: '/api/companies/{id}/modules/dm/deals', method: 'POST' },
            //                 {
            //                     label: 'Сделка',
            //                     href: '/api/companies/{id}/modules/dm/deals/{dealId}',
            //                     childrens: [
            //                         { label: 'Детали', href: '/api/companies/{id}/modules/dm/deals/{dealId}', method: 'GET' },
            //                         { label: 'Обновить', href: '/api/companies/{id}/modules/dm/deals/{dealId}', method: 'PATCH' },
            //                         { label: 'Удалить', href: '/api/companies/{id}/modules/dm/deals/{dealId}', method: 'DELETE' },
            //                         { label: 'Накладная', href: '/api/companies/{id}/modules/dm/deals/{dealId}/invoice', method: 'POST' },
            //                         {
            //                             label: 'Транзакции сделки',
            //                             href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions',
            //                             childrens: [
            //                                 { label: 'Список', href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions', method: 'GET' },
            //                                 { label: 'Создать', href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions', method: 'POST' },
            //                                 { label: 'Сводка', href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions/summary', method: 'GET' }
            //                             ]
            //                         }
            //                     ]
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Аналитика',
            //             href: '/api/companies/{id}/modules/dm/analysis',
            //             childrens: [
            //                 { label: 'Сводка', href: '/api/companies/{id}/modules/dm/analysis/summary', method: 'GET' },
            //                 { label: 'Группировка', href: '/api/companies/{id}/modules/dm/analysis/grouped', method: 'GET' },
            //                 { label: 'Фин. сводка', href: '/api/companies/{id}/modules/dm/analysis/financial-summary', method: 'GET' }
            //             ]
            //         }
            //     ]
            // }
        ]
    }
];