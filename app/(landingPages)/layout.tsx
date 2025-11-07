import type { Metadata } from "next";
import Navbar from "../appComponents/navbar/navbar";
import "./../globals.css";

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
    <>
      <main>
        {/* Header with Navbar */}
        <div className="z-50 relative">
          <Navbar />
        </div>

        {/* Main content */}
        {children}

        {/* Footer */}
        <footer className="bg-black text-white py-8 ">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              &copy; 2025 CPG Rwanda Events. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
