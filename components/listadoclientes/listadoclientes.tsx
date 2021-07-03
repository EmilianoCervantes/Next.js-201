import DatosCliente from "./datoscliente";
import ListadoClientesProps from "./listadoclientes-props";

export default function ListadoClientes({ clientesVendedor }: ListadoClientesProps) {
  return (
    <tbody className="bg-white">
      {clientesVendedor.map((cliente, i) => (
        <DatosCliente key={cliente.id} cliente={cliente} num={i+1} />
      ))}
    </tbody>
  )
}