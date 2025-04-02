"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { URL_API } from "@/config"
import axios from "axios"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogFooter } from "../ui/dialog"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { useState } from "react"
import {  } from "../ui/dialog"


const resetPasswordSchema = z.object({


    newPassword: z.string({
        required_error: "El campo es requerido"
    }).min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    }).max(12, {
        message: "La contraseña debe tener máximo 12 caracteres"
    }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[A-Za-z\d#\$%&]{6,12}$/, {
        message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial ( #, $, %. &)"
    }),
    confirmPassword: z.string({
        required_error: "El campo es requerido"
    }).min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
    }).max(12, {
        message: "La contraseña debe tener máximo 12 caracteres"
    })
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"]
})

type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
function ResetPassword() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = form.handleSubmit(async (values: ResetPasswordType) => {
        try {
            console.log("nueva contraseña: ", values.newPassword);
            const password = { password: values.newPassword }
            const res = await axios.post(`${URL_API}/api/users/reset-password`, password, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            console.log("respuesta del servidor", res.data);
            if (res.status === 200) {
                console.log("Todo nais");
                setDialogOpen(true)
            }
        } catch (error: any) {
            console.log("Error", error.response.data.error);
            toast.error("Ha ocurrido un error", {
                description: error.response.data.error
            })

        }
    })
    return (
        <>
            <Card className="space-y-4">
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
                        <p className="text-sm text-muted-foreground">Ingresa tu correo electrónico para recuperar tu contraseña</p>
                    </CardTitle>
                    <CardContent>
                        <Form {...form}>
                            <form className="space-y-8 flex flex-col " onSubmit={onSubmit}>
                                <FormField
                                    name="newPassword"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">Nueva contraseña</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="confirmPassword"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-bold">Confirmar contraseña</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="bg-blue-500 text-white max-w-sm" type="submit">
                                    Cambiar contraseña
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </CardHeader>
            </Card>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¡La contraseña se ha cambiado con exito!</DialogTitle>
                        <DialogDescription>Inicia sesión con la nueva contraseña</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center items-center py-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <DialogFooter>
                        <Button onClick={()=> setDialogOpen(false)} className="bg-blue-500 text-white">
                            <Link href="/formsAuth/login">Aceptar</Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ResetPassword