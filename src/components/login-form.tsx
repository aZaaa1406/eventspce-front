"use client"
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from './ui/button'

const loginSchema = z.object({
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'El correo no es válido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    })
})

type LoginType = z.infer<typeof loginSchema>;
function LoginForm() {

    const form = useForm({
        resolver: zodResolver(loginSchema),
        
    })

    const onSubmit = form.handleSubmit((values: LoginType)=> {
        console.log(values);
    })
    console.log(form.watch());
    console.log(form.formState.errors);
    return (
        <Card className="p-8">
            <CardHeader >
                <CardTitle className='font-bold text-2xl'>Inicio de Sesión</CardTitle>
                <CardDescription className='align-middle'>Ingrese sus credenciales para acceder a su cuenta</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-8" onSubmit={onSubmit}>
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="Text" {...field} placeholder='a@ejemplo.com' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='password'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} max='12'/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className='bg-blue-500 text-white '>Ingresar</Button>
                    </form>
                </Form>
            </CardContent>


        </Card>
    )
}

export default LoginForm