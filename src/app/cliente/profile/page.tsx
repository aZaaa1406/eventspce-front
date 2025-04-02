import React from 'react'
import PersonalInformation from '@/components/clienteComponents/personal-information'

function PageUsers() {
  return (
    <div className='bg-[rgba(239,232,254,255)] w-full h-full flex items-center justify-center'>
      <div className='flex flex-col items-center'>
        <div className='mb-4'>
          <h1 className='text-2xl font-bold text-left'>Datos del Usuario</h1>
        </div>
        <div>
          <PersonalInformation />
        </div>
      </div>
      
    </div>

  )
}

export default PageUsers