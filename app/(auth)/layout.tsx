import type { Metadata } from "next";
import "./../globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Authentication layers",
    default: "Authentication layers",
  },
  description:
    "AFOR authentication layers dedicated to authorize and authenticate admins  to access and manage afor dashboard",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
