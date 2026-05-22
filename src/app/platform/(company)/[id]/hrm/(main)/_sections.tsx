import { PlatformHeadSection } from "@/app/platform/components/lib/head/_types";

export const sections = (companyId: string): PlatformHeadSection[] => {
    return ([
        { 
            label: 'База сотрудников',
            value: 'employees',
            href: `/platform/${companyId}/hrm`,
            exact: true
        },
        {
            label: 'Должности',
            value: 'positions',
            href: `/platform/${companyId}/hrm/positions`,
            exact: true
        },
        {
            label: 'Отчёты',
            value: 'reports',
            href: `/platform/${companyId}/hrm/reports`,
            exact: true
        }
    ]);
}