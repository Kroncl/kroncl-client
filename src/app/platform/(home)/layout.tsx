import { useAuth } from "@/apps/account/auth/context/AuthContext";
import PlatformContent from "../components/content/content";
import { PanelAction, PanelSection } from "../components/panel/_types";
import ClientPanel from "../components/panel/client-panel";
import PlatformPanel from "../components/panel/server-panel";
import AuthGuard from "@/apps/account/auth/components/AuthGuard";
import { PlatformContentWrapper } from "../components/lib/wrapper/wrapper";
import Plus from "@/assets/ui-kit/icons/plus";
import Package from "@/assets/ui-kit/icons/package";
import Edit from "@/assets/ui-kit/icons/edit";
import Collection from "@/assets/ui-kit/icons/collection";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const title = "Рабочая область";
  const sections: PanelSection[] = [
    {
      name: 'Главная',
      href: '/platform',
      icon: 'home',
      exact: true
    },
    {
      name: 'Аккаунт',
      href: '/platform/account',
      icon: 'account'
    },
    {
      name: 'Организации',
      href: '/platform/companies',
      icon: 'collection'
    },
    {
      name: 'Приглашения',
      href: '/platform/invitations',
      icon: 'invitations'
    },
    {
      name: 'Безопасность',
      href: '/platform/security',
      icon: 'keyhole'
    },
    {
      name: 'Активность',
      href: '/platform/activity',
      icon: 'history'
    },
  ];
  const actions: PanelAction[] = [
    {
      children: "Создать",
      href: "/platform/companies/new",
      variant: "contrast",
      as: 'link',
      // icon: <Collection />
    }
  ];
  return (
    <>
      <PlatformPanel 
        actions={actions}
        sections={sections} 
        title={title} 
      />
      <PlatformContent>
        <PlatformContentWrapper>
          <AuthGuard>
            {children}
          </AuthGuard>
        </PlatformContentWrapper>
      </PlatformContent>
    </>
  );
}