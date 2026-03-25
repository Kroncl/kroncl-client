import { DocsNavSectionProps } from "../../components/panel/components/nav-section/section";

export const fmSections: DocsNavSectionProps[] = [
    {
        label: 'Операции',
        href: '/docs/companies/modules/fm/operations',
        childrens: [
            {
                label: 'Категории',
                href: '/docs/companies/modules/fm/operations/categories'
            },
            {
                label: 'Баланс предприятия',
                href: '/docs/companies/modules/fm/operations/balance'
            },
            {
                label: 'Анализ',
                href: '/docs/companies/modules/fm/operations/analysis'
            }
        ]
    },
    {
        label: 'Долговые обязательства',
        href: '/docs/companies/modules/fm/debt-obligations',
        childrens: [
            {
                label: 'Контрагенты',
                href: '/docs/companies/modules/fm/debt-obligations/counterparties'
            },
            {
                label: 'Кредиты & Дебеты',
                href: '/docs/companies/modules/fm/debt-obligations/credits-debts'
            },
        ]
    }
]