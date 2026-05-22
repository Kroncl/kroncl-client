import { PlatformFormSectionProps } from "@/app/platform/components/lib/form/_types";
import { PlatformHeadSection } from "@/app/platform/components/lib/head/_types";

export const sectionsList = (companyId: string): PlatformHeadSection[] => {
    return ([
        {
            label: 'Документы',
            href: `/platform/${companyId}/docs`,
            exact: true
        },
        {
            label: 'Настройки документов',
            href: `/platform/${companyId}/docs/settings`,
            strongParams: true,
        }
    ]);
}