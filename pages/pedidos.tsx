import { Layout } from "../components"
import { NUEVO_PEDIDO } from "../navigation/crm-user-navigation"
import { ButtonNuevo, TitleHeader } from "../widgets"

export default function Pedidos() {
  return (
    <Layout>
      <TitleHeader>Pedidos</TitleHeader>

      <ButtonNuevo titulo='Pedido' destino={NUEVO_PEDIDO} />
    </Layout>
  )
}