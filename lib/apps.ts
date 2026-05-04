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
  MyWorkIcon,
  FavoritesIcon,
  ModemIcon,
  PaintIcon,
  ChatIcon,
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
import Projects from "@/components/windows/Projects";
import Bookmarks from "@/components/windows/Bookmarks";
import DialUp from "@/components/windows/DialUp";
import Paint from "@/components/windows/Paint";
import ChatWindow from "@/components/windows/ChatWindow";

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
  | "terminal"
  | "projects"
  | "bookmarks"
  | "dialup"
  | "paint"
  | "chat";

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
 * Two left-side columns of desktop icons. Only the Recycle Bin sits in the
 * bottom-right corner. Column 1 starts at x=8, column 2 at x=88.
 * Each row is 78px tall.
 */
const COL1_X = 8;
const COL2_X = 88;
const ROW = (i: number) => 12 + i * 78;

const apps: AppRegistryEntry[] = [
  // ─── Column 1 (left) ─────────────────────────────────────────────────────
  {
    id: "myComputer",
    title: "My Computer",
    icon: (size) => MyComputerIcon({ size }),
    component: MyComputer,
    defaultPosition: { x: 180, y: 70 },
    defaultSize: { width: 620, height: 440 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(0) },
  },
  {
    id: "aboutMe",
    title: "About Me",
    icon: (size) => AboutMeIcon({ size }),
    component: AboutWindow,
    defaultPosition: { x: 360, y: 80 },
    defaultSize: { width: 620, height: 580 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(1) },
  },
  {
    id: "penny",
    title: "Penny",
    icon: (size) => PennyIcon({ size }),
    component: PennyWindow,
    defaultPosition: { x: 420, y: 110 },
    defaultSize: { width: 620, height: 600 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(2) },
  },
  {
    id: "bookshelf",
    title: "Tanja's Bookshelf - Microsoft Internet Explorer",
    desktopLabel: "Bookshelf",
    icon: (size) => BookshelfIcon({ size }),
    component: Bookshelf,
    defaultPosition: { x: 200, y: 40 },
    defaultSize: { width: 980, height: 680 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(3) },
  },
  {
    id: "myDocuments",
    title: "My Documents",
    icon: (size) => MyDocumentsIcon({ size }),
    component: MyDocuments,
    defaultPosition: { x: 240, y: 110 },
    defaultSize: { width: 660, height: 460 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(4) },
  },
  {
    id: "inspiration",
    title: "Inspiration",
    icon: (size) => FolderIcon({ size }),
    component: InspirationFolder,
    defaultPosition: { x: 260, y: 90 },
    defaultSize: { width: 660, height: 460 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(5) },
  },
  {
    id: "projects",
    title: "portfolio.doc - Microsoft Word",
    desktopLabel: "My Work",
    icon: (size) => MyWorkIcon({ size }),
    component: Projects,
    defaultPosition: { x: 240, y: 60 },
    defaultSize: { width: 760, height: 600 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(6) },
  },
  {
    id: "dialup",
    title: "Connect to TanjaNet",
    desktopLabel: "Connect to Internet",
    icon: (size) => ModemIcon({ size }),
    component: DialUp,
    defaultPosition: { x: 280, y: 120 },
    defaultSize: { width: 460, height: 470 },
    desktopIcon: { anchor: "tl", x: COL1_X, y: ROW(7) },
  },

  // ─── Column 2 (left, offset right) ───────────────────────────────────────
  {
    id: "terminal",
    title: "Command Prompt",
    desktopLabel: "Command Prompt",
    icon: (size) => TerminalIcon({ size }),
    component: Terminal,
    defaultPosition: { x: 360, y: 130 },
    defaultSize: { width: 600, height: 380 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(0) },
  },
  {
    id: "musicPlayer",
    title: "Music Player",
    icon: (size) => MusicPlayerIcon({ size }),
    component: MusicPlayer,
    defaultPosition: { x: 140, y: 60 },
    defaultSize: { width: 480, height: 460 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(1) },
  },
  {
    id: "dxball",
    title: "DX-Ball 2",
    icon: (size) => DXBallIcon({ size }),
    component: DXBall,
    defaultPosition: { x: 700, y: 80 },
    defaultSize: { width: 500, height: 560 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(2) },
  },
  {
    id: "photos",
    title: "My Photos",
    icon: (size) => PhotoFolderIcon({ size }),
    component: PhotoFolder,
    defaultPosition: { x: 220, y: 130 },
    defaultSize: { width: 640, height: 440 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(3) },
  },
  {
    id: "screenplay",
    title: "Screenplay - Microsoft Word",
    desktopLabel: "Screenplay",
    icon: (size) => ScreenplayIcon({ size }),
    component: ScreenplayEditor,
    defaultPosition: { x: 320, y: 90 },
    defaultSize: { width: 660, height: 520 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(4) },
  },
  {
    id: "bookmarks",
    title: "Favorites",
    desktopLabel: "Favorites",
    icon: (size) => FavoritesIcon({ size }),
    component: Bookmarks,
    defaultPosition: { x: 320, y: 80 },
    defaultSize: { width: 360, height: 460 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(5) },
  },
  {
    id: "paint",
    title: "untitled - Paint",
    desktopLabel: "Paint",
    icon: (size) => PaintIcon({ size }),
    component: Paint,
    defaultPosition: { x: 200, y: 60 },
    defaultSize: { width: 700, height: 540 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(6) },
  },
  {
    id: "chat",
    title: "TanjaOS Chat",
    desktopLabel: "Chat",
    icon: (size) => ChatIcon({ size }),
    component: ChatWindow,
    defaultPosition: { x: 240, y: 80 },
    defaultSize: { width: 640, height: 480 },
    desktopIcon: { anchor: "tl", x: COL2_X, y: ROW(7) },
  },

  // ─── Bottom right corner (only the Recycle Bin) ─────────────────────────
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
