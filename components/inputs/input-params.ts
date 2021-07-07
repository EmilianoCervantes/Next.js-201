export interface InputParams {
  error?: string
  name: string
  paraQuien?: string
  value: string | number
  onChange: (any) => void
  onBlur?: (any) => void
}

export interface InputCantidadProps {
  name: string
  value: number
  max: number
  min: number
  onChange: (any) => void
  onBlur?: (any) => void
}