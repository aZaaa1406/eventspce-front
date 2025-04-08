"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

export type Propietarios = {
    id_user: number,
    nombre: string,
    appat: string,
    apmat: string,
    email: string,
    telefono: string,
}

export const columns: ColumnDef<Propietarios>[] = [
    {
        accessorKey: "id_user",
        header: "ID",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "appat",
        header: "Apellido Paterno",
    },
    {
        accessorKey: "apmat",
        header: "Apellido Materno",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
    },
    {
        id: "actions", // 👈 importante: no usar accessorKey aquí
        header: "Acciones",
        cell: ({ row }) => {
            const propietario = row.original

            return (
                <Button
                    onClick={() => alert(`Eliminar propietario ${propietario.nombre} con ID ${propietario.id_user}`)}
                    variant="destructive"
                >
                    Eliminar
                </Button>
            )
        }
    }
]
