"use client";

import { Home, Shirt, Truck, Watch } from "lucide-react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Outfits", url: "/outfits", icon: Shirt },
  { title: "Watches", url: "/watches", icon: Watch },
  { title: "Orders", url: "/orders", icon: Truck },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="!border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const href = "/dashboard" + item.url;
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={href} className="flex gap-1 items-center">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
