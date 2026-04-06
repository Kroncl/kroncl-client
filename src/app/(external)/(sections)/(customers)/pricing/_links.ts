import { QuickLink } from "@/app/(external)/components/quick-links/quick-links";
import { DOCS_LINK_COMPANIES_PRICING } from "@/app/docs/(v1)/internal.config";

export const linksList: QuickLink[] = [
    {
        capture: 'Подробнее о тарифах',
        href: DOCS_LINK_COMPANIES_PRICING
    }
]