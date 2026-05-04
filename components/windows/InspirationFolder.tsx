"use client";

import { useEffect, useMemo, useState } from "react";
import FolderShell, { type FolderFile } from "./folder/FolderShell";
import ImageViewer from "./ImageViewer";
import { FolderIcon } from "@/components/icons/AppIcons";

type ImageEntry = {
  type: "image";
  name: string;
  src: string;
  caption?: string;
};

type FolderEntry = {
  type: "folder";
  name: string;
  children: Entry[];
};

type Entry = ImageEntry | FolderEntry;

interface ManifestRoot {
  name: string;
  children: Entry[];
}

function PhotoThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      style={{
        width: 48,
        height: 48,
        background: "#FFFFFF",
        border: "1px solid #5A5A5A",
        padding: 2,
        boxShadow: "1px 1px 0 rgba(0,0,0,0.15)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </span>
  );
}

export default function InspirationFolder() {
  const [manifest, setManifest] = useState<ManifestRoot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<ImageEntry | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/inspiration.json")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load: ${r.status}`);
        return r.json();
      })
      .then((data: ManifestRoot) => {
        if (!cancelled) setManifest(data);
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const currentFolder = useMemo<FolderEntry | null>(() => {
    if (!manifest) return null;
    let node: FolderEntry = {
      type: "folder",
      name: manifest.name,
      children: manifest.children,
    };
    for (const segment of currentPath) {
      const next = node.children.find(
        (c): c is FolderEntry => c.type === "folder" && c.name === segment,
      );
      if (!next) return null;
      node = next;
    }
    return node;
  }, [manifest, currentPath]);

  const files = useMemo<FolderFile[]>(() => {
    if (!currentFolder) return [];
    return currentFolder.children.map((child) => {
      if (child.type === "folder") {
        return {
          name: child.name,
          icon: <FolderIcon size={48} />,
          caption: "File Folder",
        };
      }
      return {
        name: child.name,
        icon: <PhotoThumb src={child.src} alt={child.caption ?? child.name} />,
        caption: child.caption,
      };
    });
  }, [currentFolder]);

  if (error) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--xp-window-bg)",
          fontSize: 11,
          color: "#5A5A5A",
        }}
      >
        Couldn&apos;t load Inspiration: {error}
      </div>
    );
  }

  if (!manifest || !currentFolder) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--xp-window-bg)",
          fontSize: 11,
          color: "#7A7060",
          fontStyle: "italic",
        }}
      >
        Loading...
      </div>
    );
  }

  const folderImages = currentFolder.children.filter(
    (c): c is ImageEntry => c.type === "image",
  );

  if (previewImage) {
    const currentIndex = folderImages.findIndex(
      (img) => img.src === previewImage.src,
    );
    const hasPrev = currentIndex > 0;
    const hasNext =
      currentIndex >= 0 && currentIndex < folderImages.length - 1;
    return (
      <ImageViewer
        src={previewImage.src}
        name={previewImage.name}
        caption={previewImage.caption}
        parentLabel={currentFolder.name}
        onBack={() => setPreviewImage(null)}
        onPrev={hasPrev ? () => setPreviewImage(folderImages[currentIndex - 1]) : undefined}
        onNext={hasNext ? () => setPreviewImage(folderImages[currentIndex + 1]) : undefined}
        position={
          currentIndex >= 0
            ? { current: currentIndex + 1, total: folderImages.length }
            : undefined
        }
      />
    );
  }

  const handleOpen = (name: string) => {
    const child = currentFolder.children.find((c) => c.name === name);
    if (!child) return;
    if (child.type === "folder") {
      setCurrentPath([...currentPath, child.name]);
    } else {
      setPreviewImage(child);
    }
  };

  const goUp = () => {
    if (currentPath.length === 0) return;
    setCurrentPath(currentPath.slice(0, -1));
  };

  const breadcrumb = ["C:", "Inspiration", ...currentPath].join("\\");
  const hasParent = currentPath.length > 0;

  const otherPlacesLinks =
    currentPath.length === 0
      ? ["Desktop", "My Documents", "My Pictures", "My Computer"]
      : ["Inspiration", "Desktop", "My Pictures", "My Computer"];

  return (
    <FolderShell
      path={breadcrumb}
      tasks={{
        title: "Picture Tasks",
        links: [
          "View as a slide show",
          "Order prints online",
          "Print pictures",
          "Set as desktop background",
        ],
      }}
      otherTasks={{
        title: "File and Folder Tasks",
        links: ["Make a new folder", "Publish this folder to the Web", "Share this folder"],
      }}
      otherPlaces={{
        title: "Other Places",
        links: otherPlacesLinks,
      }}
      files={files}
      itemNoun={files.length === 1 ? "object" : "objects"}
      emptyMessage="This folder is empty."
      onItemOpen={handleOpen}
      onBack={hasParent ? goUp : undefined}
      onUp={hasParent ? goUp : undefined}
    />
  );
}
