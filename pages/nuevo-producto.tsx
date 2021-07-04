import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { Layout, ProductoForm } from "../components"
import { Mutation } from "../gql-tags/generated-types/crm-types"
import { CREATE_PRODUCTO_MUTATION, FETCH_PRODUCTOS_QUERY } from "../gql-tags/productos"
import { PRODUCTOS } from "../navigation/crm-user-navigation"
import { CrmGenericMessage, TitleHeader } from "../widgets"

export default function NuevoProducto() {
  const [mensaje, setMensaje] = useState('')
  const router = useRouter()

  const [nuevoProducto] = useMutation<Mutation>(CREATE_PRODUCTO_MUTATION, {
    update(cache, { data: { nuevoProducto } }) {
      const { obtenerProductos } = cache.readQuery({
        query: FETCH_PRODUCTOS_QUERY
      })

      cache.writeQuery({
        query: FETCH_PRODUCTOS_QUERY,
        data: {
          obtenerProductos: [...obtenerProductos, nuevoProducto]
        }
      })
    }
  })

  const onSubmit = async (valores) => {
    try {
      const { data } = await nuevoProducto({
        variables: {
          input: valores
        }
      })

      if (data?.nuevoProducto) {
        const { nombre } = data.nuevoProducto
        setMensaje(`Producto ${nombre} cargado correctamente.`)
        setTimeout(() => {
          setMensaje('')
          router.push(PRODUCTOS)
        }, 3500);
      }
    } catch (e) {
      setMensaje(e.message)
      setTimeout(() => {
        setMensaje('')
      }, 2500);
    }
  }

  return (
    <Layout>
      <TitleHeader>Nuevo Producto</TitleHeader>
      {mensaje && <CrmGenericMessage message={mensaje} />}

      <ProductoForm
        submitTitle='Agregar Producto'
        onSubmit={onSubmit}
      />
    </Layout>
  )
}