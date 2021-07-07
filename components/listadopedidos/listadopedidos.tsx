import { ListadoPedidosProps } from "./listadopedidos-props"
import DatosPedido from "./datospedido"

export default function ListadoPedidos({ pedidos }: ListadoPedidosProps) {
  return (
    <>
      {
        pedidos.map(pedido => (
          <DatosPedido key={pedido.id} pedidoProds={pedido} />
        ))
      }
    </>
  )
}