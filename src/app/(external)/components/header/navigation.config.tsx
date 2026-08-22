import Clients from "@/assets/ui-kit/icons/clients";
import Code from "@/assets/ui-kit/icons/code";
import History from "@/assets/ui-kit/icons/history";
import Kanban from "@/assets/ui-kit/icons/kanban";
import Keyhole from "@/assets/ui-kit/icons/keyhole";
import Team from "@/assets/ui-kit/icons/team";
import TwoCards from "@/assets/ui-kit/icons/two-cards";
import Upload from "@/assets/ui-kit/icons/upload";
import Wallet from "@/assets/ui-kit/icons/wallet";
import Business from "@/assets/ui-kit/icons/business";
import Cloud from "@/assets/ui-kit/icons/cloud";
import Graph from "@/assets/ui-kit/icons/graph";
import Home from "@/assets/ui-kit/icons/home";
import Star from "@/assets/ui-kit/icons/star";
import { NavigationSection } from "@/assets/utils/sections";
import { MenuProps } from "./modal-menu/_types";
import Package from "@/assets/ui-kit/icons/package";

export interface NavigationItem extends NavigationSection {
    name: string;
    menu?: MenuProps;
}

// Стили для иконок в меню
const iconStyles = { width: 16, height: 16 };

export const navigationConfig: NavigationItem[] = [
    {
        name: 'Решения',
        href: '/modules',
        menu: {
            preview: {
                title: 'Инструменты малого бизнеса на каждый день',
                description: 'Рабочее пространство для всех сотрудников. В браузере. Вне зависимости от размера компании.',
                actions: [
                    {
                        children: 'Создать компанию',
                        variant: 'green',
                        border: 'round',
                        as: 'link',
                        href: '/product/start',
                        text: 'bold'
                    }
                ]
            },
            content: {
                items: [
                    {
                        icon: <Wallet />,
                        title: 'Финансы',
                        href: '/products/',
                        description: `
                        Управление финансами предприятия. Кошелёк компании. Дебет & Кредит. Операции в 16 валютах.
                        `,
                        links: [
                            { href: '/product/roadmap', children: 'Дорожная карта' },
                            { href: '/product/sprints', children: 'Спринты' },
                            { href: '/product/tasks', children: 'Управление задачами' },
                            { href: '/product/backlog', children: 'Бэклог' },
                        ]
                    },
                    {
                        icon: <Team />,
                        title: 'Сотрудники & Команда',
                        description: 'Управление штатом сотрудников. Планирование рабочего календаря, фонда оплаты труда. Календарь загруженности. Распределение задач.',
                        links: [
                            { href: '/product/frontend', children: 'Frontend' },
                            { href: '/product/backend', children: 'Backend' },
                            { href: '/product/database', children: 'Базы данных' },
                            { href: '/product/api', children: 'API' },
                            { href: '/product/testing', children: 'Тестирование' },
                        ]
                    },
                    {
                        icon: <Kanban />,
                        title: 'Сделки',
                        description: 'Управление сделками. Воронка заказов, назначение ответственных сотрудников, создание накладных, бюджет сделки, автоматическое создание прихода после завершения. Кастомизируйте воронку под структуру своей компании: настривайте статусы, добавляйте комментарии.',
                        links: [
                            { href: '/product/auth', children: 'Аутентификация' },
                            { href: '/product/encryption', children: 'Шифрование' },
                            { href: '/product/security-audit', children: 'Аудит безопасности' },
                            { href: '/product/compliance', children: 'Соответствие стандартам' },
                        ]
                    },
                    {
                        icon: <Business />,
                        title: 'Контрагенты & Поставщики',
                        description: 'Быстрый поиск по базам реквизитов юридических лиц. Учёт контрагентов, двустороннего оборота.',
                        links: [
                            { href: '/product/deploy', children: 'Деплой' },
                            { href: '/product/ci-cd', children: 'CI/CD' },
                            { href: '/product/monitoring', children: 'Мониторинг' },
                            { href: '/product/logs', children: 'Логирование' },
                            { href: '/product/analytics', children: 'Аналитика' },
                        ]
                    },
                    {
                        icon: <Clients />,
                        title: 'Клиенты',
                        description: 'Управление',
                        links: [
                            { href: '/product/team', children: 'Управление командой' },
                            { href: '/product/collaboration', children: 'Коллаборация' },
                            { href: '/product/communication', children: 'Коммуникация' },
                            { href: '/product/code-review', children: 'Code Review' },
                        ]
                    },
                    {
                        icon: <Package />,
                        title: 'Каталог & Склад',
                        description: 'Управление',
                        links: [
                            { href: '/product/team', children: 'Управление командой' },
                            { href: '/product/collaboration', children: 'Коллаборация' },
                            { href: '/product/communication', children: 'Коммуникация' },
                            { href: '/product/code-review', children: 'Code Review' },
                        ]
                    },
                ]
            }
        }
    },
    {
        name: 'Разработчикам',
        href: '/dev',
        menu: {
            preview: {
                title: 'Готовые решения для бизнеса',
                description: 'Выберите готовое решение под ваши задачи и масштабируйте бизнес с нами.',
                actions: [
                    {
                        children: 'Подобрать решение',
                        variant: 'accent',
                        border: 'round',
                        as: 'link',
                        href: '/solutions/choose'
                    }
                ]
            },
            content: {
                items: [
                    {
                        icon: <Business />,
                        title: 'Для бизнеса',
                        description: 'Корпоративные решения для управления и автоматизации.',
                        links: [
                            { href: '/solutions/enterprise', children: 'Enterprise' },
                            { href: '/solutions/smb', children: 'SMB' },
                            { href: '/solutions/startup', children: 'Стартапы' },
                            { href: '/solutions/ecommerce', children: 'E-commerce' },
                        ]
                    },
                    {
                        icon: <Cloud />,
                        title: 'Облачные решения',
                        description: 'Масштабируемые облачные платформы и инфраструктура.',
                        links: [
                            { href: '/solutions/cloud-infrastructure', children: 'Инфраструктура' },
                            { href: '/solutions/saas', children: 'SaaS' },
                            { href: '/solutions/paas', children: 'PaaS' },
                            { href: '/solutions/hybrid-cloud', children: 'Гибридное облако' },
                        ]
                    },
                    {
                        icon: <TwoCards />,
                        title: 'Data & Analytics',
                        description: 'Управление данными и продвинутая аналитика.',
                        links: [
                            { href: '/solutions/data-warehouse', children: 'Хранилище данных' },
                            { href: '/solutions/big-data', children: 'Big Data' },
                            { href: '/solutions/bi', children: 'BI' },
                            { href: '/solutions/ai-ml', children: 'AI/ML' },
                        ]
                    },
                    {
                        icon: <Clients />,
                        title: 'Мобильные решения',
                        description: 'Разработка и поддержка мобильных приложений.',
                        links: [
                            { href: '/solutions/ios', children: 'iOS' },
                            { href: '/solutions/android', children: 'Android' },
                            { href: '/solutions/react-native', children: 'React Native' },
                            { href: '/solutions/flutter', children: 'Flutter' },
                            { href: '/solutions/pwa', children: 'PWA' },
                        ]
                    },
                    {
                        icon: <Home />,
                        title: 'Интеграции',
                        description: 'Готовые интеграции с популярными сервисами и платформами.',
                        links: [
                            { href: '/solutions/crm', children: 'CRM' },
                            { href: '/solutions/erp', children: 'ERP' },
                            { href: '/solutions/payment', children: 'Платежи' },
                            { href: '/solutions/messengers', children: 'Мессенджеры' },
                            { href: '/solutions/ai', children: 'AI-сервисы' },
                        ]
                    },
                ]
            }
        }
    },
    {
        name: 'Документация',
        href: '/docs',
        menu: {
            preview: {
                title: 'Документация и руководства',
                description: 'Полная документация, гайды и референсы для разработчиков.',
                actions: [
                    {
                        children: 'Открыть документацию',
                        variant: 'accent',
                        border: 'round',
                        as: 'link',
                        href: '/docs'
                    }
                ]
            },
            content: {
                items: [
                    {
                        icon: <History />,
                        title: 'Руководства',
                        description: 'Пошаговые гайды и туториалы.',
                        links: [
                            { href: '/docs/getting-started', children: 'Начало работы' },
                            { href: '/docs/quick-start', children: 'Быстрый старт' },
                            { href: '/docs/tutorials', children: 'Туториалы' },
                            { href: '/docs/examples', children: 'Примеры' },
                        ]
                    },
                    {
                        icon: <Code />,
                        title: 'API Reference',
                        description: 'Документация API и SDK.',
                        links: [
                            { href: '/docs/api', children: 'API' },
                            { href: '/docs/sdk', children: 'SDK' },
                            { href: '/docs/webhooks', children: 'Webhooks' },
                            { href: '/docs/graphql', children: 'GraphQL' },
                            { href: '/docs/rest', children: 'REST API' },
                        ]
                    },
                    {
                        icon: <Upload />,
                        title: 'Конфигурация',
                        description: 'Настройка и конфигурация приложения.',
                        links: [
                            { href: '/docs/config', children: 'Конфигурация' },
                            { href: '/docs/environment', children: 'Переменные окружения' },
                            { href: '/docs/deployment', children: 'Деплой' },
                            { href: '/docs/monitoring', children: 'Мониторинг' },
                        ]
                    },
                    {
                        icon: <TwoCards />,
                        title: 'Архитектура',
                        description: 'Архитектурные решения и паттерны.',
                        links: [
                            { href: '/docs/architecture', children: 'Архитектура' },
                            { href: '/docs/patterns', children: 'Паттерны' },
                            { href: '/docs/domain', children: 'Domain-driven design' },
                            { href: '/docs/microservices', children: 'Микросервисы' },
                        ]
                    },
                    {
                        icon: <Star />,
                        title: 'FAQ',
                        description: 'Ответы на частые вопросы.',
                        links: [
                            { href: '/docs/faq', children: 'Частые вопросы' },
                            { href: '/docs/troubleshooting', children: 'Устранение проблем' },
                            { href: '/docs/support', children: 'Поддержка' },
                            { href: '/docs/community', children: 'Сообщество' },
                        ]
                    },
                ]
            }
        }
    },
    {
        name: 'Цены',
        href: '/pricing',
        menu: {
            preview: {
                title: 'Выберите подходящий тариф',
                description: 'Гибкие тарифы для любого размера команды и проекта. Начните бесплатно, развивайтесь с нами.',
                actions: [
                    {
                        children: 'Сравнить тарифы',
                        variant: 'accent',
                        border: 'round',
                        as: 'link',
                        href: '/pricing/compare'
                    },
                    {
                        children: 'Бесплатный пробный период',
                        variant: 'glass',
                        border: 'round',
                        as: 'link',
                        href: '/pricing/trial'
                    }
                ]
            },
            content: {
                items: [
                    {
                        icon: <Team />,
                        title: 'Для стартапов',
                        description: 'Идеально для небольших команд и проектов.',
                        links: [
                            { href: '/pricing/startup', children: 'Стартовый тариф' },
                            { href: '/pricing/free', children: 'Бесплатный тариф' },
                            { href: '/pricing/growth', children: 'Тариф роста' },
                        ]
                    },
                    {
                        icon: <Business />,
                        title: 'Для бизнеса',
                        description: 'Масштабируемые тарифы для компаний.',
                        links: [
                            { href: '/pricing/business', children: 'Бизнес-тариф' },
                            { href: '/pricing/enterprise', children: 'Enterprise' },
                            { href: '/pricing/custom', children: 'Индивидуальный тариф' },
                        ]
                    },
                    {
                        icon: <Wallet />,
                        title: 'Для фрилансеров',
                        description: 'Индивидуальные тарифы для независимых разработчиков.',
                        links: [
                            { href: '/pricing/freelancer', children: 'Фриланс-тариф' },
                            { href: '/pricing/solo', children: 'Соло' },
                            { href: '/pricing/pro', children: 'Pro' },
                        ]
                    },
                    {
                        icon: <Upload />,
                        title: 'Дополнительные опции',
                        description: 'Расширьте возможности вашего тарифа.',
                        links: [
                            { href: '/pricing/addons', children: 'Дополнения' },
                            { href: '/pricing/enterprise-addon', children: 'Enterprise-опции' },
                            { href: '/pricing/support', children: 'Поддержка' },
                        ]
                    },
                ]
            }
        }
    },
    {
        name: 'Сообщество',
        href: '/community',
        menu: {
            preview: {
                title: 'Присоединяйтесь к сообществу',
                description: 'Участвуйте в развитии, общайтесь с другими разработчиками и делитесь опытом.',
                actions: [
                    {
                        children: 'Присоединиться',
                        variant: 'accent',
                        border: 'round',
                        as: 'link',
                        href: '/community/join'
                    },
                    {
                        children: 'GitHub',
                        variant: 'glass',
                        border: 'round',
                        as: 'link',
                        href: 'https://github.com'
                    }
                ]
            },
            content: {
                items: [
                    {
                        icon: <Team />,
                        title: 'Сообщество',
                        description: 'Общайтесь и сотрудничайте с другими разработчиками.',
                        links: [
                            { href: '/community/events', children: 'События' },
                            { href: '/community/meetups', children: 'Встречи' },
                            { href: '/community/hackathons', children: 'Хакатоны' },
                            { href: '/community/open-source', children: 'Open Source' },
                        ]
                    },
                    {
                        icon: <Clients />,
                        title: 'Коммуникация',
                        description: 'Каналы общения и поддержки.',
                        links: [
                            { href: 'https://discord.com', children: 'Discord' },
                            { href: 'https://slack.com', children: 'Slack' },
                            { href: 'https://telegram.org', children: 'Telegram' },
                            { href: 'https://reddit.com', children: 'Reddit' },
                            { href: 'https://stackoverflow.com', children: 'Stack Overflow' },
                        ]
                    },
                    {
                        icon: <Star />,
                        title: 'Вклад в проект',
                        description: 'Как внести свой вклад в развитие.',
                        links: [
                            { href: '/community/contribute', children: 'Как помочь' },
                            { href: '/community/bug-bounty', children: 'Bug Bounty' },
                            { href: '/community/feature-requests', children: 'Запросы на фичи' },
                            { href: '/community/translations', children: 'Переводы' },
                        ]
                    },
                    {
                        icon: <Business />,
                        title: 'Партнеры',
                        description: 'Наши партнеры и интеграции.',
                        links: [
                            { href: '/community/partners', children: 'Партнеры' },
                            { href: '/community/ecosystem', children: 'Экосистема' },
                            { href: '/community/ambassadors', children: 'Амбассадоры' },
                            { href: '/community/case-studies', children: 'Истории успеха' },
                        ]
                    },
                ]
            }
        }
    },
    {
        name: 'Android',
        href: '/community',
        menu: {
            preview: {
                title: 'Присоединяйтесь к сообществу',
                description: 'Участвуйте в развитии, общайтесь с другими разработчиками и делитесь опытом.',
                actions: [
                    {
                        children: 'Присоединиться',
                        variant: 'accent',
                        border: 'round',
                        as: 'link',
                        href: '/community/join'
                    },
                    {
                        children: 'GitHub',
                        variant: 'glass',
                        border: 'round',
                        as: 'link',
                        href: 'https://github.com'
                    }
                ]
            },
            content: {
                items: [
                    {
                        icon: <Team />,
                        title: 'Сообщество',
                        description: 'Общайтесь и сотрудничайте с другими разработчиками.',
                        links: [
                            { href: '/community/events', children: 'События' },
                            { href: '/community/meetups', children: 'Встречи' },
                            { href: '/community/hackathons', children: 'Хакатоны' },
                            { href: '/community/open-source', children: 'Open Source' },
                        ]
                    },
                    {
                        icon: <Clients />,
                        title: 'Коммуникация',
                        description: 'Каналы общения и поддержки.',
                        links: [
                            { href: 'https://discord.com', children: 'Discord' },
                            { href: 'https://slack.com', children: 'Slack' },
                            { href: 'https://telegram.org', children: 'Telegram' },
                            { href: 'https://reddit.com', children: 'Reddit' },
                            { href: 'https://stackoverflow.com', children: 'Stack Overflow' },
                        ]
                    },
                    {
                        icon: <Star />,
                        title: 'Вклад в проект',
                        description: 'Как внести свой вклад в развитие.',
                        links: [
                            { href: '/community/contribute', children: 'Как помочь' },
                            { href: '/community/bug-bounty', children: 'Bug Bounty' },
                            { href: '/community/feature-requests', children: 'Запросы на фичи' },
                            { href: '/community/translations', children: 'Переводы' },
                        ]
                    },
                    {
                        icon: <Business />,
                        title: 'Партнеры',
                        description: 'Наши партнеры и интеграции.',
                        links: [
                            { href: '/community/partners', children: 'Партнеры' },
                            { href: '/community/ecosystem', children: 'Экосистема' },
                            { href: '/community/ambassadors', children: 'Амбассадоры' },
                            { href: '/community/case-studies', children: 'Истории успеха' },
                        ]
                    },
                ]
            }
        }
    },
];