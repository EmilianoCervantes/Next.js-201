import { useMutation, useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useState } from "react"
import { Layout, ProductoForm } from "../../components"
import { Mutation, Query } from "../../gql-tags/generated-types/crm-types"
import { FETCH_PRODUCTO_QUERY, UPDATE_PRODUCTO_MUTATUON } from "../../gql-tags/productos"
import { PRODUCTOS } from "../../navigation/crm-user-navigation"
import { CrmGenericMessage, TitleHeader } from "../../widgets"

export default function EditarProducto() {
  const [mensaje, setMessage] = useState('')

  const router = useRouter()
  const { id } = router?.query

  const { data: prodData, loading, error } = useQuery<Query>(FETCH_PRODUCTO_QUERY, {
    variables: { id },
    skip: !id
  })

  const [actualizarProducto] = useMutation<Mutation>(UPDATE_PRODUCTO_MUTATUON)

  const onSubmit = async input => {
    try {
      const { data } = await actualizarProducto({
        variables: {
          id,
          input
        }
      })

      if (data?.actualizarProducto) {
        const { nombre } = data.actualizarProducto
        setMessage(`Se editó correctamente el producto: ${nombre}`)

        setTimeout(() => {
          setMessage('')
          router.push(PRODUCTOS)
        }, 3500);
      }
    } catch (error) {
      setMessage(error.message)
      setTimeout(() => {
        setMessage('')
      }, 2500);
    }
  }

  if (loading) {
    return (
      <Layout>
        <TitleHeader>Editar Producto</TitleHeader>
        {mensaje && <CrmGenericMessage message={mensaje} />}

        <h2>Cargando formulario...</h2>
      </Layout>
    )
  }

  if (error || !prodData?.obtenerProducto) {
    return (
      <Layout>
        <TitleHeader>Editar Producto</TitleHeader>
        {mensaje && <CrmGenericMessage message={mensaje} />}

        <h2>El producto a modificar no pudo ser cargado correctamente.</h2>
      </Layout>
    )
  }

  return (
    <Layout>
      <TitleHeader>Editar Producto</TitleHeader>
      {mensaje && <CrmGenericMessage message={mensaje} />}

      <ProductoForm
        submitTitle='Actualizar Producto'
        onSubmit={onSubmit}
        data={prodData.obtenerProducto}
      />
    </Layout>
  )
}