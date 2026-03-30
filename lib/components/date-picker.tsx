"use client"

import * as React from "react"
import { format as fnsFormat, parse as fnsParse, isValid as fnsIsValid } from "date-fns"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// ---------------------------------------------------------------------------
// Locale-aware formatting helpers
// ---------------------------------------------------------------------------

function getBrowserLocale(): string {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language
  }
  return "en-US"
}

/** Format a Date for display using Intl (locale-aware short) or a date-fns pattern */
function formatDateDisplay(date: Date | undefined, displayFormat: string, locale: string): string {
  if (!date || !fnsIsValid(date)) return ""
  if (displayFormat) {
    return fnsFormat(date, displayFormat)
  }
  return date.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" })
}

/** Format a time for display */
function formatTimeDisplay(date: Date | undefined, displayFormat: string, locale: string): string {
  if (!date || !fnsIsValid(date)) return ""
  if (displayFormat) {
    return fnsFormat(date, displayFormat)
  }
  return date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: false })
}

/** Format a Date for the hidden form value (native HTML date: YYYY-MM-DD) */
function formatDateValue(date: Date | undefined, valueFormat: string): string {
  if (!date || !fnsIsValid(date)) return ""
  if (valueFormat) return fnsFormat(date, valueFormat)
  return fnsFormat(date, "yyyy-MM-dd")
}

/** Format a datetime for the hidden form value (native HTML datetime-local: YYYY-MM-DDTHH:mm) */
function formatDateTimeValue(date: Date | undefined, valueFormat: string): string {
  if (!date || !fnsIsValid(date)) return ""
  if (valueFormat) return fnsFormat(date, valueFormat)
  return fnsFormat(date, "yyyy-MM-dd'T'HH:mm")
}

/** Format a time for the hidden form value (native HTML time: HH:mm) */
function formatTimeValue(date: Date | undefined, valueFormat: string): string {
  if (!date || !fnsIsValid(date)) return ""
  if (valueFormat) return fnsFormat(date, valueFormat)
  return fnsFormat(date, "HH:mm")
}

/** Try to parse a user-typed string into a Date */
function parseUserDate(text: string, displayFormat: string): Date | undefined {
  if (!text.trim()) return undefined
  if (displayFormat) {
    const parsed = fnsParse(text, displayFormat, new Date())
    if (fnsIsValid(parsed)) return parsed
  }
  const native = new Date(text)
  if (fnsIsValid(native)) return native
  for (const fmt of ["dd.MM.yyyy", "dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"]) {
    const parsed = fnsParse(text, fmt, new Date())
    if (fnsIsValid(parsed)) return parsed
  }
  return undefined
}

/** Try to parse a time string */
function parseUserTime(text: string, displayFormat: string): Date | undefined {
  if (!text.trim()) return undefined
  if (displayFormat) {
    const parsed = fnsParse(text, displayFormat, new Date())
    if (fnsIsValid(parsed)) return parsed
  }
  for (const fmt of ["HH:mm", "hh:mm a", "H:mm", "h:mm a"]) {
    const parsed = fnsParse(text, fmt, new Date())
    if (fnsIsValid(parsed)) return parsed
  }
  return undefined
}

/** Merge date and time from two Date objects */
function mergeDateAndTime(date: Date | undefined, time: Date | undefined): Date | undefined {
  if (!date) return undefined
  const result = new Date(date)
  if (time && fnsIsValid(time)) {
    result.setHours(time.getHours(), time.getMinutes(), 0, 0)
  } else {
    result.setHours(0, 0, 0, 0)
  }
  return result
}

// ---------------------------------------------------------------------------
// DatePicker
// ---------------------------------------------------------------------------

interface DatePickerProps extends Omit<React.ComponentProps<"div">, "defaultValue"> {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  /** date-fns format pattern for display (default: browser locale short date) */
  displayFormat?: string
  /** date-fns format pattern for the hidden form value (default: yyyy-MM-dd) */
  valueFormat?: string
  /** BCP 47 locale string for Intl formatting (default: navigator.language) */
  locale?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  id?: string
}

function DatePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  displayFormat = "",
  valueFormat = "",
  locale: localeProp,
  name,
  placeholder,
  disabled = false,
  id,
  className,
  ...props
}: DatePickerProps) {
  const locale = localeProp || getBrowserLocale()
  const [open, setOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue)
  const date = controlledValue !== undefined ? controlledValue : internalDate
  const [inputValue, setInputValue] = React.useState(formatDateDisplay(date, displayFormat, locale))
  const [month, setMonth] = React.useState<Date | undefined>(date || new Date())

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(formatDateDisplay(controlledValue, displayFormat, locale))
    }
  }, [controlledValue, displayFormat, locale])

  const updateDate = React.useCallback((newDate: Date | undefined) => {
    setInternalDate(newDate)
    setInputValue(formatDateDisplay(newDate, displayFormat, locale))
    onValueChange?.(newDate)
  }, [displayFormat, locale, onValueChange])

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputValue(text)
    const parsed = parseUserDate(text, displayFormat)
    if (parsed) {
      setInternalDate(parsed)
      setMonth(parsed)
      onValueChange?.(parsed)
    } else if (!text.trim()) {
      setInternalDate(undefined)
      onValueChange?.(undefined)
    }
  }, [displayFormat, onValueChange])

  const handleInputBlur = React.useCallback(() => {
    setInputValue(formatDateDisplay(date, displayFormat, locale))
  }, [date, displayFormat, locale])

  const handleCalendarSelect = React.useCallback((selected: Date | undefined) => {
    updateDate(selected)
    setOpen(false)
  }, [updateDate])

  const placeholderText = placeholder || formatDateDisplay(new Date(), displayFormat, locale)

  return (
    <div data-slot="date-picker" className={cn("relative", className)} {...props}>
      <InputGroup>
        <InputGroupInput
          id={id}
          value={inputValue}
          placeholder={placeholderText}
          disabled={disabled}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date"
                  disabled={disabled}
                />
              }
            />
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={handleCalendarSelect}
              />
            </PopoverContent>
          </Popover>
          <CalendarIcon className="pointer-events-none" />
        </InputGroupAddon>
      </InputGroup>
      {name && (
        <input type="hidden" name={name} value={formatDateValue(date, valueFormat)} />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// TimePicker
// ---------------------------------------------------------------------------

interface TimePickerProps extends Omit<React.ComponentProps<"div">, "defaultValue"> {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  /** date-fns format pattern for display (default: browser locale HH:mm) */
  displayFormat?: string
  /** date-fns format pattern for the hidden form value (default: HH:mm) */
  valueFormat?: string
  locale?: string
  name?: string
  placeholder?: string
  disabled?: boolean
  id?: string
}

function TimePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  displayFormat = "",
  valueFormat = "",
  locale: localeProp,
  name,
  placeholder,
  disabled = false,
  id,
  className,
  ...props
}: TimePickerProps) {
  const locale = localeProp || getBrowserLocale()
  const [internalTime, setInternalTime] = React.useState<Date | undefined>(defaultValue)
  const time = controlledValue !== undefined ? controlledValue : internalTime
  const [inputValue, setInputValue] = React.useState(formatTimeDisplay(time, displayFormat, locale))

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setInputValue(formatTimeDisplay(controlledValue, displayFormat, locale))
    }
  }, [controlledValue, displayFormat, locale])

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setInputValue(text)
    const parsed = parseUserTime(text, displayFormat)
    if (parsed) {
      setInternalTime(parsed)
      onValueChange?.(parsed)
    } else if (!text.trim()) {
      setInternalTime(undefined)
      onValueChange?.(undefined)
    }
  }, [displayFormat, onValueChange])

  const handleInputBlur = React.useCallback(() => {
    setInputValue(formatTimeDisplay(time, displayFormat, locale))
  }, [time, displayFormat, locale])

  const placeholderText = placeholder || formatTimeDisplay(new Date(), displayFormat, locale)

  return (
    <div data-slot="time-picker" className={cn("relative", className)} {...props}>
      <InputGroup>
        <InputGroupInput
          id={id}
          value={inputValue}
          placeholder={placeholderText}
          disabled={disabled}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <InputGroupAddon align="inline-end">
          <ClockIcon className="pointer-events-none" />
        </InputGroupAddon>
      </InputGroup>
      {name && (
        <input type="hidden" name={name} value={formatTimeValue(time, valueFormat)} />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// DateTimePicker
// ---------------------------------------------------------------------------

interface DateTimePickerProps extends Omit<React.ComponentProps<"div">, "defaultValue"> {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  /** date-fns format pattern for date display (default: browser locale short date) */
  displayFormat?: string
  /** date-fns format pattern for time display (default: browser locale HH:mm) */
  timeDisplayFormat?: string
  /** date-fns format pattern for the hidden form value (default: yyyy-MM-dd'T'HH:mm) */
  valueFormat?: string
  locale?: string
  name?: string
  placeholder?: string
  timePlaceholder?: string
  disabled?: boolean
  id?: string
}

function DateTimePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  displayFormat = "",
  timeDisplayFormat = "",
  valueFormat = "",
  locale: localeProp,
  name,
  placeholder,
  timePlaceholder,
  disabled = false,
  id,
  className,
  ...props
}: DateTimePickerProps) {
  const locale = localeProp || getBrowserLocale()
  const [open, setOpen] = React.useState(false)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue)
  const dateTime = controlledValue !== undefined ? controlledValue : internalDate
  const [dateInputValue, setDateInputValue] = React.useState(formatDateDisplay(dateTime, displayFormat, locale))
  const [timeInputValue, setTimeInputValue] = React.useState(formatTimeDisplay(dateTime, timeDisplayFormat, locale))
  const [month, setMonth] = React.useState<Date | undefined>(dateTime || new Date())

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setDateInputValue(formatDateDisplay(controlledValue, displayFormat, locale))
      setTimeInputValue(formatTimeDisplay(controlledValue, timeDisplayFormat, locale))
    }
  }, [controlledValue, displayFormat, timeDisplayFormat, locale])

  const updateDateTime = React.useCallback((newDate: Date | undefined) => {
    setInternalDate(newDate)
    setDateInputValue(formatDateDisplay(newDate, displayFormat, locale))
    setTimeInputValue(formatTimeDisplay(newDate, timeDisplayFormat, locale))
    onValueChange?.(newDate)
  }, [displayFormat, timeDisplayFormat, locale, onValueChange])

  const handleDateInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setDateInputValue(text)
    const parsed = parseUserDate(text, displayFormat)
    if (parsed) {
      const merged = mergeDateAndTime(parsed, dateTime)
      setInternalDate(merged)
      setMonth(parsed)
      onValueChange?.(merged)
    } else if (!text.trim()) {
      setInternalDate(undefined)
      onValueChange?.(undefined)
    }
  }, [displayFormat, dateTime, onValueChange])

  const handleTimeInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setTimeInputValue(text)
    const parsed = parseUserTime(text, timeDisplayFormat)
    if (parsed) {
      const base = dateTime || new Date()
      const merged = mergeDateAndTime(base, parsed)
      setInternalDate(merged)
      onValueChange?.(merged)
    } else if (!text.trim()) {
      if (dateTime) {
        const cleared = new Date(dateTime)
        cleared.setHours(0, 0, 0, 0)
        setInternalDate(cleared)
        onValueChange?.(cleared)
      }
    }
  }, [timeDisplayFormat, dateTime, onValueChange])

  const handleDateInputBlur = React.useCallback(() => {
    setDateInputValue(formatDateDisplay(dateTime, displayFormat, locale))
  }, [dateTime, displayFormat, locale])

  const handleTimeInputBlur = React.useCallback(() => {
    setTimeInputValue(formatTimeDisplay(dateTime, timeDisplayFormat, locale))
  }, [dateTime, timeDisplayFormat, locale])

  const handleCalendarSelect = React.useCallback((selected: Date | undefined) => {
    if (selected) {
      const merged = mergeDateAndTime(selected, dateTime)
      updateDateTime(merged)
    } else {
      updateDateTime(undefined)
    }
    setOpen(false)
  }, [dateTime, updateDateTime])

  const datePlaceholder = placeholder || formatDateDisplay(new Date(), displayFormat, locale)
  const timePlaceholderText = timePlaceholder || formatTimeDisplay(new Date(), timeDisplayFormat, locale)

  return (
    <div data-slot="date-time-picker" className={cn("relative flex gap-2", className)} {...props}>
      <InputGroup className="flex-1">
        <InputGroupInput
          id={id}
          value={dateInputValue}
          placeholder={datePlaceholder}
          disabled={disabled}
          onChange={handleDateInputChange}
          onBlur={handleDateInputBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date"
                  disabled={disabled}
                />
              }
            />
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={dateTime}
                month={month}
                onMonthChange={setMonth}
                onSelect={handleCalendarSelect}
              />
            </PopoverContent>
          </Popover>
          <CalendarIcon className="pointer-events-none" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup className="w-28 shrink-0">
        <InputGroupInput
          value={timeInputValue}
          placeholder={timePlaceholderText}
          disabled={disabled}
          onChange={handleTimeInputChange}
          onBlur={handleTimeInputBlur}
        />
        <InputGroupAddon align="inline-end">
          <ClockIcon className="pointer-events-none" />
        </InputGroupAddon>
      </InputGroup>
      {name && (
        <input type="hidden" name={name} value={formatDateTimeValue(dateTime, valueFormat)} />
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// DateRangePicker
// ---------------------------------------------------------------------------

interface DateRangePickerProps extends Omit<React.ComponentProps<"div">, "defaultValue"> {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  /** date-fns format pattern for display (default: browser locale short date) */
  displayFormat?: string
  /** date-fns format pattern for the hidden form values (default: yyyy-MM-dd) */
  valueFormat?: string
  locale?: string
  /** Name prefix for the hidden form inputs (creates {name}-from and {name}-to) */
  name?: string
  placeholderFrom?: string
  placeholderTo?: string
  disabled?: boolean
  id?: string
  numberOfMonths?: number
}

function DateRangePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  displayFormat = "",
  valueFormat = "",
  locale: localeProp,
  name,
  placeholderFrom,
  placeholderTo,
  disabled = false,
  id,
  numberOfMonths = 2,
  className,
  ...props
}: DateRangePickerProps) {
  const locale = localeProp || getBrowserLocale()
  const [open, setOpen] = React.useState(false)
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(defaultValue)
  const range = controlledValue !== undefined ? controlledValue : internalRange
  const [fromInputValue, setFromInputValue] = React.useState(formatDateDisplay(range?.from, displayFormat, locale))
  const [toInputValue, setToInputValue] = React.useState(formatDateDisplay(range?.to, displayFormat, locale))
  const [month, setMonth] = React.useState<Date | undefined>(range?.from || new Date())

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setFromInputValue(formatDateDisplay(controlledValue?.from, displayFormat, locale))
      setToInputValue(formatDateDisplay(controlledValue?.to, displayFormat, locale))
    }
  }, [controlledValue, displayFormat, locale])

  const updateRange = React.useCallback((newRange: DateRange | undefined) => {
    setInternalRange(newRange)
    setFromInputValue(formatDateDisplay(newRange?.from, displayFormat, locale))
    setToInputValue(formatDateDisplay(newRange?.to, displayFormat, locale))
    onValueChange?.(newRange)
  }, [displayFormat, locale, onValueChange])

  const handleFromInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setFromInputValue(text)
    const parsed = parseUserDate(text, displayFormat)
    if (parsed) {
      const newRange = { from: parsed, to: range?.to }
      setInternalRange(newRange)
      setMonth(parsed)
      onValueChange?.(newRange)
    } else if (!text.trim()) {
      const newRange = { from: undefined, to: range?.to }
      setInternalRange(newRange)
      onValueChange?.(newRange)
    }
  }, [displayFormat, range, onValueChange])

  const handleToInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value
    setToInputValue(text)
    const parsed = parseUserDate(text, displayFormat)
    if (parsed) {
      const newRange = { from: range?.from, to: parsed }
      setInternalRange(newRange)
      onValueChange?.(newRange)
    } else if (!text.trim()) {
      const newRange = { from: range?.from, to: undefined }
      setInternalRange(newRange)
      onValueChange?.(newRange)
    }
  }, [displayFormat, range, onValueChange])

  const handleFromBlur = React.useCallback(() => {
    setFromInputValue(formatDateDisplay(range?.from, displayFormat, locale))
  }, [range, displayFormat, locale])

  const handleToBlur = React.useCallback(() => {
    setToInputValue(formatDateDisplay(range?.to, displayFormat, locale))
  }, [range, displayFormat, locale])

  const handleCalendarSelect = React.useCallback((selected: DateRange | undefined) => {
    updateRange(selected)
    if (selected?.from && selected?.to) {
      setOpen(false)
    }
  }, [updateRange])

  const fromPlaceholder = placeholderFrom || formatDateDisplay(new Date(), displayFormat, locale)
  const toPlaceholder = placeholderTo || formatDateDisplay(new Date(), displayFormat, locale)

  return (
    <div data-slot="date-range-picker" className={cn("relative flex gap-2 items-center", className)} {...props}>
      <InputGroup className="flex-1">
        <InputGroupInput
          id={id}
          value={fromInputValue}
          placeholder={fromPlaceholder}
          disabled={disabled}
          onChange={handleFromInputChange}
          onBlur={handleFromBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <CalendarIcon className="pointer-events-none" />
        </InputGroupAddon>
      </InputGroup>
      <span className="text-muted-foreground text-sm shrink-0">–</span>
      <InputGroup className="flex-1">
        <InputGroupInput
          value={toInputValue}
          placeholder={toPlaceholder}
          disabled={disabled}
          onChange={handleToInputChange}
          onBlur={handleToBlur}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <InputGroupAddon align="inline-end">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Select date range"
                  disabled={disabled}
                />
              }
            />
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="range"
                selected={range}
                month={month}
                onMonthChange={setMonth}
                numberOfMonths={numberOfMonths}
                onSelect={handleCalendarSelect}
              />
            </PopoverContent>
          </Popover>
          <CalendarIcon className="pointer-events-none" />
        </InputGroupAddon>
      </InputGroup>
      {name && (
        <>
          <input type="hidden" name={`${name}-from`} value={formatDateValue(range?.from, valueFormat)} />
          <input type="hidden" name={`${name}-to`} value={formatDateValue(range?.to, valueFormat)} />
        </>
      )}
    </div>
  )
}

export default DatePicker

export {
  DatePicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
}
