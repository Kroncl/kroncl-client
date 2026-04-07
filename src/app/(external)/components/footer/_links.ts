import { DOCS_LINK_ACCOUNT, DOCS_LINK_ACCOUNT_OVERVIEW, DOCS_LINK_ACCOUNT_SECURITY, DOCS_LINK_COMPANIES, DOCS_LINK_COMPANIES_ACCESSES, DOCS_LINK_COMPANIES_LOGS, DOCS_LINK_COMPANIES_PRICING, DOCS_LINK_COMPANIES_STORAGE, DOCS_LINK_CRM, DOCS_LINK_DM, DOCS_LINK_FM, DOCS_LINK_HRM, DOCS_LINK_QUICK_START } from "@/app/docs/(v1)/internal.config";
import { authLinks } from "@/config/links.config";

export interface FooterLink {
    capture: string;
    href: string;
}

export interface FooterGroup {
    capture?: string;
    links: FooterLink[];
}

export const linksList: FooterGroup[] = [
    {
        capture: 'Платформа',
        links: [
            { capture: 'Финансы', href: DOCS_LINK_FM },
            { capture: 'Клиенты', href: DOCS_LINK_CRM },
            { capture: 'Каталог & Склад', href: DOCS_LINK_DM },
            { capture: 'Сотрудники', href: DOCS_LINK_HRM },
            { capture: 'Сделки', href: DOCS_LINK_DM }
        ]
    },
    {
        capture: 'Предпринимателям',
        links: [
            { capture: 'Быстрый старт', href: DOCS_LINK_QUICK_START },
            { capture: 'Организации', href: DOCS_LINK_COMPANIES },
            { capture: 'Тарификация', href: DOCS_LINK_COMPANIES_PRICING },
            { capture: 'Доступы', href: DOCS_LINK_COMPANIES_ACCESSES },
            { capture: 'Мониторинг действий', href: DOCS_LINK_COMPANIES_LOGS },
            { capture: 'Хранилище', href: DOCS_LINK_COMPANIES_STORAGE },
        ]
    },
    {
        capture: 'Аккаунт',
        links: [
            { capture: 'Вход в учётную запись', href: authLinks.login },
            { capture: 'Регистрация', href: authLinks.registration },
            { capture: 'Об аккаунте', href: DOCS_LINK_ACCOUNT },
            { capture: 'Возможности', href: DOCS_LINK_ACCOUNT_OVERVIEW },
            { capture: 'Безопасность', href: DOCS_LINK_ACCOUNT_SECURITY },
        ]
    },
    {
        capture: 'Другое',
        links: [
            { capture: 'Поддержка', href: '/support' },
            { capture: 'Разработчикам', href: '/dev' },
            { capture: 'Тарифы', href: '/pricing' },
            { capture: 'Стать партнёром', href: '/become-partner' },
        ]
    },
]