import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { Layout, ListadoProductos } from "../components"
import { Query } from '../gql-tags/generated-types/crm-types'
import { FETCH_PRODUCTOS_QUERY } from '../gql-tags/productos'
import { NUEVO_PRODUCTO } from '../navigation/crm-user-navigation'
import { Loading, TitleHeader } from "../widgets"

export default function Productos() {
  const { data, loading, error } = useQuery<Query>(FETCH_PRODUCTOS_QUERY)

  const btnNuevoProducto = () => <Link href={NUEVO_PRODUCTO}>
    <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Producto</a>
  </Link>

  if (loading) return <Loading />

  if (error || !data?.obtenerProductos?.length) {
    return (
      <Layout>
        <TitleHeader>Productos</TitleHeader>

        {btnNuevoProducto()}

        <div className="mt-10">
          <p>Todavía no has agregado ningún producto.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <TitleHeader>Productos</TitleHeader>

      {btnNuevoProducto()}

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