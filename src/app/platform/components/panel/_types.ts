import { ComponentType } from "react";
import { ButtonProps, ButtonVariant } from '@/assets/ui-kit/button/button';

export type IconComponent = ComponentType<{ className?: string }>;

export interface PanelSectionTag {
  value: string | number;
  variant: 'accent' | 'default';
}

export interface PanelSection {
  name: string;
  href: string;
  icon?: string;
  exact?: boolean;
  tags?: PanelSectionTag[];
}

export interface PanelHeadSection {
  name: string;
  href: string;
  icon?: string;
  exact?: boolean;
}

export type PanelAction = ButtonProps;