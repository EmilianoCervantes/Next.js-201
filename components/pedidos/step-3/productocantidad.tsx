import { useEffect, useState } from "react"
import { moneyFormat } from "../../../utilities"
import { InputCantidad } from "../.."
import ProductoCantidadPros from "./productocantidad-props"
import { usePedido } from "../../../context"

export default function ProductoCantidad({ prod }: ProductoCantidadPros) {
  const { existencia, nombre, precio: balance } = prod

  const { cantidadProductos } = usePedido()

  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    cantidadProductos(prod, cantidad)
  }, [cantidad, cantidadProductos, prod])

  const handleCantidad = (input: number) => {
    if (input) {
      if (input < 1) setCantidad(1)
      else if (input > existencia) setCantidad(existencia)
      else setCantidad(input)
    }
  }

  const onBlurCantidad = () => {
    if (!cantidad) setCantidad(1)
  }

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{nombre}</p>
        <p>${moneyFormat({ balance })}</p>
      </div>
      <InputCantidad
        name='Cantidad'
        value={cantidad}
        min={1}
        max={existencia}
        onChange={handleCantidad}
        onBlur={onBlurCantidad}
      />
    </div>
  )
}
