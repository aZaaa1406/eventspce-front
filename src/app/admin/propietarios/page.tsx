"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios' // 👈 sin la mayúscula
import { DataTable } from '@/components/adminComponents/DataTable'
import { columns } from './Columns'
import { Propietarios } from './Columns'
import { URL_API } from '@/config'
import { toast } from 'sonner'

function UsersPage() {
  const [data, setData] = useState<Propietarios[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const res = await axios.get(`${URL_API}/api/admin/propietarios`) 
        setData(res.data.data)
      } catch (error) {
        console.error("Error al obtener los Propietarios:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPropietarios()
  }, [])
  const handleDelete = async (id: number) => {
    try {
       const data  = await axios.delete(`${URL_API}/api/admin/user/${id}`);
       if(data.status === 200) {
        toast.success("Cliente eliminado correctamente")
        window.location.reload()
       }
     } catch (error) {
       console.error("Error al eliminar cliente:", error);
     }
  };
  

  return (
    <div className='p-10'>
      {loading ? (
        <h1 className='text-2xl font-bold text-center'>Cargando Propietarios...</h1>
      ) : (
        <DataTable columns={columns(handleDelete)} data={data} />
      )}
    </div>
  )
}

export default UsersPage
