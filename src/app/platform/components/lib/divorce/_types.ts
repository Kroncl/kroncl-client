import { ComponentType } from "react";

export interface DivorceSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: boolean;
  href: string;
  img?: string;
}