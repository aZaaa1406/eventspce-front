"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL_API } from "@/config"
import SalonCard from "@/components/propietarioComponents/salon-cardp"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface SalonFromAPI {
  id_salon: string
  nombreSalon: string
  calle: string
  colonia: string
  alcaldia: string
  costopevento: string
  capacidad: string
  portada: string
}

interface Salon {
  id_salon: string
  nombreSalon: string
  ubicacion: string
  costopevento: string
  capacidad: string
  portada: string
}

export default function Page() {
  const [salones, setSalones] = useState<Salon[]>([])

  useEffect(() => {
    const fetchSalones = async () => {
      try {
        const response = await axios.get(`${URL_API}/api/propietario/getSalones`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        const salonesFromAPI: SalonFromAPI[] = response.data.data

        const salonesFormateados: Salon[] = salonesFromAPI.map((salon) => ({
          id_salon: salon.id_salon,
          nombreSalon: salon.nombreSalon,
          ubicacion: `${salon.calle}, ${salon.colonia}, ${salon.alcaldia}`,
          costopevento: salon.costopevento,
          capacidad: salon.capacidad,
          portada: salon.portada,
        }))

        setSalones(salonesFormateados)

      } catch (error) {
        console.error("Error al obtener los salones:", error)

      }
    }
    fetchSalones()
  }, [])

  console.log(salones);
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-4xl font-semibold text-center flex-grow">Bienvenido al panel del propietario</h1>
        <div className="ml-auto ">
          <Button className="bg-blue-300 hover:bg-blue-500 hover:cursor-pointer" type="submit">Agregar nuevo salon</Button>
        </div>
      </div>
      <Separator className="text-bold"/>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 '>
        {salones.map((salon) => (
          <SalonCard
            key={salon.id_salon}
            salonId={salon.id_salon}
            nombre={salon.nombreSalon}
            ubicacion={salon.ubicacion}
            costo={salon.costopevento}
            capacidad={salon.capacidad}
            portada={salon.portada}
          />
        ))}

      </div>
    </div>



  )
}
