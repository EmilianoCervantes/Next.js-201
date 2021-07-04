import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { ClientForm, Layout } from "../../components"
import { FETCH_CLIENTES_VENDEDOR_QUERY, FETCH_CLIENTE_QUERY, UPDATE_CLIENTE_MUTATION } from "../../gql-tags/clientes"
import { Mutation, Query } from "../../gql-tags/generated-types/crm-types"
import { HOME } from "../../navigation/crm-user-navigation"
import { CrmGenericMessage, TitleHeader } from "../../widgets"

export default function EditarCliente() {
  const router = useRouter()
  const { id } = router?.query

  const { data: clientData, error, loading } = useQuery<Query>(FETCH_CLIENTE_QUERY, {
    variables: { id },
    skip: !id
  })

  /** NOTA: si las dos consultas, obtener UN cliente y actualizar cliente no tienen los mismos campos, actualizar por caché no servirá ni actualizar solito */
  const [actualizarCliente] = useMutation<Mutation>(UPDATE_CLIENTE_MUTATION)

  const [mensaje, setMensaje] = useState('')

  const onSubmit = async (valores) => {
    try {
      const { data } = await actualizarCliente({
        variables: {
          id,
          input: valores
        }
      })

      if (data?.actualizarCliente) {
        const { nombre } = data.actualizarCliente
        setMensaje(`Se editó correctamente al cliente: ${nombre}`)
      }

      setTimeout(() => {
        setMensaje('')
        router.push(HOME)
      }, 3000)

    } catch (e) {
      setMensaje(e.message)

      setTimeout(() => {
        setMensaje('')
      }, 2500)
    }
  }

  if (loading) {
    return (
      <Layout>
        <TitleHeader>
          Nuevo Cliente
        </TitleHeader>

        <h2>Cargando formulario...</h2>
      </Layout>
    )
  }

  if (error || !clientData?.obtenerCliente) {
    return (
      <Layout>
        <TitleHeader>
          Nuevo Cliente
        </TitleHeader>

        <h2>El cliente a editar no pudo ser cargado correctamente...</h2>
      </Layout>
    )
  }

  return (
    <Layout>
      <TitleHeader>
        Editar Cliente
      </TitleHeader>

      {mensaje && <CrmGenericMessage message={mensaje} />}

      <ClientForm
        paraQuien='Cliente'
        submitTitle='Actualizar Cliente'
        onSubmit={onSubmit}
        data={clientData.obtenerCliente}
      />
    </Layout>
  )
}
