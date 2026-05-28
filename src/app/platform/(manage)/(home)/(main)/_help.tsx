import { DOCS_LINK_ACCOUNT_OVERVIEW, DOCS_LINK_COMPANIES, DOCS_LINK_COMPANIES_PRICING, DOCS_LINK_COMPANIES_STORAGE } from "@/app/docs/(v1)/internal.config";

export interface HelpLink {
    href: string;
    title: string;
}

export const helpLinks: HelpLink[] = [
    {
        href: DOCS_LINK_ACCOUNT_OVERVIEW,
        title: 'Что такое учётная запись?'
    },
    {
        href: DOCS_LINK_COMPANIES,
        title: 'Как создать компанию?'
    },
    {
        href: DOCS_LINK_COMPANIES_PRICING,
        title: 'Это бесплатно?'
    },
    {
        href: DOCS_LINK_COMPANIES_STORAGE,
        title: 'Что такое хранилище компании?'
    }
]