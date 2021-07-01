import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input) {
      id
      nombre
      apellido
      email
    }
  }
`
