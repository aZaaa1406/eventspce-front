// components/DeleteDialog.tsx
"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clientes } from "@/app/admin/clientes/Columns"

interface DeleteDialogProps {
  cliente: Clientes
  onConfirm: (id: number) => void
}

export const DeleteDialog = ({ cliente, onConfirm }: DeleteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Eliminar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Eliminar cliente?</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar a <strong>{cliente.nombre}</strong>? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancelar</Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(cliente.id_user)}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
