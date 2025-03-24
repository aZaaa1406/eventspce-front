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

// Componente personalizado para la navegación del calendario
function CustomNavigation({
  currentMonth,
  currentYear,
  onMonthChange,
  onYearChange,
  goToNextMonth,
  goToPreviousMonth,
}: {
  currentMonth: number
  currentYear: number
  onMonthChange: (month: number) => void
  onYearChange: (year: number) => void
  goToNextMonth: () => void
  goToPreviousMonth: () => void
}) {
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

  const currentYearDate = new Date()
  const maxYear = currentYearDate.getFullYear()
  const minYear = 1930
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i)

  return (
    <div className="flex items-center justify-between px-2 py-1">
      <Button variant="outline" size="icon" className="h-7 w-7" onClick={goToPreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-1">
        <Select value={currentMonth.toString()} onValueChange={(value) => onMonthChange(Number.parseInt(value))}>
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
        <Select value={currentYear.toString()} onValueChange={(value) => onYearChange(Number.parseInt(value))}>
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
  )
}

interface BirthdayFormProps {
  name: string
  control: Control<any>
  required?: boolean
}

export default function BirthdayForm({ name, control = false }: BirthdayFormProps) {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: undefined,
  })

  // Transformar la fecha a formato YYYY-MM-DD para el envío
  React.useEffect(() => {
    if (value) {
      // Esta línea no modifica lo que se muestra, solo cómo se envía el valor
      const formattedDate = format(value, "yyyy-MM-dd")
      // Si necesitas que el valor sea string en lugar de Date, descomenta la siguiente línea
      onChange(formattedDate);
    }
  }, [value])

  const [calendarDate, setCalendarDate] = React.useState<Date>(new Date())

  const handleMonthChange = (month: number) => {
    const newDate = new Date(calendarDate)
    newDate.setMonth(month)
    setCalendarDate(newDate)
  }

  const handleYearChange = (year: number) => {
    const newDate = new Date(calendarDate)
    newDate.setFullYear(year)
    setCalendarDate(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(calendarDate)
    newDate.setMonth(newDate.getMonth() + 1)
    setCalendarDate(newDate)
  }

  const goToPreviousMonth = () => {
    const newDate = new Date(calendarDate)
    newDate.setMonth(newDate.getMonth() - 1)
    setCalendarDate(newDate)
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
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            month={calendarDate}
            onMonthChange={setCalendarDate}
            initialFocus
            locale={es}
            fromYear={1930}
            toYear={new Date().getFullYear()}
            components={{
              Caption: ({ displayMonth }) => (
                <CustomNavigation
                  currentMonth={displayMonth.getMonth()}
                  currentYear={displayMonth.getFullYear()}
                  onMonthChange={handleMonthChange}
                  onYearChange={handleYearChange}
                  goToNextMonth={goToNextMonth}
                  goToPreviousMonth={goToPreviousMonth}
                />
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </FormControl>
  )
}

