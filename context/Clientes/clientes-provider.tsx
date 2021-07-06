import { useQuery } from "@apollo/client"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { FETCH_CLIENTES_VENDEDOR_QUERY } from "../../gql-tags/clientes"
import { Cliente, Query } from "../../gql-tags/generated-types/crm-types"

interface ClientesProviderProps {
  clientes: Cliente[]
  isLoading: boolean
  isError: boolean
  useRefetchClientes: (e: Cliente[]) => void
}

const initValue: ClientesProviderProps = {
  clientes: [],
  isLoading: true,
  isError: false,
  useRefetchClientes: () => { },
}

const ClientesContext = createContext<ClientesProviderProps>(initValue)

export const useClientes = (): ClientesProviderProps => {
  return useContext(ClientesContext)
}

const useProviderClientes = (): ClientesProviderProps => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(true)

  const useRefetchClientes = (origClientes: Cliente[]) => {
    const { data, loading, error } = useQuery<Query>(FETCH_CLIENTES_VENDEDOR_QUERY, {
      skip: !!origClientes?.length
    })

    useEffect(() => {
      setLoading(loading)
    }, [loading])

    useEffect(() => {
      if (error?.message || (!data?.obtenerClientesVendedor && !origClientes.length)) {
        setLoading(false)
        setError(true)
      } else if ((!error && data?.obtenerClientesVendedor) || !!origClientes.length) {
        const clientesFinal = data?.obtenerClientesVendedor ? data.obtenerClientesVendedor : origClientes

        setClientes(clientesFinal)
        setLoading(false)
        setError(false)
      }
    }, [data, error, origClientes])
  }

  return {
    clientes,
    isLoading,
    isError,
    useRefetchClientes,
  }
}

export const ClientesProvider = ({ children }: PropsWithChildren<ClientesProviderProps>) => {
  const clientes = useProviderClientes()

  return <ClientesContext.Provider value={clientes}>{children}</ClientesContext.Provider>
}
