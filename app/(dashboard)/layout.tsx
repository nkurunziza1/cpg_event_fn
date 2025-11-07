import type { Metadata } from "next";
import "./../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ProtectedRoute } from "./protectedRoute";

export const metadata: Metadata = {
  title: {
    template: "%s | CPG Rwanda Events Dashboard",
    default: "CPG Rwanda Events Dashboard",
  },
  description:
    "CPG Rwanda Events Dashboard - Manage news, events, and participants.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {" "}
          {/* Add w-full */}
          <AppSidebar />
          <main className="flex-1 min-w-0">
            {" "}
            {/* Add min-w-0 to prevent overflow */}
            <div className="flex min-h-screen flex-col bg-white">
              <div className="sticky top-0 z-10 border-b bg-white px-4 py-3">
                <SidebarTrigger className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white" />
              </div>
              <div className="flex-1 space-y-4 p-8 pt-6 w-full">
                {" "}
                {/* Add w-full */}
                {children}
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
