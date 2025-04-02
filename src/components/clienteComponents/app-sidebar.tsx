"use client"

import * as React from "react"
import {
  CalendarDays,
  User,
  Wallet
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Mis reservas",
      url: "#",
      icon: CalendarDays,
      isActive: true,
      items: [
        {
          title: "Reservas activas",
          url: "#",
        },
        {
          title: "Historial de reservas",
          url: "#",
        },
      ],
    },
    {
      title: "Pagos",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Metodos de pago",
          url: "#",
        },
        {
          title: "Historial de pagos",
          url: "#",
        },
      ],
    },
    {
      title: "Perfil",
      url: "#",
      icon: User,
      items: [
        {
          title: "Informacion personal",
          url: "#",
        },
        {
          title: "Cambio de contraseña",
          url: "#",
        },
      ],
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className="relative h-full w-64 min-w-[250px] md:flex bg-[rgba(243,239,255,255)]">
      <SidebarHeader className="bg-[rgba(243,239,255,255)]">
        <SidebarMenu className="bg-[rgba(243,239,255,255)]">
          <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <NavUser user={data.user} />
        </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-[rgba(243,239,255,255)]">
        <NavMain items={data.navMain}/>
      </SidebarContent>
    </Sidebar>
  )
}
