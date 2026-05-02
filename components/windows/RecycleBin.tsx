"use client";

import FolderShell, { type FolderFile } from "./folder/FolderShell";
import {
  DocFileIcon,
  TxtFileIcon,
  ZipFileIcon,
  ImageFileIcon,
  AudioFileIcon,
} from "@/components/icons/AppIcons";

const FILES: FolderFile[] = [
  {
    name: "letter-to-anahi-i-never-sent.doc",
    icon: <DocFileIcon size={48} />,
    caption: "deleted Mar 14, 2003",
  },
  {
    name: "10000-word-rebelde-fanfic-unfinished.doc",
    icon: <DocFileIcon size={48} />,
    caption: "Mia/Miguel/Roberta triangle",
  },
  {
    name: "i-was-going-to-marry-poncho.txt",
    icon: <TxtFileIcon size={48} />,
    caption: "deleted Apr 22, 2003",
  },
  {
    name: "draft-msn-status-bilingual.txt",
    icon: <TxtFileIcon size={48} />,
    caption: '"sólo quédate en silencio…"',
  },
  {
    name: "alfonso-herrera-shrine-batch1.zip",
    icon: <ZipFileIcon size={48} />,
    caption: "31 images — too risky",
  },
  {
    name: "yearbook-pages-i-defaced.zip",
    icon: <ZipFileIcon size={48} />,
    caption: "RBD logo over math teacher",
  },
  {
    name: "elite-way-school-uniform-FAKE.jpg",
    icon: <ImageFileIcon size={48} />,
    caption: "ordered. did not fit.",
  },
  {
    name: "me-singing-sambame-recording.wav",
    icon: <AudioFileIcon size={48} />,
    caption: "DO NOT RECOVER",
  },
  {
    name: "rebelde-tour-tickets-i-cried-about.pdf",
    icon: <ImageFileIcon size={48} />,
    caption: "sold out. devastating.",
  },
  {
    name: "letter-to-mum-asking-to-go-to-mexico.doc",
    icon: <DocFileIcon size={48} />,
    caption: "rejected. resubmitted 4 times.",
  },
  {
    name: "homework-i-skipped-for-rebelde-marathon.zip",
    icon: <ZipFileIcon size={48} />,
    caption: "still ashamed",
  },
  {
    name: "kazaa-virus-from-salvame-download.exe",
    icon: <DocFileIcon size={48} />,
    caption: "worth it",
  },
];

export default function RecycleBin() {
  return (
    <FolderShell
      path="Recycle Bin"
      tasks={{
        title: "Recycle Bin Tasks",
        links: [
          "Empty the Recycle Bin",
          "Restore all items",
          "Restore this item",
        ],
      }}
      otherTasks={{
        title: "Other Places",
        links: ["Desktop", "My Documents", "My Computer", "My Network Places"],
      }}
      otherPlaces={{
        title: "Details",
        links: [
          "Recycle Bin",
          "System Folder",
          "Status: cluttered",
          "Last emptied: never",
          "Regret level: medium",
        ],
      }}
      files={FILES}
      itemNoun="objects"
    />
  );
}
