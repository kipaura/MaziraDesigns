"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, FileIcon, Check } from "lucide-react"

interface FileUploadFieldProps {
  field: string
  label: string
  onChange: (field: string, value: File | null) => void
  accept?: string
  required?: boolean
  className?: string
}

export function FileUploadField({
  field,
  label,
  onChange,
  accept = "image/*",
  required = false,
  className,
}: FileUploadFieldProps) {
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
    <div className={className || "mb-4"}>
      <Label htmlFor={field} className="text-white mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="mt-1">
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
            className="w-full h-24 flex flex-col items-center justify-center bg-zinc-900 border border-zinc-700 border-dashed rounded-lg hover:bg-zinc-800 hover:border-zinc-600"
          >
            <Upload className="h-6 w-6 mb-2 text-zinc-400" />
            <span className="text-sm text-zinc-400">Click to upload {label}</span>
          </Button>
        ) : (
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-lg p-4">
            <div className="flex items-center">
              {preview ? (
                <div className="w-12 h-12 mr-3 rounded overflow-hidden bg-zinc-800 flex-shrink-0">
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 mr-3 rounded bg-zinc-800 flex items-center justify-center flex-shrink-0">
                  <FileIcon className="h-6 w-6 text-zinc-400" />
                </div>
              )}

              <div className="flex-grow min-w-0">
                <div className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                </div>
                <p className="text-xs text-zinc-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClearFile}
                className="ml-2 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
