import React from 'react'
import Link from 'next/link'
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    House,
    Search,
    User,
    Bell
} from "lucide-react";

function NavbarCliente() {
    return (
        <nav className=" bg-white text-black p-4 text-bold">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">EventSpace</h1>
                <Menubar className='bg-transparent text-black p-4 border-0 content-center space-x-20'>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/cliente">
                                <House />
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/cliente/busqueda">
                                <Search />
                            </Link>
                        </MenubarTrigger>

                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/cliente/profile">
                                <User />
                            </Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Bell />
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>

            </div>
        </nav>
    )
}

export default NavbarCliente