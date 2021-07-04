import DatosProducto from "./datosprod"
import ListadoProductosProps from "./listadoproductos-props"

export default function ListadoProductos({ productos }: ListadoProductosProps) {
  return (
    <tbody className="bg-white">
      {productos.map((prod, i) => (
        <DatosProducto key={prod.id} producto={prod} num={i + 1} />
      ))}
    </tbody>
  )
}