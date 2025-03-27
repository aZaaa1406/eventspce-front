"use client"; // Asegura que se renderice en el cliente

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import BirthdayForm from "./birthdayForm";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { URL_API }  from "@/config";

const registerSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es requerido"
  }).min(2, {
    message: "El nombre debe tener al menos 2 caracteres"
  }),
  appat: z.string({
    required_error: "El apellido paterno es requerido"
  }).min(2, {
    message: "El apellido paterno debe tener al menos 2 caracteres"
  }),
  apmat: z.string({
    required_error: "El apellido materno es requerido"
  }).min(2, {
    message: "El apellido materno debe tener al menos 2 caracteres"
  }),
  fechaNac: z.date({
    required_error: "La fecha de nacimiento es requerida"
  }).refine((date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
  }, {
    message: "Debe tener al menos 18 años"
  }).transform((date) => format(date, "yyyy-MM-dd")),
  email: z.string({
    required_error: "El correo es requerido"
  }).email({
    message: "El correo ingresado no es válido"
  }),
  telefono: z.string({
    required_error: "El teléfono es requerido"
  }).min(10, {
    message: "El teléfono debe tener al menos 10 caracteres"
  }).max(10, {
    message: "El teléfono debe tener máximo 10 caracteres"
  }),
  password: z.string().min(6).max(12).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&])[A-Za-z\d#\$%&]{6,12}$/, {
    message: "La contraseña debe tener al menos una mayúscula, una minúscula, un número y un carácter especial"
  }),
  rol: z.string().optional()
})


type RegisterType = z.infer<typeof registerSchema>;
// Recibe el rol como prop desde `page.tsx`
export default function FormRegister({ role }: { role: string }) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Función para enviar el formulario
  const onSubmit = form.handleSubmit(async (values: RegisterType) => {
    const rol = role;
    try {
      setIsLoading(true);
      values.rol = rol
      console.log("Datos", values);
      const { data } = await axios.post(`${URL_API}/api/users/register`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      })
      console.log("respuesta del servidor", data.status);
      if(data.status === 200){
        toast.success("Usuario registrado correctamente")
        router.push('/formsAuth/login')
      }
    } catch (error: any) {
      console.log("Error", error.response.data.error);
      toast.error("Ha ocurrido un error", {
        description: error.response.data.error
      })
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de {role}</CardTitle>
        <CardDescription>Ingrese los datos en el formulario para efectuar el registro</CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 flex flex-col items-center">
            <FormField
              name='nombre'
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type="Text" {...field} placeholder='Ingrese su nombre' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                name='appat'
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full max-w-sm">
                    <FormLabel>Apellido Paterno</FormLabel>
                    <FormControl>
                      <Input type="Text" {...field} placeholder='Ingrese su Apellido Paterno' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='apmat'
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full max-w-sm">
                    <FormLabel>Apellido Materno</FormLabel>
                    <FormControl>
                      <Input type="Text" {...field} placeholder='Ingrese su Apellido Materno' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="fechaNac"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <BirthdayForm control={form.control} {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="Text" {...field} placeholder='a@ejemplo.com' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='telefono'
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input type="Text" {...field} placeholder='5555555555' />
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
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='bg-blue-500 text-white max-w-sm'>
              {isLoading ? (
                <>
                  <Loader2 className='animate-spin' size={20} />
                  Creando cuenta
                </>
              ) : (
                'Crear cuenta'
              )}
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
