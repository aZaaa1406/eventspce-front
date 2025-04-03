"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { URL_API } from "@/config"
import { Card } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface UserData {
    id_user: number
    nombre: string
    appat: string
    apmat: string
    email: string
    rol: string
    telefono: string
}

interface UserDataResponse {
    user: UserData
}

function PersonalInformation() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<UserData>({
        defaultValues: {
            nombre: "",
            appat: "",
            apmat: "", 
            email: "",
            rol: "",
            telefono: "",
        },
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true)
                const { data } = await axios.get<UserDataResponse>(`${URL_API}/api/users/getInfo`, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                })

                setUserData(data.user)
                form.reset(data.user)
            } catch (err) {
                console.error("Error obteniendo los datos del usuario", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUserData()
    }, [form])

    const handleEditToggle = () => {
        if (isEditing) {
            form.reset(userData || {})
        }
        setIsEditing(!isEditing)
    }
    console.log(userData);
    const onSubmit = async (values: UserData) => {
        try {
            setIsLoading(true)

            // 1️⃣ Detectar los campos modificados
            const updatedFields: Partial<UserData> = Object.keys(values).reduce((acc, key) => {
                const typedKey = key as keyof UserData;
                
                if (values[typedKey] !== userData?.[typedKey]) {
                  acc[typedKey] = values[typedKey] as any; // Conversión segura
                }
              
                return acc;
              }, {} as Partial<UserData>);
              
            // Si no hay cambios, no hacer la petición
            if (Object.keys(updatedFields).length === 0) {
                setIsEditing(false);
                setIsLoading(false);
                return;
            }
             const payload = {...updatedFields, id_user: userData?.id_user}
            // 2️⃣ Enviar solo los campos modificados
            const response = await axios.put(`${URL_API}/api/users/updateUser`, payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            // 3️⃣ Si la respuesta es exitosa, actualizar estado
            if (response.status === 200) {
                setUserData((prev) => ({ ...(prev || {} as UserData), ...updatedFields }));
                setIsEditing(false);
            }
        } catch (err) {
            console.error("Error actualizando los datos del usuario", err);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <Card className="p-9">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <h1 className="font-bold">Datos personales</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField name="nombre" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="appat" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido Paterno</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="apmat" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido Materno</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={!isEditing || isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <h1 className="font-bold items-center">Datos de contacto</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField name="telefono" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="email" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Correo Electrónico</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={true} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <div className="flex justify-end space-x-2">
                        {isEditing && (
                            <Button type="button" variant="outline" onClick={handleEditToggle} disabled={isLoading}>
                                Cancelar
                            </Button>
                        )}
                        <Button
                            type={isEditing ? "submit" : "button"}
                            onClick={isEditing ? undefined : handleEditToggle}
                            disabled={isLoading || (isEditing && !form.formState.isDirty)}
                        >
                            {isLoading ? "Procesando..." : isEditing ? "Guardar cambios" : "Editar datos"}
                        </Button>
                    </div>
                </form>
            </Form>
        </Card>
    )
}

export default PersonalInformation
