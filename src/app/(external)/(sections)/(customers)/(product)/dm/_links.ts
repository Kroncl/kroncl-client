import { QuickLink } from "@/app/(external)/components/quick-links/quick-links";
import { DOCS_LINK, DOCS_LINK_COMPANIES, DOCS_LINK_COMPANIES_PRICING, DOCS_LINK_DM, DOCS_LINK_DM_ANALYSIS, DOCS_LINK_DM_DEALS, DOCS_LINK_DM_STATUSES, DOCS_LINK_DM_TYPES, DOCS_LINK_MODULES } from "@/app/docs/(v1)/internal.config";

export const linksList: QuickLink[] = [
    {
        capture: 'Введение в модуль',
        href: DOCS_LINK_DM
    },
    {
        capture: 'Статусы',
        href: DOCS_LINK_DM_STATUSES
    },
    {
        capture: 'Типы',
        href: DOCS_LINK_DM_TYPES
    },
    {
        capture: 'Сделки',
        href: DOCS_LINK_DM_DEALS
    },
    {
        capture: 'Анализ',
        href: DOCS_LINK_DM_ANALYSIS
    },
]