"use client";

import FolderShell, { type FolderFile } from "./folder/FolderShell";
import {
  DocFileIcon,
  TxtFileIcon,
  ZipFileIcon,
  ImageFileIcon,
  AudioFileIcon,
  PdfFileIcon,
  MyPicturesIcon,
  MyMusicIcon,
} from "@/components/icons/AppIcons";

const FILES: FolderFile[] = [
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
    name: "rebelde-fanfic-ch1.doc",
    icon: <DocFileIcon size={48} />,
    caption: "Microsoft Word — 47 KB",
  },
  {
    name: "rebelde-fanfic-ch2-FINAL-final.doc",
    icon: <DocFileIcon size={48} />,
    caption: "Microsoft Word — 89 KB",
  },
  {
    name: "diary-2003-09-14.doc",
    icon: <DocFileIcon size={48} />,
    caption: '"Mia y Miguel — destinados"',
  },
  {
    name: "upa-dance-tour-itinerary.txt",
    icon: <TxtFileIcon size={48} />,
    caption: "Notepad — 4 KB",
  },
  {
    name: "lyrics-i-cried-to.txt",
    icon: <TxtFileIcon size={48} />,
    caption: '"Sálvame", "Sambame", etc.',
  },
  {
    name: "msn-quotes-2003.txt",
    icon: <TxtFileIcon size={48} />,
    caption: "184 status candidates",
  },
  {
    name: "RBD-fan-club-card.pdf",
    icon: <PdfFileIcon size={48} />,
    caption: "Member #007421",
  },
  {
    name: "school-talent-show-2003.pdf",
    icon: <PdfFileIcon size={48} />,
    caption: "UPA routine — printed",
  },
  {
    name: "anahi-wallpaper-batch.zip",
    icon: <ZipFileIcon size={48} />,
    caption: "73 images — 12.4 MB",
  },
  {
    name: "marta-y-pedro-shipping.zip",
    icon: <ZipFileIcon size={48} />,
    caption: "Evidence dossier — 8.1 MB",
  },
  {
    name: "elite-way-school-uniform.jpg",
    icon: <ImageFileIcon size={48} />,
    caption: "the plaid skirt I wanted",
  },
  {
    name: "poncho-herrera-headshot.jpg",
    icon: <ImageFileIcon size={48} />,
    caption: "do NOT print again",
  },
  {
    name: "salvame-rbd-RIPPED.mp3",
    icon: <AudioFileIcon size={48} />,
    caption: "from Kazaa — 96kbps",
  },
  {
    name: "sambame-upa-dance.mp3",
    icon: <AudioFileIcon size={48} />,
    caption: "from LimeWire — sus",
  },
  {
    name: "rebelde-opening-theme.mp3",
    icon: <AudioFileIcon size={48} />,
    caption: "the one that hits",
  },
];

export default function MyDocuments() {
  return (
    <FolderShell
      path="C:\\Documents and Settings\\Tanja\\My Documents"
      tasks={{
        title: "File and Folder Tasks",
        links: [
          "Make a new folder",
          "Publish this folder to the Web",
          "Share this folder",
          "E-mail this folder's files",
        ],
      }}
      otherTasks={{
        title: "Other Places",
        links: ["Desktop", "Shared Documents", "My Computer", "My Network Places"],
      }}
      otherPlaces={{
        title: "Details",
        links: [
          "My Documents",
          "File Folder",
          "Date Modified: Today",
          "Owner: Tanja",
          "Mood: dramatic",
        ],
      }}
      files={FILES}
      itemNoun="objects"
    />
  );
}
