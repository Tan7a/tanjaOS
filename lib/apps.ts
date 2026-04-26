import { ComponentType } from "react";
import AboutWindow from "@/components/windows/AboutWindow";

export interface AppConfig {
  id: string;
  title: string;
  icon: string;
  component: ComponentType;
  defaultPosition?: { x: number; y: number };
}

const apps: AppConfig[] = [
  {
    id: "about",
    title: "About Tanja",
    icon: "/icons/about.svg",
    component: AboutWindow,
    defaultPosition: { x: 120, y: 80 },
  },
];

export default apps;
