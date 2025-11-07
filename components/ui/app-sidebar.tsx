"use client";
import {
  Newspaper,
  Mail,
  Calendar,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import LogoutButton from "@/app/appComponents/atoms/logoutButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "News",
    url: "/dashboard/news",
    icon: Newspaper,
  },
  {
    title: "Newsletter",
    url: "/dashboard/subscribers",
    icon: Mail,
  },
  {
    title: "Events",
    url: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Participants",
    url: "/dashboard/participants",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-64 shrink-0">
      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="mb-16 mt-4">
            <a href="/" className="cursor-pointer">
              <img
                src="/logos/cpgLogo.webp"
                alt="Logo"
                className="h-8 w-auto"
              />
            </a>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className="w-full"
                      isActive={isActive}
                    >
                      <a
                        href={item.url}
                        data-active={isActive}
                        className={cn(
                          "flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 group w-full",
                          isActive
                            ? "bg-red-600 text-white hover:bg-red-700 shadow-md"
                            : "text-black bg-white hover:bg-red-600 hover:text-white"
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            isActive ? "text-white" : "text-black group-hover:text-white"
                          )}
                        />
                        <span className={cn(
                          "flex-1 font-medium text-sm",
                          isActive ? "text-white" : "text-black group-hover:text-white"
                        )}>
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout button at the bottom */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="w-full">
            <LogoutButton />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
