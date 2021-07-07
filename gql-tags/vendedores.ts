import { gql } from "@apollo/client";

export const FETCH_MEJORES_VENDEDORES = gql`
  query mejoresVendedores {
    mejoresVendedores {
      totalVendido
      vendedor {
        id
        nombre
        apellido
        email
        fechaCreacion
      }
    }
  }
`
