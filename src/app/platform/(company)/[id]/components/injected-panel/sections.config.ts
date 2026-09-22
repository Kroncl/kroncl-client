import { useMemo } from "react";
import { PanelSection } from "../../../../components/panel/_types";

export interface Section extends PanelSection {
    lvl: number;
    key?: string;
}

export const PLAN_MIN_LVL = 1;
export const PLAN_MID_LVL = 2;
export const PLAN_MAX_LVL = 3;

export function sectionsList(companyId: string, lvl: number): Section[] {
    return allSections(companyId).filter(section => section.lvl >= lvl);
}

export function useSections(companyId: string, lvl: number): Section[] {
    return useMemo(() => sectionsList(companyId, lvl), [companyId, lvl]);
}

function allSections(companyId: string): Section[] {
    return ([
    {
        name: 'Сводка',
        href: `/platform/${companyId}`,
        icon: 'home',
        exact: true,
        lvl: PLAN_MAX_LVL
    },
    {
        key: 'deals_total',
        name: 'Сделки',
        href: `/platform/${companyId}/dm`,
        icon: 'deals',
        lvl: PLAN_MIN_LVL
    },
    {
        key: 'clients_total',
        name: 'Клиенты',
        href: `/platform/${companyId}/crm`,
        icon: 'clients',
        lvl: PLAN_MID_LVL
    },
    {
        name: 'Финансы',
        href: `/platform/${companyId}/fm`,
        icon: 'wallet',
        lvl: PLAN_MAX_LVL
    },
    {
        key: 'units_total',
        name: 'Каталог',
        href: `/platform/${companyId}/wm/catalog`,
        icon: 'catalog',
        lvl: PLAN_MID_LVL
    },
    {
        name: 'Склад',
        href: `/platform/${companyId}/wm/warehouse`,
        icon: 'warehouse',
        lvl: PLAN_MID_LVL
    },
    {
        key: 'employees_total',
        name: 'Сотрудники',
        href: `/platform/${companyId}/hrm`,
        icon: 'team',
        lvl: PLAN_MAX_LVL
    },
    {
        name: 'Документы',
        href: `/platform/${companyId}/docs`,
        icon: 'files',
        lvl: PLAN_MAX_LVL
    },
    {
        name: 'Активность',
        href: `/platform/${companyId}/activity`,
        icon: 'activity',
        lvl: PLAN_MAX_LVL
    },
    {
        name: 'Доступы',
        href: `/platform/${companyId}/accounts`,
        icon: 'accesses',
        lvl: PLAN_MAX_LVL
    },
    {
        name: 'Хранилище',
        href: `/platform/${companyId}/storage`,
        icon: 'storage',
        lvl: PLAN_MAX_LVL
    },
    {
        name: 'Поддержка',
        href: `/platform/${companyId}/support`,
        icon: 'support',
        lvl: PLAN_MAX_LVL
    }
    ])
};