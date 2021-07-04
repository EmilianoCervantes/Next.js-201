import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { ClientForm, Layout } from "../components"
import { CREATE_CLIENTE_MUTATION, FETCH_CLIENTES_VENDEDOR_QUERY } from "../gql-tags/clientes"
import { Mutation } from "../gql-tags/generated-types/crm-types"
import { HOME } from "../navigation/crm-user-navigation"
import { fechaGqlToHuman } from "../utilities"
import { CrmGenericMessage, TitleHeader } from '../widgets'

// Apoyo validaciones yup: https://stackoverflow.com/questions/52483260/validate-phone-number-with-yup

export default function NuevoCliente() {
  const [mensaje, setMensaje] = useState('')

  const router = useRouter()

  /** Sintáxis para actualizar el caché, evitar hacer una consulta extra */
  const [nuevoCliente] = useMutation<Mutation>(CREATE_CLIENTE_MUTATION, {
    update(cache, { data: { nuevoCliente } }) {
      // Obtener el obj de caché que queremos actualizar
      const { obtenerClientesVendedor } = cache.readQuery({ query: FETCH_CLIENTES_VENDEDOR_QUERY })

      // Reescribir el caché (no modificar --> sí reescribir)
      cache.writeQuery({
        query: FETCH_CLIENTES_VENDEDOR_QUERY,
        data: {
          obtenerClientesVendedor: [...obtenerClientesVendedor, nuevoCliente]
        }
      })
    }
  })

  const onSubmit = async (valores) => {
    try {
      const { data } = await nuevoCliente({
        variables: {
          input: valores
        }
      })

      if (data.nuevoCliente) {
        const { fechaCreacion, nombre } = data.nuevoCliente
        setMensaje(`Se creó correctamente al cliente: ${nombre} el ${fechaGqlToHuman(fechaCreacion)}`)
      }

      setTimeout(() => {
        setMensaje('')
        router.push(HOME)
      }, 4000)

    } catch (error) {
      setMensaje(error.message)

      setTimeout(() => {
        setMensaje('')
      }, 2500)
    }
  }

  return (
    <Layout>
      <TitleHeader>
        Nuevo Cliente
      </TitleHeader>

      {mensaje && <CrmGenericMessage message={mensaje} />}

      <ClientForm
        paraQuien= 'Cliente'
        submitTitle='Crear Cliente'
        onSubmit={onSubmit}
      />
    </Layout>
  )
}
