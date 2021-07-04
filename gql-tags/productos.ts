import { gql } from "@apollo/client";

export const FETCH_PRODUCTOS_QUERY = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      fechaCreacion
    }
  }
`

export const FETCH_PRODUCTO_QUERY = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
      fechaCreacion
    }
  }
`

export const CREATE_PRODUCTO_MUTATION = gql`
  mutation nuevoProducto($input: ProductoInput) {
    nuevoProducto(input: $input) {
      id
      nombre
      existencia
      precio
      fechaCreacion
    }
  }
`

export const UPDATE_PRODUCTO_MUTATUON = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      existencia
      precio
      fechaCreacion
    }
  }
`

export const DELETE_PRODUCTO_MUTATION = gql`
  mutation eliminarProducto($id: ID!) {
    eliminarProducto(id: $id)
  }
`
