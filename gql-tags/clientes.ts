import { gql } from "@apollo/client";

export const FETCH_CLIENTES_QUERY = gql`
  query obtenerClientes{
    obtenerClientes {
      id
      nombre
      apellido
      email
      telefono
      empresa
      vendedorQueLoDioDeAlta
    }
  }
`

export const FETCH_CLIENTES_VENDEDOR_QUERY = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      email
      telefono
      empresa
      vendedorQueLoDioDeAlta
    }
  }
`

export const MEJORES_CLIENTES_QUERY = gql`
  query mejoresClientes {
    mejoresClientes {
      totalCompra
      cliente {
        id
        nombre
        apellido
        email
        empresa
        vendedorQueLoDioDeAlta
      }
    }
  }
`

export const CREATE_CLIENTE_MUTATION = gql`
  mutation nuevoCliente($input: ClienteInput) {
    nuevoCliente(input: $input) {
      id
      nombre
      apellido
      email
      telefono
      fechaCreacion
      vendedorQueLoDioDeAlta
    }
  }
`

export const DELETE_CLIENTE_MUTATION = gql`
  mutation eliminarCliente($id: ID!) {
    eliminarCliente(id: $id)
  }
`