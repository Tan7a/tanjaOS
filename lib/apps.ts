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
  BookshelfIcon,
  FolderIcon,
  TerminalIcon,
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
import Bookshelf from "@/components/windows/Bookshelf";
import InspirationFolder from "@/components/windows/InspirationFolder";
import Terminal from "@/components/windows/Terminal";

export type AppId =
  | "musicPlayer"
  | "dxball"
  | "photos"
  | "screenplay"
  | "myComputer"
  | "myDocuments"
  | "recycleBin"
  | "aboutMe"
  | "penny"
  | "bookshelf"
  | "inspiration"
  | "terminal";

export type DesktopAnchor = "tl" | "tr" | "bl" | "br";

export interface DesktopIconPosition {
  /** Which corner of the wallpaper area the offsets are measured from. Default "tl". */
  anchor?: DesktopAnchor;
  /** Pixels in from the anchor's horizontal edge. */
  x: number;
  /** Pixels in from the anchor's vertical edge. */
  y: number;
}

export interface AppRegistryEntry {
  id: AppId;
  title: string;
  /** Label shown under the desktop icon. Defaults to title. */
  desktopLabel?: string;
  icon: (size: number) => ReactElement;
  component: ComponentType;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
  /** Where this app's icon sits on the desktop. If omitted, falls back to a left-column slot. */
  desktopIcon?: DesktopIconPosition;
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
    desktopIcon: { anchor: "tl", x: 8, y: 12 },
  },
  {
    id: "aboutMe",
    title: "About Me",
    icon: (size) => AboutMeIcon({ size }),
    component: AboutWindow,
    defaultPosition: { x: 360, y: 80 },
    defaultSize: { width: 620, height: 580 },
    desktopIcon: { anchor: "tl", x: 8, y: 90 },
  },
  {
    id: "penny",
    title: "Penny",
    icon: (size) => PennyIcon({ size }),
    component: PennyWindow,
    defaultPosition: { x: 420, y: 110 },
    defaultSize: { width: 620, height: 600 },
    desktopIcon: { anchor: "tl", x: 8, y: 168 },
  },
  {
    id: "bookshelf",
    title: "Tanja's Bookshelf - Microsoft Internet Explorer",
    desktopLabel: "Bookshelf",
    icon: (size) => BookshelfIcon({ size }),
    component: Bookshelf,
    defaultPosition: { x: 200, y: 40 },
    defaultSize: { width: 980, height: 680 },
    desktopIcon: { anchor: "tl", x: 8, y: 246 },
  },
  {
    id: "myDocuments",
    title: "My Documents",
    icon: (size) => MyDocumentsIcon({ size }),
    component: MyDocuments,
    defaultPosition: { x: 240, y: 110 },
    defaultSize: { width: 660, height: 460 },
    desktopIcon: { anchor: "tl", x: 8, y: 324 },
  },
  {
    id: "inspiration",
    title: "Inspiration",
    icon: (size) => FolderIcon({ size }),
    component: InspirationFolder,
    defaultPosition: { x: 260, y: 90 },
    defaultSize: { width: 660, height: 460 },
    desktopIcon: { anchor: "tl", x: 8, y: 402 },
  },
  {
    id: "terminal",
    title: "Command Prompt",
    desktopLabel: "Command Prompt",
    icon: (size) => TerminalIcon({ size }),
    component: Terminal,
    defaultPosition: { x: 360, y: 130 },
    defaultSize: { width: 600, height: 380 },
    desktopIcon: { anchor: "tr", x: 12, y: 12 },
  },
  {
    id: "musicPlayer",
    title: "Music Player",
    icon: (size) => MusicPlayerIcon({ size }),
    component: MusicPlayer,
    defaultPosition: { x: 140, y: 60 },
    defaultSize: { width: 480, height: 460 },
    desktopIcon: { anchor: "tr", x: 12, y: 90 },
  },
  {
    id: "dxball",
    title: "DX-Ball 2",
    icon: (size) => DXBallIcon({ size }),
    component: DXBall,
    defaultPosition: { x: 700, y: 80 },
    defaultSize: { width: 500, height: 560 },
    desktopIcon: { anchor: "tr", x: 12, y: 168 },
  },
  {
    id: "photos",
    title: "My Photos",
    icon: (size) => PhotoFolderIcon({ size }),
    component: PhotoFolder,
    defaultPosition: { x: 220, y: 130 },
    defaultSize: { width: 640, height: 440 },
    desktopIcon: { anchor: "tr", x: 12, y: 246 },
  },
  {
    id: "screenplay",
    title: "Screenplay - Microsoft Word",
    desktopLabel: "Screenplay",
    icon: (size) => ScreenplayIcon({ size }),
    component: ScreenplayEditor,
    defaultPosition: { x: 320, y: 90 },
    defaultSize: { width: 660, height: 520 },
    desktopIcon: { anchor: "tr", x: 12, y: 324 },
  },
  {
    id: "recycleBin",
    title: "Recycle Bin",
    icon: (size) => RecycleBinIcon({ size }),
    component: RecycleBin,
    defaultPosition: { x: 280, y: 150 },
    defaultSize: { width: 620, height: 420 },
    desktopIcon: { anchor: "br", x: 12, y: 12 },
  },
];

export default apps;
