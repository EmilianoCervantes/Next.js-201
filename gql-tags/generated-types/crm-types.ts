/**
 * Propósito del documento:
 * Tipos de datos que maneja la app
 */

/** Clases de variables que se manejan en el servidor de GQL */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

/** Todos los mutations que existen */
export type Mutation = {
  __typename?: 'Mutation'
  /** Usuarios */
  crearUsuario: User
}

/** Representación de usuarios en el sistema */
export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  nombre: Scalars['String']
  apellido: Scalars['String']
  email: Scalars['String']
  fechaCreacion: Scalars['String']
}