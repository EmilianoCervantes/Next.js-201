import Link from 'next/link'
import { useState } from 'react'
import { AsignarCliente, Layout } from "../components"
import { Cliente, Producto } from '../gql-tags/generated-types/crm-types'
import { NUEVO_CLIENTE } from '../navigation/crm-user-navigation'
import { TitleHeader } from "../widgets"

export default function NuevoPedido() {
  const [cliente, setCliente] = useState<Cliente>(null)
  const [productos, setProductos] = useState<Producto[]>([])

  const noClientFound = () => (
    <Link href={NUEVO_CLIENTE}>
      <a>
        Agregar un nuevo cliente
      </a>
    </Link>
  )

  return (
    <Layout>
      <TitleHeader>Nuevo Pedido</TitleHeader>

      {/* Asignar al cliente */}
      <AsignarCliente
        setCliente={setCliente}
        noClientFound={noClientFound}
      />
    </Layout>
  )
}
