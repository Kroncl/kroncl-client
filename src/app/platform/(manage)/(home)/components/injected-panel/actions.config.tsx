import Collection from "@/assets/ui-kit/icons/collection";
import Edit from "@/assets/ui-kit/icons/edit";
import Package from "@/assets/ui-kit/icons/package";
import Business from "@/assets/ui-kit/icons/business";
import { PanelAction } from "@/app/platform/components/panel/_types";

export const actionsList = (): PanelAction[] => {
    return ([
        {
            children: "Создать",
            href: "/platform/companies/new",
            variant: "contrast",
            as: 'link',
            icon: <Business />
        }
    ]);
}