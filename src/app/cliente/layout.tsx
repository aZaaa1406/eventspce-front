import React from 'react'
import NavbarCliente from '@/components/clienteComponents/NavbarCliente'

function Page({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div >
                <div >
                    <NavbarCliente />
                </div>

                <div>
                    {children}
                </div>

            </div>
        </>
    )
}

export default Page