"use client"

import { useState, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

interface FormState<T> {
  data: T
  errors: Record<keyof T, string>
  isLoading: boolean
  isSubmitting: boolean
}

interface UseFormOptions<T> {
  initialData: T
  validationSchema?: {
    [K in keyof T]?: (value: T[K]) => string | undefined
  }
  onSubmit: (data: T) => Promise<void>
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

export function useForm<T extends Record<string, any>>({
  initialData,
  validationSchema,
  onSubmit,
  onSuccess,
  onError,
}: UseFormOptions<T>) {
  const [state, setState] = useState<FormState<T>>({
    data: initialData,
    errors: {} as Record<keyof T, string>,
    isLoading: false,
    isSubmitting: false,
  })

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      if (!validationSchema?.[field]) return undefined
      return validationSchema[field]!(value)
    },
    [validationSchema]
  )

  const validateForm = useCallback(() => {
    const errors = {} as Record<keyof T, string>
    let isValid = true

    if (validationSchema) {
      Object.keys(validationSchema).forEach((field) => {
        const error = validateField(field as keyof T, state.data[field as keyof T])
        if (error) {
          errors[field as keyof T] = error
          isValid = false
        }
      })
    }

    setState((prev) => ({ ...prev, errors }))
    return isValid
  }, [state.data, validateField, validationSchema])

  const handleChange = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      setState((prev) => ({
        ...prev,
        data: { ...prev.data, [field]: value },
        errors: { ...prev.errors, [field]: validateField(field, value) },
      }))
    },
    [validateField]
  )

  const handleFileUpload = useCallback(
    async (field: keyof T, file: File, uploadPreset: string) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }))

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", uploadPreset)

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error("File upload failed")
        }

        const data = await response.json()
        handleChange(field, data.secure_url)
      } catch (error) {
        toast({
          title: "Upload Error",
          description: "Failed to upload file. Please try again.",
          variant: "destructive",
        })
        throw error
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    },
    [handleChange]
  )

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()

      if (!validateForm()) {
        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive",
        })
        return
      }

      try {
        setState((prev) => ({ ...prev, isSubmitting: true }))
        await onSubmit(state.data)
        onSuccess?.(state.data)
        toast({
          title: "Success",
          description: "Form submitted successfully.",
        })
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred"
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        onError?.(error instanceof Error ? error : new Error(errorMessage))
      } finally {
        setState((prev) => ({ ...prev, isSubmitting: false }))
      }
    },
    [state.data, validateForm, onSubmit, onSuccess, onError]
  )

  const resetForm = useCallback(() => {
    setState({
      data: initialData,
      errors: {} as Record<keyof T, string>,
      isLoading: false,
      isSubmitting: false,
    })
  }, [initialData])

  return {
    ...state,
    handleChange,
    handleFileUpload,
    handleSubmit,
    resetForm,
    validateField,
  }
} 