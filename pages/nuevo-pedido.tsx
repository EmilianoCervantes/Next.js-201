import { AsignarCliente, AsignarProductos, Layout } from "../components"
import { TitleHeader } from "../widgets"

export default function NuevoPedido() {
  return (
    <Layout>
      <TitleHeader>Nuevo Pedido</TitleHeader>

      {/* Asignar al cliente */}
      <AsignarCliente />

      {/* Seleccionar los productos */}
      <AsignarProductos />
    </Layout>
  )
}
