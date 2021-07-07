import { useQuery } from "@apollo/client"
import { Layout, ListadoPedidos } from "../components"
import { Query } from "../gql-tags/generated-types/crm-types"
import { FETCH_PEDIDOS_VENDEDOR_QUERY } from "../gql-tags/pedidos"
import { NUEVO_PEDIDO } from "../navigation/crm-user-navigation"
import { ButtonNuevo, TitleHeader } from "../widgets"

export default function Pedidos() {
  const { data, loading, error } = useQuery<Query>(FETCH_PEDIDOS_VENDEDOR_QUERY)

  if (loading) {
    return (
      <Layout>
        <TitleHeader>Pedidos</TitleHeader>

        <h2>Cargando pedidos...</h2>
      </Layout>
    )
  }

  if (!data?.obtenerPedidosVendedor?.length || error) {
    return (
      <Layout>
        <TitleHeader>Pedidos</TitleHeader>
  
        <ButtonNuevo titulo='Pedido' destino={NUEVO_PEDIDO} />

        <h2>No has generado ningún pedido</h2>
      </Layout>
    )
  }

  return (
    <Layout>
      <TitleHeader>Pedidos</TitleHeader>

      <ButtonNuevo titulo='Pedido' destino={NUEVO_PEDIDO} />

      <ListadoPedidos pedidos={data.obtenerPedidosVendedor} />
    </Layout>
  )
}