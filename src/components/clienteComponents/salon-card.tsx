'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { User, DollarSign, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

interface SalonCardProps {
  salonId: string
  nombre: string
  ubicacion: string
  costo: string
  capacidad: string
  portada: string // URL de la imagen del salón
}

function SalonCard({
  salonId,
  nombre,
  ubicacion,
  costo,
  capacidad,
  portada
}: SalonCardProps) {
  const router = useRouter()

  const handleClick = (id: string) => {
    router.push(`/salones/${id}`)
  }

  return (
    <Card
      onClick={() => handleClick(salonId)}
      className="hover:cursor-pointer w-full h-[450px] bg-white transition-all hover:shadow-md p-0"
    >
      <CardHeader className="p-0">
        <Image
          src={portada}
          alt={`Imagen de ${nombre}`}
          width={500}
          height={300}
          className="rounded-t-lg w-full h-[200px] object-cover"
        />
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        <CardTitle className="text-2xl font-semibold">{nombre}</CardTitle>
        <CardDescription className="text-gray-800 flex"><MapPin className='size-6'/>{ubicacion}</CardDescription>
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="w-4 h-4" /> {capacidad} personas
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign className="w-4 h-4" /> {costo}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalonCard
