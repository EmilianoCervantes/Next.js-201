import { Layout, ListadoProductos } from "../components"
import { useProductos } from "../context"
import { NUEVO_PRODUCTO } from '../navigation/crm-user-navigation'
import { ButtonNuevo, Loading, TitleHeader } from "../widgets"

export default function Productos() {
  const { productos, isError, isLoading, useRefetchProductos } = useProductos()
  useRefetchProductos(productos)

  if (isLoading) return <Loading />

  if (isError || !productos.length) {
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

      <div className="overflow-x-scroll">
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
            productos={productos}
          />
        </table>
      </div>
    </Layout>
  )
}