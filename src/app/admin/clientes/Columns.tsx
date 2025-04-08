"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent,DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
export type Clientes = {
    id_user: number,
    nombre: string,
    appat: string,
    apmat: string,
    email: string,
    telefono: string,
}
import { TriangleAlert } from "lucide-react"

export const columns = (handleDelete: (id: number) => void): ColumnDef<Clientes>[] => [
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
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
          const cliente = row.original
    
          return (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Eliminar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="items-center justify-center">
                    <DialogTitle>Eliminar cliente</DialogTitle>
                    <TriangleAlert className="text-red-500" size={40} />
                    <DialogDescription>¿Desea eliminar a {cliente.nombre}?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() => handleDelete(cliente.id_user)}
                        variant="destructive"
                      >
                        Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )
        }
      }
]
