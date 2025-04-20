import { cn } from "@/lib/utils"

export interface TextareaFieldProps {
  field: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
  className?: string
  rows?: number
}

export function TextareaField({
  field,
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  className,
  rows = 4,
}: TextareaFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={field} className="block text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={field}
        name={field}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={cn(
          "mt-1 block w-full rounded-md shadow-sm bg-transparent",
          "border border-zinc-700 focus:border-purple-500 focus:ring-purple-500",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          "text-white placeholder-zinc-400"
        )}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
} 