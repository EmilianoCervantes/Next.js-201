import { createContext, PropsWithChildren, useCallback, useContext, useReducer } from "react"
import { Cliente, Estatus, PedidoProducto, Producto } from "../../gql-tags/generated-types/crm-types"
import { reducerPedido } from "."
import { CANTIDAD_PRODUCTO, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTOS } from "../actions";

interface PedidoProps {
  clientePedido: Cliente
  prodsSeleccionados: Producto[]
  pedido: PedidoProducto[]
  total: number
  estatus: Estatus
  actualizarCliente: (e: Cliente) => void
  actualizarProductos: (e: Producto[]) => void
  cantidadProductos: (e: Producto, cantidad: number) => void
}

const initValue: PedidoProps = {
  clientePedido: null,
  prodsSeleccionados: [],
  pedido: [],
  total: 0,
  estatus: Estatus['PENDIENTE'],
  actualizarCliente: () => { },
  actualizarProductos: () => { },
  cantidadProductos: () => { },
}

const PedidoContext = createContext(initValue);

export const usePedido = (): PedidoProps => {
  return useContext(PedidoContext)
}

export const PedidoState = ({ children }: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(reducerPedido, initValue)

  /** Tener en contexto el id del cliente elegido */
  const actualizarCliente = useCallback((id: string) => {
    if (id) dispatch({ type: SELECCIONAR_CLIENTE, payload: id })
  }, [])

  const actualizarProductos = useCallback((prodsSeleccionados: []) => {
    dispatch({ type: SELECCIONAR_PRODUCTOS, payload: prodsSeleccionados })
  }, [])

  const cantidadProductos = useCallback((prod: Producto, cantidad: number) => {
    dispatch({
      type: CANTIDAD_PRODUCTO, payload: {
        idProducto: prod.id,
        cantidad: Number(cantidad)
      }
    })
  }, [])

  return (
    <PedidoContext.Provider
      value={{
        ...state,
        actualizarCliente,
        actualizarProductos,
        cantidadProductos
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}