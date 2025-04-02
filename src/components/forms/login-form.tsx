"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { FormControl, Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { URL_API } from '@/config';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email("El correo no es válido"),
    password: z.string().min(1, "La contraseña es requerida"),
});

type LoginType = z.infer<typeof loginSchema>;

function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = form.handleSubmit(async (values: LoginType) => {
        setIsLoading(true);
        try {
            console.log("Datos enviados", values);
            const { data } = await axios.post(`${URL_API}/api/users/login`, values, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            
            if (data.status === 200) {
                toast.success("Inicio de sesión exitoso");
                setLoginSuccess(true); // Marcar éxito para ejecutar useEffect
            }
        } catch (error: any) {
            console.error("Error", error.response?.data?.error || error.message);
            toast.error("Ha ocurrido un error", {
                description: error.response?.data?.error || "Error desconocido",
            });
        } finally {
            setIsLoading(false);
        }
    });

    useEffect(() => {
        if (loginSuccess) {
            console.log("Redirigiendo a /cliente...");
            router.push('/cliente');
        }
    }, [loginSuccess, router]);

    return (
        <Card className="p-8">
            <CardHeader>
                <CardTitle className='font-bold text-2xl'>Inicio de Sesión</CardTitle>
                <CardDescription>Ingrese sus credenciales para acceder a su cuenta</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                <Form {...form}>
                    <form className="space-y-8 flex flex-col items-center" onSubmit={onSubmit}>
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full max-w-sm">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} placeholder='a@ejemplo.com' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='password'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full max-w-sm">
                                    <FormLabel className="flex justify-between items-center w-full">
                                        <p className="font-bold">Contraseña</p>
                                        <Link href={'/forgot-password'} className="text-xs text-blue-500">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='bg-blue-500 text-white max-w-sm'>
                            {isLoading ? (
                                <>
                                    <Loader2 className='animate-spin' size={20} />
                                    Iniciando Sesión...
                                </>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className='text-xs text-center'>
                <Link href={'/'} className='flex items-center space-x-1'>
                    <p>¿Aún no tienes cuenta?</p>
                    <span className='text-blue-500'>Regístrate</span>
                </Link>
            </CardFooter>
        </Card>
    );
}

export default LoginForm;
