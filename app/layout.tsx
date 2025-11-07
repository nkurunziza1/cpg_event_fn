import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | CPG Rwanda Events",
    default: "CPG Rwanda Events",
  },
  description:
    "CPG Rwanda Events - Browse and register for events, and stay updated with the latest news.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
      <div>
        <Toaster />
      </div>
    </html>
  );
}
