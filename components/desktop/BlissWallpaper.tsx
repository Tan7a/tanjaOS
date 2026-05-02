/* eslint-disable @next/next/no-img-element */

/**
 * Renders the Windows XP "Bliss"-style wallpaper from /public/wallpaper-bliss.jpg.
 * Plain <img> with object-cover so it fills any aspect ratio without distortion.
 */
export default function BlissWallpaper() {
  return (
    <img
      src="/wallpaper-bliss.jpg"
      alt=""
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        userSelect: "none",
        pointerEvents: "none",
      }}
      draggable={false}
    />
  );
}
