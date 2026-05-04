import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DialUpProvider } from "@/lib/dialup-context";

export const metadata: Metadata = {
  title: "TanjaXP",
  description: "A Windows XP time capsule.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <DialUpProvider>{children}</DialUpProvider>
      </body>
    </html>
  );
}
