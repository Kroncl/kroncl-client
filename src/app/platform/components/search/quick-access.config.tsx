import Account from "@/assets/ui-kit/icons/account";
import Collection from "@/assets/ui-kit/icons/collection";
import Keyhole from "@/assets/ui-kit/icons/keyhole";
import Settings from "@/assets/ui-kit/icons/settings";
import Upload from "@/assets/ui-kit/icons/upload";

export const quickAccess = [
  {
    id: 'my-companies',
    title: 'Ваши организации',
    href: '/platform/companies',
    icon: Collection
  },
  {
    id: 'settings',
    title: 'Настройки',
    href: '/platform/settings',
    icon: Settings
  },
  {
    id: 'account',
    title: 'Аккаунт',
    href: '/platform/account',
    icon: Account
  },
  {
    id: 'fingerprint',
    title: 'Выдать доступ к аккаунту',
    href: '/platform/security/create-fingerprint',
    icon: Keyhole
  }
];