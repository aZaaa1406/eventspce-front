"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useController, type Control } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl } from "@/components/ui/form"

interface BirthdayFormProps {
  name: string
  control: Control<any>
}

export default function BirthdayForm({ name, control }: BirthdayFormProps) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: undefined,
  })

  // Estado para el mes y año actuales
  const [month, setMonth] = React.useState<Date>(new Date())

  // Obtener el mes y año actuales
  const currentMonth = month ? month.getMonth() : new Date().getMonth()
  const currentYear = month ? month.getFullYear() : new Date().getFullYear()

  // Función para cambiar el mes
  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(currentYear, monthIndex, 1)
    setMonth(newDate)
  }

  // Función para cambiar el año
  const handleYearChange = (year: number) => {
    const newDate = new Date(year, currentMonth, 1)
    setMonth(newDate)
  }

  // Función para ir al mes siguiente
  const goToNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1)
    setMonth(newDate)
  }

  // Función para ir al mes anterior
  const goToPreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1)
    setMonth(newDate)
  }

  // Lista de meses en español
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  // Generar lista de años desde 1930 hasta el año actual
  const currentYearDate = new Date()
  const maxYear = currentYearDate.getFullYear()
  const minYear = 1930
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i)

  return (
    <FormControl>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "yyyy-MM-dd") : <span>Fecha de cumpleaños</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {/* Navegación personalizada */}
          <div className="flex items-center justify-between px-2 py-2 border-b">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToPreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1">
              <Select
                value={currentMonth.toString()}
                onValueChange={(value) => handleMonthChange(Number.parseInt(value))}
              >
                <SelectTrigger className="h-8 w-[110px]">
                  <SelectValue placeholder="Mes" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={currentYear.toString()}
                onValueChange={(value) => handleYearChange(Number.parseInt(value))}
              >
                <SelectTrigger className="h-8 w-[90px]">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendario */}
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            month={month}
            onMonthChange={setMonth}
            initialFocus
            locale={es}
            showOutsideDays={false}
            // No usamos el prop components ya que causa error de tipo
            // En su lugar, hemos añadido nuestra navegación personalizada arriba
          />
        </PopoverContent>
      </Popover>
    </FormControl>
  )
}

