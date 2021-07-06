import { useEffect } from 'react'
import { Layout, ListadoClientes } from '../components'
import { useClientes } from '../context'
import { NUEVO_CLIENTE } from '../navigation/crm-user-navigation'
import { ButtonNuevo, Loading, TitleHeader } from '../widgets'

export default function Home() {

  const { clientes, isLoading, isError, useRefetchClientes } = useClientes()

  useRefetchClientes(clientes)
  
  if (isLoading) return <Loading />
  
  else if (isError || !clientes.length) {
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

        <ListadoClientes clientesVendedor={clientes} />
      </table>
    </Layout>
  )
}
