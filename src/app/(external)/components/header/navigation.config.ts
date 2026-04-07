import { NavigationSection } from "@/assets/utils/sections";

export interface NavigationItem extends NavigationSection {
    name: string;
    out: boolean;
    href: string;
};

export const navigationConfig: NavigationItem[] = [
    {
        name: 'Продукт',
        href: '/product',
        out: false,
    },
    {
        name: 'Предпринимателям',
        href: '/businessmans',
        out: false,
    },
    {
        name: 'Тарифы',
        href: '/pricing',
        out: false,
    },
    {
        name: 'Документация',
        href: '/docs',
        out: true,
    },
    {
        name: 'Разработчикам',
        href: 'dev',
        out: false,
    }
];