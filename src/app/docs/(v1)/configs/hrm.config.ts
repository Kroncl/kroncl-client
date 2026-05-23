import { DocsNavSectionProps } from "../../components/panel/components/nav-section/section";
import { DOCS_LINK_HRM_DOCS } from "../internal.config";

export const hrmSections: DocsNavSectionProps[] = [
    {
        label: 'Сотрудники',
        href: '/docs/companies/modules/hrm/employees'
    },
    {
        label: 'Должности',
        href: '/docs/companies/modules/hrm/positions'
    },
    {
        label: 'Отчёты',
        href: DOCS_LINK_HRM_DOCS
    },
]