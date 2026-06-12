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
        label: 'Health & Статус',
        href: '/api/health',
        childrens: [
            {
                label: 'Проверка здоровья',
                href: '/api/health',
                method: 'GET'
            },
            {
                label: 'Статус системы',
                href: '/api/status',
                method: 'GET'
            },
            {
                label: 'Режим биллинга',
                href: '/api/status/billing',
                method: 'GET'
            }
        ]
    },
    {
        label: 'Аккаунт',
        href: '/api/account',
        childrens: [
            {
                label: 'Регистрация',
                href: '/api/account/reg',
                method: 'POST'
            },
            {
                label: 'Проверка email',
                href: '/api/account/check-email-unique',
                method: 'GET'
            },
            {
                label: 'Вход',
                href: '/api/account/auth',
                method: 'POST'
            },
            {
                label: 'Вход по отпечатку',
                href: '/api/account/fingerprints/auth',
                method: 'POST'
            },
            {
                label: 'Обновление токенов',
                href: '/api/account/refresh',
                method: 'POST'
            },
            {
                label: 'Сброс пароля',
                href: '/api/account/reset-password',
                childrens: [
                    {
                        label: 'Отправить ссылку',
                        href: '/api/account/reset-password/send-link',
                        method: 'POST'
                    },
                    {
                        label: 'Проверить токен',
                        href: '/api/account/reset-password/validate-token',
                        method: 'POST'
                    },
                    {
                        label: 'Сменить пароль',
                        href: '/api/account/reset-password',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'Профиль',
                href: '/api/account',
                method: 'GET'
            },
            {
                label: 'Обновить профиль',
                href: '/api/account',
                method: 'PATCH'
            },
            {
                label: 'Подтвердить email',
                href: '/api/account/confirm',
                method: 'POST'
            },
            {
                label: 'Повторный код',
                href: '/api/account/confirm/resend',
                method: 'POST'
            },
            {
                label: 'Выход',
                href: '/api/account/log-out',
                method: 'POST'
            },
            {
                label: 'Сводка аккаунта',
                href: '/api/account/summary',
                method: 'GET'
            },
            {
                label: 'Приглашения',
                href: '/api/account/invitations',
                childrens: [
                    {
                        label: 'Список приглашений',
                        href: '/api/account/invitations',
                        method: 'GET'
                    },
                    {
                        label: 'Принять',
                        href: '/api/account/invitations/{invitationId}/accept',
                        method: 'POST'
                    },
                    {
                        label: 'Отклонить',
                        href: '/api/account/invitations/{invitationId}/reject',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'Отпечатки (Fingerprints)',
                href: '/api/account/fingerprints',
                childrens: [
                    {
                        label: 'Список',
                        href: '/api/account/fingerprints',
                        method: 'GET'
                    },
                    {
                        label: 'Создать',
                        href: '/api/account/fingerprints',
                        method: 'POST'
                    },
                    {
                        label: 'Отозвать',
                        href: '/api/account/fingerprints/{fingerprintId}/revoke',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'API-ключи',
                href: '/api/account/api-keys',
                childrens: [
                    {
                        label: 'Список ключей',
                        href: '/api/account/api-keys',
                        method: 'GET'
                    },
                    {
                        label: 'Создать ключ',
                        href: '/api/account/api-keys',
                        method: 'POST'
                    },
                    {
                        label: 'Получить ключ',
                        href: '/api/account/api-keys/{keyId}',
                        method: 'GET'
                    },
                    {
                        label: 'Отозвать ключ',
                        href: '/api/account/api-keys/{keyId}/revoke',
                        method: 'POST'
                    }
                ]
            }
        ]
    },
    {
        label: 'Тарифы',
        href: '/api/plans',
        childrens: [
            {
                label: 'Список тарифов',
                href: '/api/plans',
                method: 'GET'
            },
            {
                label: 'Тариф по коду',
                href: '/api/plans/{code}',
                method: 'GET'
            }
        ]
    },
    {
        label: 'Глобальные методы',
        href: '/',
        childrens: [
            {
                label: 'Разрешения платформы',
                href: '/api/permissions',
                method: 'GET'
            },
            {
                label: 'Визитки компаний',
                href: '/api/visit-cards/{slug}',
                method: 'GET'
            },
            {
                label: 'Поиск аккаунтов',
                href: '/api/accounts',
                method: 'GET'
            },
        ]
    },
    {
        label: 'Компании',
        href: '/api/companies',
        childrens: [
            {
                label: 'Создать компанию',
                href: '/api/companies',
                method: 'POST'
            },
            {
                label: 'Мои компании',
                href: '/api/companies/my',
                method: 'GET'
            },
            {
                label: 'Проверить slug',
                href: '/api/companies/check-slug-unique',
                method: 'GET'
            }
        ]
    },
    {
        label: 'Компания',
        href: '/api/companies/{id}',
        childrens: [
            {
                label: 'Базовые действия',
                href: '/ap/companies/{id}/base',
                childrens: [
                    
                    {
                        label: 'Информация',
                        href: '/api/companies/{id}',
                        method: 'GET'
                    },
                    {
                        label: 'Обновить',
                        href: '/api/companies/{id}',
                        method: 'PATCH'
                    },
                    {
                        label: 'Удалить',
                        href: '/api/companies/{id}/delete',
                        method: 'POST'
                    },
                    {
                        label: 'Разрешения',
                        href: '/api/companies/{id}/permissions',
                        method: 'GET'
                    }
                ]
            },
            {
                label: 'Тарификация',
                href: '/api/companies/{id}/pricing',
                childrens: [
                    {
                        label: 'Текущий план',
                        href: '/api/companies/{id}/pricing',
                        method: 'GET'
                    },
                    {
                        label: 'Транзакции',
                        href: '/api/companies/{id}/pricing/transactions',
                        method: 'GET'
                    },
                    {
                        label: 'Отменить транзакцию',
                        href: '/api/companies/{id}/pricing/transactions/{transactionId}/revoke',
                        method: 'POST'
                    },
                    {
                        label: 'Сменить тариф',
                        href: '/api/companies/{id}/pricing/migrate',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'Хранилище',
                href: '/api/companies/{id}/storage',
                childrens: [
                    {
                        label: 'Сводка',
                        href: '/api/companies/{id}/storage',
                        method: 'GET'
                    },
                    {
                        label: 'База данных',
                        href: '/api/companies/{id}/storage/db',
                        method: 'GET'
                    },
                    {
                        label: 'Источники БД',
                        href: '/api/companies/{id}/storage/db/sources',
                        method: 'GET'
                    },
                    {
                        label: 'По модулям',
                        href: '/api/companies/{id}/storage/db/sources/modules',
                        method: 'GET'
                    },
                    {
                        label: 'Медиа',
                        href: '/api/companies/{id}/storage/media',
                        method: 'GET'
                    },
                    {
                        label: 'Файл',
                        href: '/api/companies/{id}/storage/media/file',
                        method: 'GET'
                    },
                    {
                        label: 'Удалить файл',
                        href: '/api/companies/{id}/storage/media/file',
                        method: 'DELETE'
                    },
                    {
                        label: 'Presigned URL',
                        href: '/api/companies/{id}/storage/media/presigned-url',
                        method: 'GET'
                    },
                    {
                        label: 'Загрузить',
                        href: '/api/companies/{id}/storage/media/upload',
                        method: 'POST'
                    }
                ]
            },
            {
                label: 'Участники',
                href: '/api/companies/{id}/accounts',
                childrens: [
                    {
                        label: 'Список',
                        href: '/api/companies/{id}/accounts',
                        method: 'GET'
                    },
                    {
                        label: 'Участник',
                        href: '/api/companies/{id}/accounts/{accountId}',
                        method: 'GET'
                    },
                    {
                        label: 'Приглашения',
                        href: '/api/companies/{id}/accounts/invitations',
                        childrens: [
                            {
                                label: 'Список',
                                href: '/api/companies/{id}/accounts/invitations',
                                method: 'GET'
                            },
                            {
                                label: 'Создать',
                                href: '/api/companies/{id}/accounts/invitations',
                                method: 'POST'
                            },
                            {
                                label: 'Отозвать',
                                href: '/api/companies/{id}/accounts/invitations/{invitationId}',
                                method: 'DELETE'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Аккаунты (настройки)',
                href: '/api/companies/{id}/modules/accounts/{accountId}',
                childrens: [
                    {
                        label: 'Удалить сотрудника',
                        href: '/api/companies/{id}/modules/accounts/{accountId}',
                        method: 'DELETE'
                    },
                    {
                        label: 'Разрешения',
                        href: '/api/companies/{id}/modules/accounts/{accountId}/permissions',
                        method: 'GET'
                    },
                    {
                        label: 'Настройки',
                        href: '/api/companies/{id}/modules/accounts/{accountId}/settings',
                        method: 'GET'
                    },
                    {
                        label: 'Обновить настройки',
                        href: '/api/companies/{id}/modules/accounts/{accountId}/settings',
                        method: 'PATCH'
                    }
                ]
            },
            {
                label: 'Логи',
                href: '/api/companies/{id}/modules/logs',
                childrens: [
                    { label: 'Список', href: '/api/companies/{id}/modules/logs', method: 'GET' },
                    { label: 'Запись', href: '/api/companies/{id}/modules/logs/{logId}', method: 'GET' },
                    { label: 'Очистить', href: '/api/companies/{id}/modules/logs/clear', method: 'POST' },
                    { label: 'Оптимизировать', href: '/api/companies/{id}/modules/logs/optimize', method: 'POST' },
                    { label: 'Активность', href: '/api/companies/{id}/modules/logs/activity', method: 'GET' }
                ]
            },
            {
                label: 'Документы',
                href: '/api/companies/{id}/modules/docs',
                childrens: [
                    { label: 'Список', href: '/api/companies/{id}/modules/docs', method: 'GET' },
                    { label: 'Документ', href: '/api/companies/{id}/modules/docs/{docId}', method: 'GET' },
                    { label: 'Настройки', href: '/api/companies/{id}/modules/docs/settings', method: 'GET' },
                    { label: 'Обновить настройки', href: '/api/companies/{id}/modules/docs/settings', method: 'PATCH' }
                ]
            },
            {
                label: 'Поддержка',
                href: '/api/companies/{id}/modules/support/tickets',
                childrens: [
                    { label: 'Список тикетов', href: '/api/companies/{id}/modules/support/tickets', method: 'GET' },
                    { label: 'Создать', href: '/api/companies/{id}/modules/support/tickets', method: 'POST' },
                    { label: 'Тикет', href: '/api/companies/{id}/modules/support/tickets/{ticketId}', method: 'GET' },
                    { label: 'Обновить статус', href: '/api/companies/{id}/modules/support/tickets/{ticketId}', method: 'PATCH' },
                    { label: 'Сообщения', href: '/api/companies/{id}/modules/support/tickets/{ticketId}/messages', method: 'GET' },
                    { label: 'Отправить', href: '/api/companies/{id}/modules/support/tickets/{ticketId}/messages', method: 'POST' },
                    { label: 'Прочитано', href: '/api/companies/{id}/modules/support/tickets/{ticketId}/messages/{messageId}', method: 'PATCH' },
                    // { label: 'WebSocket', href: '/api/companies/{id}/modules/support/tickets/{ticketId}/messages/ws', method: 'GET' }
                ]
            },
            {
                label: 'Персонал (HRM)',
                href: '/api/companies/{id}/modules/hrm',
                childrens: [
                    { label: 'Отчёт', href: '/api/companies/{id}/modules/hrm/report', method: 'POST' },
                    {
                        label: 'Сотрудники',
                        href: '/api/companies/{id}/modules/hrm/employees',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/hrm/employees', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/hrm/employees', method: 'POST' },
                            { label: 'Карточка', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}', method: 'GET' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}/deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}/activate', method: 'POST' },
                            { label: 'Привязать аккаунт', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}/link-account', method: 'POST' },
                            { label: 'Отвязать аккаунт', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}/unlink-account', method: 'POST' },
                            { label: 'Назначить должность', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}/link-position', method: 'POST' },
                            { label: 'Снять с должности', href: '/api/companies/{id}/modules/hrm/employees/{employeeId}/unlink-position', method: 'POST' }
                        ]
                    },
                    {
                        label: 'Должности',
                        href: '/api/companies/{id}/modules/hrm/positions',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/hrm/positions', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/hrm/positions', method: 'POST' },
                            { label: 'Карточка', href: '/api/companies/{id}/modules/hrm/positions/{positionId}', method: 'GET' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/hrm/positions/{positionId}', method: 'PATCH' },
                            { label: 'Удалить', href: '/api/companies/{id}/modules/hrm/positions/{positionId}', method: 'DELETE' }
                        ]
                    },
                    {
                        label: 'Аналитика',
                        href: '/api/companies/{id}/modules/hrm/analysis',
                        childrens: [
                            { label: 'Сводка', href: '/api/companies/{id}/modules/hrm/analysis/summary', method: 'GET' },
                            { label: 'Группировка', href: '/api/companies/{id}/modules/hrm/analysis/grouped', method: 'GET' }
                        ]
                    }
                ]
            },
            {
                label: 'Финансы (FM)',
                href: '/api/companies/{id}/modules/fm',
                childrens: [
                    {
                        label: 'Прогнозирование',
                        href: '/api/companies/{id}/modules/fm/forecast',
                        childrens: [
                            { label: 'График', href: '/api/companies/{id}/modules/fm/forecast/timeline', method: 'GET' },
                            { label: 'Сводка', href: '/api/companies/{id}/modules/fm/forecast/summary', method: 'GET' }
                        ]
                    },
                    { label: 'Отчёт', href: '/api/companies/{id}/modules/fm/report', method: 'POST' },
                    {
                        label: 'Транзакции',
                        href: '/api/companies/{id}/modules/fm/transactions',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/fm/transactions', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/fm/transactions', method: 'POST' },
                            { label: 'Детали', href: '/api/companies/{id}/modules/fm/transactions/{transactionId}', method: 'GET' },
                            { label: 'Сторнировать', href: '/api/companies/{id}/modules/fm/transactions/{transactionId}/reverse', method: 'POST' },
                            {
                                label: 'Категории',
                                href: '/api/companies/{id}/modules/fm/transactions/categories',
                                childrens: [
                                    { label: 'Список', href: '/api/companies/{id}/modules/fm/transactions/categories', method: 'GET' },
                                    { label: 'Создать', href: '/api/companies/{id}/modules/fm/transactions/categories', method: 'POST' },
                                    { label: 'Детали', href: '/api/companies/{id}/modules/fm/transactions/categories/{categoryId}', method: 'GET' },
                                    { label: 'Обновить', href: '/api/companies/{id}/modules/fm/transactions/categories/{categoryId}', method: 'PATCH' },
                                    { label: 'Удалить', href: '/api/companies/{id}/modules/fm/transactions/categories/{categoryId}', method: 'DELETE' }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Аналитика',
                        href: '/api/companies/{id}/modules/fm/analysis',
                        childrens: [
                            { label: 'Сводка', href: '/api/companies/{id}/modules/fm/analysis/summary', method: 'GET' },
                            { label: 'Группировка', href: '/api/companies/{id}/modules/fm/analysis/grouped', method: 'GET' }
                        ]
                    },
                    {
                        label: 'Контрагенты',
                        href: '/api/companies/{id}/modules/fm/counterparties',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/fm/counterparties', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/fm/counterparties', method: 'POST' },
                            { label: 'Детали', href: '/api/companies/{id}/modules/fm/counterparties/{counterpartyId}', method: 'GET' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/fm/counterparties/{counterpartyId}', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/companies/{id}/modules/fm/counterparties/{counterpartyId}/deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/companies/{id}/modules/fm/counterparties/{counterpartyId}/activate', method: 'POST' }
                        ]
                    },
                    {
                        label: 'Кредиты',
                        href: '/api/companies/{id}/modules/fm/credits',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/fm/credits', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/fm/credits', method: 'POST' },
                            { label: 'Детали', href: '/api/companies/{id}/modules/fm/credits/{creditId}', method: 'GET' },
                            { label: 'Транзакции', href: '/api/companies/{id}/modules/fm/credits/{creditId}/transactions', method: 'GET' },
                            { label: 'Платёж', href: '/api/companies/{id}/modules/fm/credits/{creditId}/pay', method: 'POST' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/fm/credits/{creditId}', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/companies/{id}/modules/fm/credits/{creditId}/deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/companies/{id}/modules/fm/credits/{creditId}/activate', method: 'POST' }
                        ]
                    }
                ]
            },
            {
                label: 'Клиенты (CRM)',
                href: '/api/companies/{id}/modules/crm',
                childrens: [
                    { label: 'Отчёт', href: '/api/companies/{id}/modules/crm/report', method: 'POST' },
                    {
                        label: 'Источники',
                        href: '/api/companies/{id}/modules/crm/sources',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/crm/sources', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/crm/sources', method: 'POST' },
                            { label: 'Детали', href: '/api/companies/{id}/modules/crm/sources/{sourceId}', method: 'GET' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/crm/sources/{sourceId}', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/companies/{id}/modules/crm/sources/{sourceId}/deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/companies/{id}/modules/crm/sources/{sourceId}/activate', method: 'POST' }
                        ]
                    },
                    {
                        label: 'Клиенты',
                        href: '/api/companies/{id}/modules/crm/clients',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/crm/clients', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/crm/clients', method: 'POST' },
                            { label: 'Детали', href: '/api/companies/{id}/modules/crm/clients/{clientId}', method: 'GET' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/crm/clients/{clientId}', method: 'PATCH' },
                            { label: 'Деактивировать', href: '/api/companies/{id}/modules/crm/clients/{clientId}/deactivate', method: 'POST' },
                            { label: 'Активировать', href: '/api/companies/{id}/modules/crm/clients/{clientId}/activate', method: 'POST' }
                        ]
                    },
                    {
                        label: 'Аналитика',
                        href: '/api/companies/{id}/modules/crm/analysis',
                        childrens: [
                            { label: 'Сводка', href: '/api/companies/{id}/modules/crm/analysis/summary', method: 'GET' },
                            { label: 'Группировка', href: '/api/companies/{id}/modules/crm/analysis/grouped', method: 'GET' }
                        ]
                    }
                ]
            },
            {
                label: 'Склад (WM)',
                href: '/api/companies/{id}/modules/wm',
                childrens: [
                    { label: 'Отчёт', href: '/api/companies/{id}/modules/wm/report', method: 'POST' },
                    {
                        label: 'Каталог',
                        href: '/api/companies/{id}/modules/wm/catalog',
                        childrens: [
                            {
                                label: 'Категории',
                                href: '/api/companies/{id}/modules/wm/catalog/categories',
                                childrens: [
                                    { label: 'Список', href: '/api/companies/{id}/modules/wm/catalog/categories', method: 'GET' },
                                    { label: 'Создать', href: '/api/companies/{id}/modules/wm/catalog/categories', method: 'POST' },
                                    { label: 'Детали', href: '/api/companies/{id}/modules/wm/catalog/categories/{categoryId}', method: 'GET' },
                                    { label: 'Обновить', href: '/api/companies/{id}/modules/wm/catalog/categories/{categoryId}', method: 'PATCH' },
                                    { label: 'Деактивировать', href: '/api/companies/{id}/modules/wm/catalog/categories/{categoryId}/deactivate', method: 'POST' },
                                    { label: 'Активировать', href: '/api/companies/{id}/modules/wm/catalog/categories/{categoryId}/activate', method: 'POST' }
                                ]
                            },
                            {
                                label: 'Товары',
                                href: '/api/companies/{id}/modules/wm/catalog/units',
                                childrens: [
                                    { label: 'Список', href: '/api/companies/{id}/modules/wm/catalog/units', method: 'GET' },
                                    { label: 'Создать', href: '/api/companies/{id}/modules/wm/catalog/units', method: 'POST' },
                                    { label: 'Детали', href: '/api/companies/{id}/modules/wm/catalog/units/{unitId}', method: 'GET' },
                                    { label: 'Обновить', href: '/api/companies/{id}/modules/wm/catalog/units/{unitId}', method: 'PATCH' },
                                    { label: 'Деактивировать', href: '/api/companies/{id}/modules/wm/catalog/units/{unitId}/deactivate', method: 'POST' },
                                    { label: 'Активировать', href: '/api/companies/{id}/modules/wm/catalog/units/{unitId}/activate', method: 'POST' }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Склад',
                        href: '/api/companies/{id}/modules/wm/stocks',
                        childrens: [
                            { label: 'Остатки', href: '/api/companies/{id}/modules/wm/stocks/balance', method: 'GET' },
                            {
                                label: 'Партии',
                                href: '/api/companies/{id}/modules/wm/stocks/batches',
                                childrens: [
                                    { label: 'Список', href: '/api/companies/{id}/modules/wm/stocks/batches', method: 'GET' },
                                    { label: 'Создать', href: '/api/companies/{id}/modules/wm/stocks/batches', method: 'POST' },
                                    { label: 'Детали', href: '/api/companies/{id}/modules/wm/stocks/batches/{batchId}', method: 'GET' }
                                ]
                            },
                            {
                                label: 'Позиции',
                                href: '/api/companies/{id}/modules/wm/stocks/positions',
                                childrens: [
                                    { label: 'Список', href: '/api/companies/{id}/modules/wm/stocks/positions', method: 'GET' },
                                    { label: 'Детали', href: '/api/companies/{id}/modules/wm/stocks/positions/{positionId}', method: 'GET' }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Сделки (DM)',
                href: '/api/companies/{id}/modules/dm',
                childrens: [
                    {
                        label: 'Типы',
                        href: '/api/companies/{id}/modules/dm/types',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/dm/types', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/dm/types', method: 'POST' },
                            { label: 'Детали', href: '/api/companies/{id}/modules/dm/types/{typeId}', method: 'GET' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/dm/types/{typeId}', method: 'PATCH' },
                            { label: 'Удалить', href: '/api/companies/{id}/modules/dm/types/{typeId}', method: 'DELETE' }
                        ]
                    },
                    {
                        label: 'Статусы',
                        href: '/api/companies/{id}/modules/dm/statuses',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/dm/statuses', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/dm/statuses', method: 'POST' },
                            { label: 'Пересортировать', href: '/api/companies/{id}/modules/dm/statuses/reorder', method: 'PUT' },
                            { label: 'Детали', href: '/api/companies/{id}/modules/dm/statuses/{statusId}', method: 'GET' },
                            { label: 'Обновить', href: '/api/companies/{id}/modules/dm/statuses/{statusId}', method: 'PATCH' },
                            { label: 'Удалить', href: '/api/companies/{id}/modules/dm/statuses/{statusId}', method: 'DELETE' }
                        ]
                    },
                    {
                        label: 'Сделки',
                        href: '/api/companies/{id}/modules/dm/deals',
                        childrens: [
                            { label: 'Список', href: '/api/companies/{id}/modules/dm/deals', method: 'GET' },
                            { label: 'Создать', href: '/api/companies/{id}/modules/dm/deals', method: 'POST' },
                            {
                                label: 'Сделка',
                                href: '/api/companies/{id}/modules/dm/deals/{dealId}',
                                childrens: [
                                    { label: 'Детали', href: '/api/companies/{id}/modules/dm/deals/{dealId}', method: 'GET' },
                                    { label: 'Обновить', href: '/api/companies/{id}/modules/dm/deals/{dealId}', method: 'PATCH' },
                                    { label: 'Удалить', href: '/api/companies/{id}/modules/dm/deals/{dealId}', method: 'DELETE' },
                                    { label: 'Накладная', href: '/api/companies/{id}/modules/dm/deals/{dealId}/invoice', method: 'POST' },
                                    {
                                        label: 'Транзакции сделки',
                                        href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions',
                                        childrens: [
                                            { label: 'Список', href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions', method: 'GET' },
                                            { label: 'Создать', href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions', method: 'POST' },
                                            { label: 'Сводка', href: '/api/companies/{id}/modules/dm/deals/{dealId}/transactions/summary', method: 'GET' }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Аналитика',
                        href: '/api/companies/{id}/modules/dm/analysis',
                        childrens: [
                            { label: 'Сводка', href: '/api/companies/{id}/modules/dm/analysis/summary', method: 'GET' },
                            { label: 'Группировка', href: '/api/companies/{id}/modules/dm/analysis/grouped', method: 'GET' },
                            { label: 'Фин. сводка', href: '/api/companies/{id}/modules/dm/analysis/financial-summary', method: 'GET' }
                        ]
                    }
                ]
            }
        ]
    }
];