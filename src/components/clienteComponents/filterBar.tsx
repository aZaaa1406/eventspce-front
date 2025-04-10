"use client"
import React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Card } from "../ui/card"
import { FormField } from "../ui/form"
import { Button } from "../ui/button"
import { Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu"
import { Slider } from "../ui/slider"

// Simula datos obtenidos del backend
const minPrecio = 1000
const maxPrecio = 10000
const minCapacidad = 20
const maxCapacidad = 500
const alcaldias = [
  "Álvaro Obregón",
  "Benito Juárez",
  "Coyoacán",
  "Cuauhtémoc",
  "Gustavo A. Madero",
  "Iztapalapa",
]

export default function FilterBar() {
  const form = useForm({
    defaultValues: {
      alcaldia: "",
      precio: [minPrecio, maxPrecio],
      capacidad: [minCapacidad, maxCapacidad],
    },
  })

  const [selectedAlcaldia, setSelectedAlcaldia] = React.useState("")
  const [precioVisible, setPrecioVisible] = React.useState(false)
  const [capacidadVisible, setCapacidadVisible] = React.useState(false)

  const onSubmit = async (data: any) => {
    console.log("Filtros seleccionados:", data)
    // Aquí puedes hacer una petición al servidor con los filtros
  }

  return (
    <Card className="p-4 rounded-full">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap items-center gap-4"
        >
          {/* Dropdown para alcaldía */}
          <FormField
            name="alcaldia"
            control={form.control}
            render={({ field }) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    {selectedAlcaldia || "Selecciona alcaldía"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 ">
                  <DropdownMenuLabel>Alcaldía</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={selectedAlcaldia}
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedAlcaldia(value)
                    }}
                  >
                    {alcaldias.map((alcaldia) => (
                      <DropdownMenuRadioItem key={alcaldia} value={alcaldia}>
                        {alcaldia}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />

          {/* Dropdown para Precio */}
          <FormField
            name="precio"
            control={form.control}
            render={({ field }) => (
              <DropdownMenu open={precioVisible} onOpenChange={setPrecioVisible}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    Precio: ${field.value[0]} - ${field.value[1]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-4 w-72">
                  <DropdownMenuLabel>Rango de precios</DropdownMenuLabel>
                  <Slider
                    min={minPrecio}
                    max={maxPrecio + 2000}
                    step={100}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />

          {/* Dropdown para Capacidad */}
          <FormField
            name="capacidad"
            control={form.control}
            render={({ field }) => (
              <DropdownMenu open={capacidadVisible} onOpenChange={setCapacidadVisible}>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    Capacidad: {field.value[0]} - {field.value[1]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-4 w-72">
                  <DropdownMenuLabel>Capacidad (personas)</DropdownMenuLabel>
                  <Slider
                    min={minCapacidad}
                    max={maxCapacidad}
                    step={10}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />

          {/* Botón de búsqueda */}
          <Button
            type="submit"
            className="bg-purple-400 p-2 rounded-full flex items-center justify-center"
          >
            <Search />
          </Button>
        </form>
      </FormProvider>
    </Card>
  )
}
