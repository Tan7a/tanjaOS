import { type ComponentType, type ReactElement } from "react";
import {
  MusicPlayerIcon,
  DXBallIcon,
  PhotoFolderIcon,
  ScreenplayIcon,
  MyComputerIcon,
  MyDocumentsIcon,
  RecycleBinIcon,
  AboutMeIcon,
  PennyIcon,
} from "@/components/icons/AppIcons";
import MusicPlayer from "@/components/windows/MusicPlayer";
import DXBall from "@/components/windows/DXBall";
import PhotoFolder from "@/components/windows/PhotoFolder";
import ScreenplayEditor from "@/components/windows/ScreenplayEditor";
import MyComputer from "@/components/windows/MyComputer";
import MyDocuments from "@/components/windows/MyDocuments";
import RecycleBin from "@/components/windows/RecycleBin";
import AboutWindow from "@/components/windows/AboutWindow";
import PennyWindow from "@/components/windows/PennyWindow";

export type AppId =
  | "musicPlayer"
  | "dxball"
  | "photos"
  | "screenplay"
  | "myComputer"
  | "myDocuments"
  | "recycleBin"
  | "aboutMe"
  | "penny";

export interface AppRegistryEntry {
  id: AppId;
  title: string;
  /** Label shown under the desktop icon. Defaults to title. */
  desktopLabel?: string;
  icon: (size: number) => ReactElement;
  component: ComponentType;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

/**
 * Order here is the order shown in the desktop icon column (top to bottom).
 */
const apps: AppRegistryEntry[] = [
  {
    id: "myComputer",
    title: "My Computer",
    icon: (size) => MyComputerIcon({ size }),
    component: MyComputer,
    defaultPosition: { x: 180, y: 70 },
    defaultSize: { width: 620, height: 440 },
  },
  {
    id: "aboutMe",
    title: "About Me",
    icon: (size) => AboutMeIcon({ size }),
    component: AboutWindow,
    defaultPosition: { x: 360, y: 80 },
    defaultSize: { width: 620, height: 580 },
  },
  {
    id: "penny",
    title: "Penny",
    icon: (size) => PennyIcon({ size }),
    component: PennyWindow,
    defaultPosition: { x: 420, y: 110 },
    defaultSize: { width: 620, height: 600 },
  },
  {
    id: "myDocuments",
    title: "My Documents",
    icon: (size) => MyDocumentsIcon({ size }),
    component: MyDocuments,
    defaultPosition: { x: 240, y: 110 },
    defaultSize: { width: 660, height: 460 },
  },
  {
    id: "musicPlayer",
    title: "Music Player",
    icon: (size) => MusicPlayerIcon({ size }),
    component: MusicPlayer,
    defaultPosition: { x: 140, y: 60 },
    defaultSize: { width: 480, height: 460 },
  },
  {
    id: "dxball",
    title: "DX-Ball 2",
    icon: (size) => DXBallIcon({ size }),
    component: DXBall,
    defaultPosition: { x: 700, y: 80 },
    defaultSize: { width: 500, height: 560 },
  },
  {
    id: "photos",
    title: "My Photos",
    icon: (size) => PhotoFolderIcon({ size }),
    component: PhotoFolder,
    defaultPosition: { x: 220, y: 130 },
    defaultSize: { width: 640, height: 440 },
  },
  {
    id: "screenplay",
    title: "Screenplay - Microsoft Word",
    desktopLabel: "Screenplay",
    icon: (size) => ScreenplayIcon({ size }),
    component: ScreenplayEditor,
    defaultPosition: { x: 320, y: 90 },
    defaultSize: { width: 660, height: 520 },
  },
  {
    id: "recycleBin",
    title: "Recycle Bin",
    icon: (size) => RecycleBinIcon({ size }),
    component: RecycleBin,
    defaultPosition: { x: 280, y: 150 },
    defaultSize: { width: 620, height: 420 },
  },
];

export default apps;
