import { gql } from "@apollo/client";

/** ID causa un bug en JavaScript al ser retornado como NULL */
export const FETCH_MEJORES_VENDEDORES = gql`
  query mejoresVendedores {
    mejoresVendedores {
      totalVendido
      vendedor {
        nombre
        apellido
        email
        fechaCreacion
      }
    }
  }
`
