"use client"

import { Layers, Plus, Volleyball } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Lanas",
    url: "/gestion/lanas",
    icon: Volleyball,
  },
  // {
  //   title: "Buscar",
  //   url: "search",
  //   icon: Search,
  // },
  {
    title: "Nueva lanita",
    url: "/gestion/lanas/nueva",
    icon: Plus,
  },
  {
    title: "Categorías",
    url: "/gestion/categorias",
    icon: Layers,
  },
  {
    title: "Nueva categoría",
    url: "/gestion/categorias/nueva",
    icon: Plus,
  },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

export const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Lanitas Vira</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`${pathname === item.url ? 'bg-primary/10 rounded-md' : ''}`}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className={`${pathname === item.url ? 'text-primary font-semibold' : ''}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}