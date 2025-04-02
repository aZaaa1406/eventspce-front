import React from 'react'
import { AppSidebar } from '@/components/clienteComponents/app-sidebar'
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <div className='bg-green'></div>
            <SidebarProvider>
                <AppSidebar className='bg-purple-300'/>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <SidebarInset className="flex-1 overflow-auto">
                        {children}
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </>
    )
}

export default layout