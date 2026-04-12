import { NavigationSection } from "@/assets/utils/sections";

export interface NavigationItem extends NavigationSection {
    title: string;
    description?: string;
}

export const PAPERS_LINK_POLICY_PRIVACY = '/privacy-policy';
export const PAPERS_LINK_PLATFORM_USAGE = '/platform-usage';

export const navigationList: NavigationItem[] = [
    {
        title: 'Политика конфиденциальности',
        href: '/privacy-polocy'
    },
    {
        title: 'Правила использования платформы',
        href: '/platform-usage'
    }
] 