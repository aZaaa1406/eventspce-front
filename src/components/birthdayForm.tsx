"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useController, type Control } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

  // Días de la semana en español
  const weekdays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"]

  // Función para obtener los días del mes actual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Función para obtener el día de la semana del primer día del mes (0 = domingo, 1 = lunes, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1).getDay()
    // Ajustar para que lunes sea 0, domingo sea 6
    return firstDay === 0 ? 6 : firstDay - 1
  }

  // Obtener días del mes actual
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

  // Generar array de días para mostrar en el calendario
  const calendarDays = React.useMemo(() => {
    const days = []

    // Añadir días vacíos al principio para alinear con el día de la semana correcto
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Añadir los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }

    return days
  }, [daysInMonth, firstDayOfMonth])

  // Función para manejar la selección de un día
  const handleDayClick = (day: number | null) => {
    if (day === null) return
    const selectedDate = new Date(currentYear, currentMonth, day)
    onChange(selectedDate)
  }

  // Verificar si un día está seleccionado
  const isDaySelected = (day: number | null) => {
    if (day === null || !value) return false
    const selectedDate = new Date(value)
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    )
  }

  // Verificar si un día es hoy
  const isToday = (day: number | null) => {
    if (day === null) return false
    const today = new Date()
    return today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear
  }

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

          {/* Calendario personalizado */}
          <div className="p-3">
            {/* Encabezado de días de la semana */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekdays.map((day, index) => (
                <div
                  key={index}
                  className="text-center text-sm font-medium text-muted-foreground h-9 flex items-center justify-center"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-9 w-9 p-0 font-normal text-center flex items-center justify-center rounded-md",
                    day === null ? "invisible" : "cursor-pointer hover:bg-accent",
                    isDaySelected(day) &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isToday(day) && !isDaySelected(day) && "bg-accent text-accent-foreground",
                  )}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </FormControl>
  )
}

