import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Layout } from "../components"
import { MEJORES_CLIENTES_QUERY } from "../gql-tags/clientes"
import { Query } from "../gql-tags/generated-types/crm-types"
import { TitleHeader } from "../widgets"

export default function MejoresClientes() {
  const { data, error, loading, startPolling, stopPolling } = useQuery<Query>(MEJORES_CLIENTES_QUERY)

  useEffect(() => {
    startPolling(1000)
    return () => { stopPolling() }
  }, [startPolling, stopPolling])

  if (loading) {
    return (
      <Layout>
        <TitleHeader>
          Mejores Clientes
        </TitleHeader>

        <h2>Cargando...</h2>
      </Layout>
    )
  }

  if (error || !data?.mejoresClientes) {
    return (
      <Layout>
        <TitleHeader>
          Mejores Vendedores
        </TitleHeader>

        <h2>No se pudieron cargar correctamente a los mejores clientes</h2>
      </Layout>
    )
  }

  const dataGrafica = data.mejoresClientes.map(dato => {
    return {
      nombre: dato.cliente[0].nombre,
      totalCompra: dato.totalCompra
    }
  })

  return (
    <Layout>
      <TitleHeader>
        Mejores Clientes
      </TitleHeader>

      <ResponsiveContainer
        width={'99%'}
        height={550}
      >
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={dataGrafica}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nombre" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalCompra" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  )
}
