"use client"

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const breadcrumbNameMap: Record<string, string> = {
  salones: "Salones",
  agregar: "Agregar Salón",
  reservas: "Reservas",
  perfil: "Mi Perfil",
}

export function AppBreadcrumb() {
  const pathname = usePathname()

  const pathSegments = pathname
    .replace(/^\/|\/$/g, "") // quita "/" al inicio y final
    .split("/")
    .filter((segment) => segment !== "propietario") // oculta "propietario" del breadcrumb

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/propietario">Inicio</BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const href = "/" + ["propietario", ...pathSegments.slice(0, index + 1)].join("/")
          const label =
            breadcrumbNameMap[segment] ||
            segment.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())

          const isLast = index === pathSegments.length - 1

          return (
            <span key={index} className="flex items-center">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
