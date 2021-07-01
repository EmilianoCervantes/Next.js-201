import { gql } from "@apollo/client";

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