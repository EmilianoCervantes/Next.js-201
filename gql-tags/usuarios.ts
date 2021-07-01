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
export const LOGIN_MUTATION = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`
