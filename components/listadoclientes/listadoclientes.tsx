import ListadoClientesProps from "./listadoclientes-props";

export default function ListadoClientes({ clientesVendedor }: ListadoClientesProps) {
  return (
    <tbody className="bg-white">
      {clientesVendedor.map((cliente, i) => (
        <tr key={cliente.id}>
          <th className="border px-4 py-2">{i + 1}</th>
          <th className="border px-4 py-2">{cliente.nombre} {cliente.apellido}</th>
          <th className="border px-4 py-2">{cliente.empresa}</th>
          <th className="border px-4 py-2">{cliente.email}</th>
        </tr>
      ))}
    </tbody>
  )
}