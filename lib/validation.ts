export const required = (value: any) => {
  if (!value) return "This field is required"
  return undefined
}

export const email = (value: string) => {
  if (!value) return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(value)) return "Please enter a valid email address"
  return undefined
}

export const minLength = (length: number) => (value: string) => {
  if (!value) return "This field is required"
  if (value.length < length) return `Must be at least ${length} characters`
  return undefined
}

export const maxLength = (length: number) => (value: string) => {
  if (!value) return "This field is required"
  if (value.length > length) return `Must be at most ${length} characters`
  return undefined
}

export const url = (value: string) => {
  if (!value) return "URL is required"
  try {
    new URL(value)
    return undefined
  } catch {
    return "Please enter a valid URL"
  }
}

export const fileType = (allowedTypes: string[]) => (file: File) => {
  if (!file) return "File is required"
  if (!allowedTypes.includes(file.type)) {
    return `File must be one of: ${allowedTypes.join(", ")}`
  }
  return undefined
}

export const fileSize = (maxSizeInMB: number) => (file: File) => {
  if (!file) return "File is required"
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024
  if (file.size > maxSizeInBytes) {
    return `File must be less than ${maxSizeInMB}MB`
  }
  return undefined
}

export const composeValidators = (...validators: Function[]) => (value: any) => {
  for (const validator of validators) {
    const error = validator(value)
    if (error) return error
  }
  return undefined
} 