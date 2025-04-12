"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/propietarioComponents/nav-main"
import { NavUser } from "@/components/propietarioComponents/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { URL_API } from "@/config"
import axios from "axios"
// This is sample data.

interface UserData {
  id_user: number
  nombre: string
  appat: string
  apmat: string
  email: string
  rol: string
  telefono: string
}

interface UserDataResponse {
  user: UserData
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = React.useState<any>(null)
  const [salones, setSalones] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserDataResponse>(`${URL_API}/api/propietario/getUser`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Asegúrate de que con las cookies funcione
        })
        setUserData(response.data.user) // Asignamos los datos al estado
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error)
      }
    }
    fetchUserData()
  }, [])
  React.useEffect(()=>{
    const fetchSalones = async()=>{
      try { 
        const response = await axios.get(`${URL_API}/api/propietario/getSalones`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        setSalones(response.data.data)
      } catch (error) {
        console.error("Error al obtener los salones:", error)
        
      }
    }
    fetchSalones()
  }, [])
  const data = {
    user: {
      name: `${userData?.nombre} ${userData?.appat} ${userData?.apmat}`,
      email: userData?.email,
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Salones",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: salones.map((salon: any)=>({
          title: salon.nombreSalon,
          url: "/propietario/salon/" + salon.id_salon,
        })) 
      },
      {
        title: "Reservas",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Estadisticas",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],

  }
  return (
    <Sidebar collapsible="icon" {...props} className="bg-purple-100">
      <SidebarHeader className="bg-purple-200">
        <NavUser user={data.user}/>
      </SidebarHeader>
      <SidebarContent className="bg-purple-200">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
