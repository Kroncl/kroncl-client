import { PanelSection } from "../../../../components/panel/_types";

interface PanelSectionWithKey extends PanelSection {
    key?: string;
}

export const sectionsList = (): PanelSectionWithKey[] => {
    return ([
        {
            key: 'home',
            name: 'Главная',
            href: '/platform',
            icon: 'home',
            exact: true
        },
        {
            key: 'account',
            name: 'Аккаунт',
            href: '/platform/account',
            icon: 'account'
        },
        {
            key: 'organizations_count',
            name: 'Организации',
            href: '/platform/companies',
            icon: 'collection'
        },
        {
            key: 'invitations_count',
            name: 'Приглашения',
            href: '/platform/invitations',
            icon: 'invitations'
        },
        {
            // key: 'fingerprints_count',
            name: 'Безопасность',
            href: '/platform/security',
            icon: 'keyhole'
        },
    ]);
}