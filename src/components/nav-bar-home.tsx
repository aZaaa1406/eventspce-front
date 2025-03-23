import React from 'react'
import Link from 'next/link'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    // MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

function NavBarHome() {
    return (
        <nav className="bg-purple-300 text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">EventSpace</h1>
                <Menubar className='bg-purple-300 text-black p-4 border-0 content-center'>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/">Inicio</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Registrarse</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                <Link href="/register">Propietario</Link>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>
                                <Link href="/register">Cliente</Link>
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Link href="/formsAuth/login">Iniciar sesión</Link>
                        </MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
            </div>
        </nav>
    );
}

export default NavBarHome