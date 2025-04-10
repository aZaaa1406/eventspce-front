'use client'

import React, { useEffect, useState } from 'react'
import FilterBar from '@/components/clienteComponents/filterBar'
import SalonCard from '@/components/clienteComponents/salon-card'
import axios from 'axios'
import { URL_API } from '@/config'

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

function InicioCliente() {
  const [salones, setSalones] = useState<Salon[]>([])

  useEffect(() => {
    const fetchSalones = async () => {
      try {
        const res = await axios.get(`${URL_API}/api/client/salones`)
        const salonesFromAPI: SalonFromAPI[] = res.data.data

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
        console.error('Error al obtener los salones:', error)
      }
    }

    fetchSalones()
  }, [])

  return (
    <div className='space-y-8'>
      <div className='flex flex-col items-center justify-start p-4'>
        <FilterBar />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5 bg-gray-200'>
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

export default InicioCliente
