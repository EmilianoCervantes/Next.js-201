import { gql } from "@apollo/client";

/** Obtener todos los pedidos sin importar el vendedor */
export const FETCH_PEDIDOS_QUERY = gql`
  mutation obtenerPedidos {
    obtenerPedidos {
      id
      pedido
      total
      clientePedido
      vendedorPedido
      estatus
      fechaCreacion
    }
  }
`

/** Obtener todos los pedidos PARA el vendedor logueado */
export const FETCH_PEDIDOS_VENDEDOR_QUERY = gql`
  mutation obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido
      total
      clientePedido
      vendedorPedido
      estatus
      fechaCreacion
    }
  }
`

export const CREATE_PEDIDO_MUTATION = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
      pedido
      total
      clientePedido
      vendedorPedido
      estatus
      fechaCreacion
    }
  }
`

export const UPDATE_PEDIDO_MUTATION = gql`
  mutation actualizarPedido($id: ID!, $input: PedidoInput) {
    actualizarPedido(id: $id, input: $input) {
      id
      pedido
      total
      clientePedido
      vendedorPedido
      estatus
      fechaCreacion
    }
  }
`

export const DELETE_PEDIDO_MUTATION = gql`
  mutation eliminarPedido($id: ID!) {
    eliminarPedido(id: $id)
  }
`