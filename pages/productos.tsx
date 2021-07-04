import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { Layout, ListadoProductos } from "../components"
import { Query } from '../gql-tags/generated-types/crm-types'
import { FETCH_PRODUCTOS_QUERY } from '../gql-tags/productos'
import { NUEVO_PRODUCTO } from '../navigation/crm-user-navigation'
import { ButtonNuevo, Loading, TitleHeader } from "../widgets"

export default function Productos() {
  const { data, loading, error } = useQuery<Query>(FETCH_PRODUCTOS_QUERY)

  if (loading) return <Loading />

  if (error || !data?.obtenerProductos?.length) {
    return (
      <Layout>
        <TitleHeader>Productos</TitleHeader>

        <ButtonNuevo titulo='Producto' destino={NUEVO_PRODUCTO} />

        <div className="mt-10">
          <p>Todavía no has agregado ningún producto.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <TitleHeader>Productos</TitleHeader>

      <ButtonNuevo titulo='Producto' destino={NUEVO_PRODUCTO} />

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">#</th>
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Existencia</th>
            <th className="w-1/5 py-2">Precio</th>
            <th className="w-1/5 py-2">Editar</th>
            <th className="w-1/5 py-2">Eliminar</th>
          </tr>
        </thead>

        <ListadoProductos
          productos={data.obtenerProductos}
        />
      </table>
    </Layout>
  )
}