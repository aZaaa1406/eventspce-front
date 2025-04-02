"use client"

import * as React from "react"
import {
  HandCoins,
  Warehouse,
  Command,
  ChartPie ,
  User
} from "lucide-react"

import { NavMain } from "@/components/adminComponents/nav-main"
import { NavUser } from "@/components/adminComponents/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Usuarios",
      url: "#",
      icon: User,
      isActive: true,
      items: [
        {
          title: "Propietarios",
          url: "#",
        },
        {
          title: "Clientes",
          url: "#",
        },
      ],
    },
    {
      title: "Salones",
      url: "#",
      icon: Warehouse,
      items: [
        {
          title: "Lista de salones",
          url: "#",
        },
        {
          title: "Estado de salones",
          url: "#",
        },
      ],
    },
    {
      title: "Reservas y Pagos",
      url: "#",
      icon: HandCoins,
      items: [
        {
          title: "Lista de reservas",
          url: "#",
        },
        {
          title: "Historial de reservas",
          url: "#",
        },
        {
          title: "Pagos",
          url: "#",
        }
      ],
    },
    {
      title: "Informes",
      url: "#",
      icon: ChartPie ,
      items: [
        {
          title: "Dashboard de Metricas",
          url: "#",
        },
        {
          title: "Analisis de uso",
          url: "#",
        },
        {
          title: "Reporte de ingresos",
          url: "#",
        },
      ],
    },
  ],
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Administrador</span>
                  <span className="truncate text-xs">Event Space</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
