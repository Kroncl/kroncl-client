import { DocsNavSectionProps } from "../components/panel/components/nav-section/section";

export const navigationSections: DocsNavSectionProps[] = [
    {
        label: "Начало работы",
        href: "/docs/getting-started",
        childrens: [
            {
                label: "Введение",
                href: "/docs/getting-started/introduction"
            },
            {
                label: "Быстрый старт",
                href: "/docs/getting-started/quickstart"
            },
            {
                label: "Создание компании",
                href: "/docs/getting-started/create-company",
                childrens: [
                    {
                        label: "Введение",
                        href: "/docs/getting-started/introduction"
                    },
                    {
                        label: "Быстрый старт",
                        href: "/docs/getting-started/quickstart"
                    },
                    {
                        label: "Создание компании",
                        href: "/docs/getting-started/create-company"
                    }
                ]
            }
        ]
    },
    {
        label: "Модули",
        href: "/docs/modules",
        childrens: [
            {
                label: "Сделки (DM)",
                href: "/docs/modules/dm"
            },
            {
                label: "Клиенты (CRM)",
                href: "/docs/modules/crm"
            },
            {
                label: "Финансы (FM)",
                href: "/docs/modules/fm"
            },
            {
                label: "Каталог (WM)",
                href: "/docs/modules/wm"
            },
            {
                label: "Сотрудники (HRM)",
                href: "/docs/modules/hrm"
            }
        ]
    },
    {
        label: "API",
        href: "/docs/api",
        childrens: [
            {
                label: "Аутентификация",
                href: "/docs/api/auth"
            },
            {
                label: "Эндпоинты",
                href: "/docs/api/endpoints"
            },
            {
                label: "Webhooks",
                href: "/docs/api/webhooks"
            }
        ]
    },
    {
        label: "Поддержка",
        href: "/docs/support",
        childrens: [
            {
                label: "FAQ",
                href: "/docs/support/faq"
            },
            {
                label: "Контакты",
                href: "/docs/support/contacts"
            }
        ]
    }
];