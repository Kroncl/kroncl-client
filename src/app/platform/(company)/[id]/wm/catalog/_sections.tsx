import { PlatformFormSectionProps } from "@/app/platform/components/lib/form/_types";
import { PlatformHeadSection } from "@/app/platform/components/lib/head/_types";

export const sectionsList = (companyId: string): PlatformHeadSection[] => {
    return ([
        {
            label: 'Товарное предложение',
            href: `/platform/${companyId}/wm/catalog`,
            exact: true
        },
        {
            label: 'Коды производителей',
            href: `/platform/${companyId}/wm/catalog/barcodes`,
            exact: true
        },
        {
            label: 'Отчёты',
            href: `/platform/${companyId}/wm/catalog/reports`,
            strongParams: true,
        },
    ]);
}