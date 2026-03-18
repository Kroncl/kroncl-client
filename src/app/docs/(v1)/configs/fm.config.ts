import { DocsNavSectionProps } from "../../components/panel/components/nav-section/section";

export const fmSections: DocsNavSectionProps[] = [
    {
        label: 'Операции',
        href: '/',
        childrens: [
            {
                label: 'Баланс предприятия',
                href: '/'
            },
            {
                label: 'Отмена операции',
                href: '/'
            }
        ]
    },
    {
        label: 'Долговые обязательства',
        href: '/',
        childrens: [
            {
                label: 'Контрагенты',
                href: '/'
            },
            {
                label: 'Кредиты & Дебеты',
                href: '/'
            },
        ]
    }
]