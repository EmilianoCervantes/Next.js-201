import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AsignarCliente, AsignarProductos, Button, CantidadProductos, Layout, Total } from "../components"
import { usePedido } from "../context"
import { Mutation } from "../gql-tags/generated-types/crm-types"
import { CREATE_PEDIDO_MUTATION } from "../gql-tags/pedidos"
import { PEDIDOS } from "../navigation/crm-user-navigation"
import { fechaGqlToHuman } from "../utilities"
import { CrmGenericMessage, TitleHeader } from "../widgets"

export default function NuevoPedido() {
  const [total, setTotal] = useState(0)
  const [mensaje, setMensaje] = useState('')

  const { clientePedido, estatus, prodsSeleccionados, pedido } = usePedido()

  const [nuevoPedido] = useMutation<Mutation>(CREATE_PEDIDO_MUTATION)

  const router = useRouter()

  useEffect(() => {
    if (prodsSeleccionados.length === pedido.length) {
      let total = 0
      for (let i = 0; i < prodsSeleccionados.length; i++) {
        const { precio } = prodsSeleccionados[i];
        const { cantidad } = pedido[i]
        total += precio * cantidad
      }
      setTotal(total)
    }
  }, [prodsSeleccionados, pedido])

  const enviarPedido = async () => {
    try {
      const input = {
        pedido,
        total,
        clientePedido: clientePedido.id,
        estatus
      }
      
      const { data } = await nuevoPedido({
        variables: { input }
      })

      if (data?.nuevoPedido) {
        const { fechaCreacion } = data.nuevoPedido
        setMensaje(`Se ha creado tu pedido el: ${fechaGqlToHuman(fechaCreacion)}`)

        setTimeout(() => {
          setMensaje('')
          router.push(PEDIDOS)
        }, 3500);
      }
    } catch (error) {
      setMensaje(error.message)

      setTimeout(() => {
        setMensaje('')
      }, 3000);
    }
  }

  return (
    <Layout>
      <TitleHeader>Nuevo Pedido</TitleHeader>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          {!!mensaje && <CrmGenericMessage message={mensaje} />}
          {/* Asignar al cliente */}
          <AsignarCliente />
          {/* Seleccionar los productos */}
          <AsignarProductos />
          {/* Resumen - elegir cantidades */}
          <CantidadProductos />

          <Total balance={total} />

          <Button
            disabled={!clientePedido || !prodsSeleccionados.length || !total}
            onClick={enviarPedido}
          >
            Registrar Pedido
          </Button>
        </div>
      </div>
    </Layout>
  )
}
