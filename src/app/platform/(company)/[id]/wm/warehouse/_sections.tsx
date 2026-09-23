import { PlatformFormSectionProps } from "@/app/platform/components/lib/form/_types";
import { PlatformHeadSection } from "@/app/platform/components/lib/head/_types";

export const sectionsList = (companyId: string): PlatformHeadSection[] => {
    return ([
        {
            label: 'Поставки & Отгрузки',
            href: `/platform/${companyId}/wm/warehouse`,
            exact: true
        },
        {
            label: 'Остатки',
            href: `/platform/${companyId}/wm/warehouse/stocks`,
            strongParams: true,
        },
        {
            label: 'Отчёты',
            href: `/platform/${companyId}/wm/warehouse/reports`,
            strongParams: true,
        },
    ]);
}