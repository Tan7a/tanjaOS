"use client";

import FolderShell, { type FolderFile } from "./folder/FolderShell";
import {
  HardDriveIcon,
  FloppyDiskIcon,
  CDDriveIcon,
  RemovableDiskIcon,
  MyDocumentsIcon,
  MyPicturesIcon,
  MyMusicIcon,
} from "@/components/icons/AppIcons";

const FILES: FolderFile[] = [
  {
    name: "Tanja's Documents",
    icon: <MyDocumentsIcon size={48} />,
    caption: "File Folder",
  },
  {
    name: "Shared Documents",
    icon: <MyDocumentsIcon size={48} />,
    caption: "File Folder",
  },
  {
    name: "My Pictures",
    icon: <MyPicturesIcon size={48} />,
    caption: "File Folder",
  },
  {
    name: "My Music",
    icon: <MyMusicIcon size={48} />,
    caption: "File Folder",
  },
  {
    name: "3½ Floppy (A:)",
    icon: <FloppyDiskIcon size={48} />,
    caption: "Rebelde Mixtape Vol 3",
  },
  {
    name: "Local Disk (C:)",
    icon: <HardDriveIcon size={48} />,
    caption: "TanjaXP — 18.4 GB free",
  },
  {
    name: "DVD Drive (D:)",
    icon: <CDDriveIcon size={48} />,
    caption: "Rebelde Season 1 — Disc 4",
  },
  {
    name: "Removable Disk (E:)",
    icon: <RemovableDiskIcon size={48} />,
    caption: "UPA Dance Karaoke",
  },
  {
    name: "Removable Disk (F:)",
    icon: <RemovableDiskIcon size={48} />,
    caption: "Anahí Wallpapers (do not open in class)",
  },
];

export default function MyComputer() {
  return (
    <FolderShell
      path="My Computer"
      tasks={{
        title: "System Tasks",
        links: [
          "View system information",
          "Add or remove programs",
          "Change a setting",
          "Eject this disk",
        ],
      }}
      otherTasks={{
        title: "Other Places",
        links: ["My Network Places", "My Documents", "Shared Documents", "Control Panel"],
      }}
      otherPlaces={{
        title: "Details",
        links: [
          "My Computer",
          "System Folder",
          "Total free space: 18.4 GB",
          "Owner: Tanja",
        ],
      }}
      files={FILES}
      itemNoun="objects"
    />
  );
}
