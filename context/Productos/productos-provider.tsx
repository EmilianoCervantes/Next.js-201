import { useQuery } from "@apollo/client"
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { Producto, Query } from "../../gql-tags/generated-types/crm-types"
import { FETCH_PRODUCTOS_QUERY } from "../../gql-tags/productos"

interface ProductosProps {
  productos: Producto[]
  isLoading: boolean
  isError: boolean
  useRefetchProductos: (e: Producto[]) => void
}

const initValue: ProductosProps = {
  productos: [],
  isLoading: true,
  isError: false,
  useRefetchProductos: () => { }
}

const ProductosContext = createContext<ProductosProps>(initValue)

export const useProductos = (): ProductosProps => {
  return useContext(ProductosContext)
}

const useProviderProductos = (): ProductosProps => {
  const [productos, setProductos] = useState<Producto[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(true)

  const useRefetchProductos = (origProds: Producto[]) => {
    const { data, loading, error } = useQuery<Query>(FETCH_PRODUCTOS_QUERY, {
      skip: !!origProds.length
    })

    useEffect(() => {
      setLoading(loading)
    }, [loading])

    useEffect(() => {
      if (error?.message || (!data?.obtenerProductos && !origProds.length)) {
        setLoading(false)
        setError(true)
      } else if (!error?.message && (!data?.obtenerProductos || !origProds.length)) {
        const prodsFinal = data?.obtenerProductos ? data.obtenerProductos : origProds
        
        setProductos(prodsFinal)
        setLoading(false)
        setError(false)
      }
    }, [data, error, origProds])
  }

  return {
    productos,
    isError,
    isLoading,
    useRefetchProductos,
  }
}

export const ProductosProvider = ({ children }: PropsWithChildren<ProductosProps>) => {
  const productos = useProviderProductos()

  return <ProductosContext.Provider value={productos}>{children}</ProductosContext.Provider>
}
