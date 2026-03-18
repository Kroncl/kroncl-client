import { DocsNavSectionProps } from "../../components/panel/components/nav-section/section";

export const wmSections: DocsNavSectionProps[] = [
    {
        label: 'Каталог',
        href: '/',
        childrens: [
            {
                label: 'Категории',
                href: '/'
            },
            {
                label: 'Товарные позиции',
                href: '/'
            }
        ]
    },
    {
        label: 'Движение товаров',
        href: '/',
        childrens: [
            {
                label: 'Поставки & Отгрузки',
                href: '/'
            },
            {
                label: 'Типы складского учёта',
                href: '/'
            }
        ]
    },
    {
        label: 'Анализ',
        href: '/',
        childrens: [
            {
                label: 'Анализ остатков',
                href: '/'
            },
            {
                label: 'Анализ каталога',
                href: '/'
            }
        ]
    }
]