import { ButtonProps } from "@/assets/ui-kit/button/button";
import { LinkProps } from "next/link";

export interface MenuPreview {
    title: string;
    description?: string;
    actions?: ButtonProps[];
}

export interface MenuContentItem {
    title: string;
    href?: string;
    icon?: React.ReactNode;
    description?: string;
    links?: (LinkProps & { children: React.ReactNode })[];

}

export interface MenuContent {
    items: MenuContentItem[];
}

export interface MenuProps {
    className?: string;
    preview: MenuPreview;
    content: MenuContent;
}