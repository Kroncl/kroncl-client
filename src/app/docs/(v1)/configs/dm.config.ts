import { DocsNavSectionProps } from "../../components/panel/components/nav-section/section";

export const dmSections: DocsNavSectionProps[] = [
    {
        label: 'Канбан',
        href: '/'
    },
    {
        label: 'Сделка',
        href: '/',
        childrens: [
            {
                label: 'Создание',
                href: '/'
            },
            {
                label: 'Расчёт',
                href: '/'
            }
        ]
    },
    {
        label: 'Статусы сделок',
        href: '/'
    },
    {
        label: 'Типы сделок',
        href: '/'
    }
]