import { createContext, PropsWithChildren, useCallback, useContext, useReducer } from "react"
import { Cliente, Estatus, Producto } from "../../gql-tags/generated-types/crm-types"
import { reducerPedido } from "."
import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTOS } from "../actions";

interface PedidoProps {
  clientePedido: Cliente
  pedido: Producto[]
  total: number
  estatus: Estatus
  actualizarCliente: (e: Cliente) => void
  actualizarPedido: (e: Producto[]) => void
}

const initValue: PedidoProps = {
  clientePedido: null,
  pedido: [],
  total: 0,
  estatus: Estatus['PENDIENTE'],
  actualizarCliente: () => { },
  actualizarPedido: () => { },
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

  const actualizarPedido = useCallback((pedido: []) => {
    if (!!pedido.length) dispatch({ type: SELECCIONAR_PRODUCTOS, payload: pedido })
  }, [])

  return (
    <PedidoContext.Provider
      value={{
        ...state,
        actualizarCliente,
        actualizarPedido
      }}
    >
      {children}
    </PedidoContext.Provider>
  )
}