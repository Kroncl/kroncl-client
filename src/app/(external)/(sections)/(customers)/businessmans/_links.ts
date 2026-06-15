import { QuickLink } from "@/app/(external)/components/quick-links/quick-links";
import { DOCS_LINK_COMPANIES, DOCS_LINK_COMPANIES_ACCESSES, DOCS_LINK_COMPANIES_LOGS, DOCS_LINK_COMPANIES_PRICING } from "@/app/docs/(v1)/internal.config";

export const linksList: QuickLink[] = [
    {
        capture: 'Как создать компанию?',
        href: DOCS_LINK_COMPANIES
    },
    {
        capture: 'Тарификация',
        href: DOCS_LINK_COMPANIES_PRICING
    },
    {
        capture: 'Доступы',
        href: DOCS_LINK_COMPANIES_ACCESSES
    },
    {
        capture: 'Мониторинг активности',
        href: DOCS_LINK_COMPANIES_LOGS
    }
]