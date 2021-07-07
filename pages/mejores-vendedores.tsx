import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Layout } from "../components"
import { Query } from "../gql-tags/generated-types/crm-types"
import { FETCH_MEJORES_VENDEDORES } from "../gql-tags/vendedores"
import { TitleHeader } from "../widgets"


export default function MejoresVend() {
  const { data, loading, error, startPolling, stopPolling } = useQuery<Query>(FETCH_MEJORES_VENDEDORES)

  /**
   * ANTES DE LOADING porque react hooks deben ser cargados siempre igual en cada render
   * Esto es para consultar la base de datos cada 1 segundo
   * Si hay algo distinto, que nos traiga la info
   * Esto funciona más bien como un socket que indica HUBO O NO HUBO CAMBIOS y entonces consulta
  */
  useEffect(() => {
    startPolling(1000)
    // Hacer la limpieza del useEffect
    return () => { stopPolling() }
  }, [startPolling, stopPolling])

  if (loading) {
    return (
      <Layout>
        <TitleHeader>
          Mejores Vendedores
        </TitleHeader>

        <h2>Cargando...</h2>
      </Layout>
    )
  }

  if (error || !data?.mejoresVendedores) {
    return (
      <Layout>
        <TitleHeader>
          Mejores Vendedores
        </TitleHeader>

        <h2>No se pudieron cargar correctamente a los mejores vendedores</h2>
      </Layout>
    )
  }

  const dataGrafica = data.mejoresVendedores.map(dato => {
    return {
      nombre: dato.vendedor[0].nombre,
      totalVendido: dato.totalVendido
    }
  })

  return (
    <Layout>
      <TitleHeader>
        Mejores Vendedores
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
          <Bar dataKey="totalVendido" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  )
}
