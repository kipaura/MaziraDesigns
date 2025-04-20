"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VSpacer } from "@/components/ui/spacing"
import { Button } from "@/components/ui/button"
import { Upload, X, FileIcon, Check } from "lucide-react"
import { useState, useRef } from "react"
import { cn } from "@/lib/utils"

// Common base field props
interface BaseFieldProps {
  field: string
  label: string
  onChange: (field: string, value: any) => void
  className?: string
  required?: boolean
  error?: string
}

// Base field component with common layout
function BaseField({ field, label, children, className, required, error }: BaseFieldProps & { children: React.ReactNode }) {
  return (
    <div className={className || "mb-6"}>
      <Label htmlFor={field} className="text-white mb-2 block text-base">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

interface TextFieldProps extends BaseFieldProps {
  value: string
  type?: "text" | "email" | "password" | "tel"
  placeholder?: string
}

export function TextField({ field, label, value, onChange, className, required, error, type = "text", placeholder }: TextFieldProps) {
  return (
    <BaseField field={field} label={label} onChange={onChange} className={className} required={required} error={error}>
      <Input
        id={field}
        type={type}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className={cn(
          "bg-zinc-900 border-zinc-700 text-white",
          error && "border-red-500 focus-visible:ring-red-500"
        )}
        required={required}
        placeholder={placeholder}
      />
    </BaseField>
  )
}

interface TextareaFieldProps extends BaseFieldProps {
  value: string
  placeholder?: string
}

export function TextareaField({ field, label, value, onChange, className, required, error, placeholder }: TextareaFieldProps) {
  return (
    <BaseField field={field} label={label} onChange={onChange} className={className} required={required} error={error}>
      <Textarea
        id={field}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        className={cn(
          "bg-zinc-900 border-zinc-700 text-white min-h-[100px]",
          error && "border-red-500 focus-visible:ring-red-500"
        )}
        required={required}
        placeholder={placeholder}
      />
    </BaseField>
  )
}

interface NumberFieldProps extends BaseFieldProps {
  value: string | number;  // Allow both string and number
}

export function NumberField({ field, label, value, onChange, className }: NumberFieldProps) {
  // Convert value to string for input
  const stringValue = value?.toString() || '';
  
  return (
    <BaseField field={field} label={label} onChange={onChange} className={className}>
      <Input
        id={field}
        type="number"
        value={stringValue}
        onChange={(e) => {
          // Convert empty string to undefined, otherwise keep as string
          const newValue = e.target.value === '' ? undefined : e.target.value;
          onChange(field, newValue);
        }}
        className="bg-zinc-900 border-zinc-700 text-white"
      />
    </BaseField>
  );
}

interface DropdownFieldProps extends BaseFieldProps {
  options: string[]
  value: string
}

export function DropdownField({ field, label, options, value, onChange, className }: DropdownFieldProps) {
  return (
    <BaseField field={field} label={label} onChange={onChange} className={className}>
      <Select value={value} onValueChange={(value) => onChange(field, value)}>
        <SelectTrigger id={field} className="bg-zinc-900 border-zinc-700 text-white">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="focus:bg-zinc-700 focus:text-white">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </BaseField>
  )
}

interface CheckboxFieldProps extends BaseFieldProps {
  options: string[]
  value: string[]
}

export function CheckboxField({ field, label, options, value, onChange, className }: CheckboxFieldProps) {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange(field, [...value, option])
    } else {
      onChange(
        field,
        value.filter((item) => item !== option),
      )
    }
  }

  return (
    <div className={className || "mb-6"}>
      <Label className="text-white mb-3 block text-base">{label}</Label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-3 py-1">
            <Checkbox
              id={`${field}-${option}`}
              checked={value.includes(option)}
              onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
              className="border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
            />
            <Label htmlFor={`${field}-${option}`} className="text-white text-sm font-normal cursor-pointer">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FileUploadFieldProps extends BaseFieldProps {
  onChange: (field: string, value: File | null) => void
  accept?: string
  required?: boolean
}

export function FileUploadField({
  field,
  label,
  onChange,
  accept = "image/*",
  required = false,
  className,
}: FileUploadFieldProps) {
  // TODO: This component has inconsistent styling compared to the standalone FileUploadField component
  // Standardize the styling between these components for a more consistent UI
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null

    if (selectedFile) {
      setFile(selectedFile)
      onChange(field, selectedFile)

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  const handleClearFile = () => {
    setFile(null)
    setPreview(null)
    onChange(field, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className || "mb-6"}>
      <Label htmlFor={field} className="text-white mb-2 block text-base">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="mt-2">
        <input
          id={field}
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="sr-only"
          required={required}
        />

        {!file ? (
          <Button
            type="button"
            onClick={handleButtonClick}
            className="w-full h-28 flex flex-col items-center justify-center bg-zinc-900 border border-zinc-700 border-dashed rounded-lg hover:bg-zinc-800 hover:border-zinc-600"
          >
            <Upload className="h-6 w-6 mb-3 text-zinc-400" />
            <span className="text-sm text-zinc-400">Click to upload {label}</span>
          </Button>
        ) : (
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg p-5">
            <div className="flex items-center">
              {preview ? (
                <div className="w-14 h-14 mr-4 rounded overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-14 h-14 mr-4 rounded bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <FileIcon className="h-7 w-7 text-zinc-400" />
                </div>
              )}

              <div className="flex-grow min-w-0">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearFile}
                className="ml-2 text-zinc-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Form group component for consistent spacing
interface FormGroupProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function FormGroup({ children, title, description }: FormGroupProps) {
  return (
    <div className="mb-8">
      {title && <h3 className="text-lg font-bold text-white mb-2">{title}</h3>}
      {description && <p className="text-zinc-400 text-sm mb-4">{description}</p>}
      <div className="space-y-4">{children}</div>
    </div>
  )
}

// Form section divider
export function FormDivider() {
  return (
    <>
      <VSpacer size="md" />
      <div className="h-px w-full bg-zinc-800"></div>
      <VSpacer size="md" />
    </>
  )
}
