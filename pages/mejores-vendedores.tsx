import { useQuery } from "@apollo/client"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Layout } from "../components"
import { Query } from "../gql-tags/generated-types/crm-types"
import { FETCH_MEJORES_VENDEDORES } from "../gql-tags/vendedores"
import { TitleHeader } from "../widgets"


export default function MejoresVend() {
  const { data, loading, error } = useQuery<Query>(FETCH_MEJORES_VENDEDORES)

  const dataC = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

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

  console.log(data.mejoresVendedores);
  

  return (
    <Layout>
      <TitleHeader>
        Mejores Vendedores
      </TitleHeader>

      <BarChart
        className="mt-10"
        width={600}
        height={500}
        data={data.mejoresVendedores}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#3182ce" />
      </BarChart>
    </Layout>
  )
}
