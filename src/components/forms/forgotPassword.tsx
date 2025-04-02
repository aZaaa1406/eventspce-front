"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios'
import { URL_API } from '@/config'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Dialog, DialogHeader, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '../ui/dialog'

const forgotSchema = z.object({
    email: z.string({
        required_error: "El campo es requerido"
    }).email({
        message: "El formato de email es invalido"
    })
})

type ForgotType = z.infer<typeof forgotSchema>;
function ForgotPassword() {
    const [dialogOpen, setDialogOpen] = useState(false)
    const form = useForm({
        resolver: zodResolver(forgotSchema)
    })

    const onSubmit = form.handleSubmit(async (values: ForgotType) => {
        const res = await axios.post(`${URL_API}/api/users/forgot-password`, values, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        console.log("respuesta del servidor", res.data);
        if (res.status === 200) {
            setDialogOpen(true)
        }
    })


    return (
        <>
            <Card className='space-y-4'>
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
                        <p className="text-sm text-muted-foreground">Ingresa tu correo electrónico para recuperar tu contraseña</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-8 flex flex-col ">
                            <FormField
                                name='email'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='font-bold'>Correo electronico</FormLabel>
                                        <FormControl>
                                            <Input placeholder='a@algo.com' type='text' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type='submit' className='bg-blue-500 text-white font-bold px-4 py-2'>
                                Recuperar contraseña
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Se ha enviado un correo para restablecer la contraseña</DialogTitle>
                        <DialogDescription>Revisa tu correo para continuar con el proceso</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center items-center py-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setDialogOpen(false)} className="bg-blue-500 text-white">
                            Aceptar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ForgotPassword