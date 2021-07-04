import { useQuery } from '@apollo/client'
import Link from 'next/link'
import { Layout, ListadoClientes } from '../components'
import { FETCH_CLIENTES_VENDEDOR_QUERY } from '../gql-tags/clientes'
import { Query } from '../gql-tags/generated-types/crm-types';
import { NUEVO_CLIENTE } from '../navigation/crm-user-navigation';
import { ButtonNuevo, Loading, TitleHeader } from '../widgets';

export default function Home() {
  const { data, loading, error } = useQuery<Query>(FETCH_CLIENTES_VENDEDOR_QUERY)

  if (loading) return <Loading />
  else if (error || !data.obtenerClientesVendedor.length) {
    return (
      <Layout>
        <TitleHeader>
          Cliente
        </TitleHeader>

        <ButtonNuevo titulo='Cliente' destino={NUEVO_CLIENTE} />

        <div className="mt-10">
          <p>Todavía no has registrado clientes.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <TitleHeader>
        Cliente
      </TitleHeader>

      <ButtonNuevo titulo='Cliente' destino={NUEVO_CLIENTE} />

      <table className="table-auto shadow-md mt-10 w-full w-lg">
        <thead className="bg-gray-800">
          <tr className="text-white">
            <th className="w-1/5 py-2">#</th>
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Email</th>
            <th className="w-1/5 py-2">Editar</th>
            <th className="w-1/5 py-2">Eliminar</th>
          </tr>
        </thead>

        <ListadoClientes clientesVendedor={data.obtenerClientesVendedor} />
      </table>
    </Layout>
  )
}
