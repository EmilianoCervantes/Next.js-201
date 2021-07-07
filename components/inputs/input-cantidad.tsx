import { InputCantidadProps } from "./input-params";

export default function InputCantidad({ name, value, max, min, onChange, onBlur }: InputCantidadProps) {
  return (
    <input
      className="shadow appearance-non border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      max={max}
      min={min}
      type='number'
      placeholder={name}
      value={value}
      onChange={e => onChange(e.target.value)}
      onBlur={onBlur}
    />
  )
}