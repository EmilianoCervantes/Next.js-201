/**
 * Propósito del documento:
 * Tipos de datos que maneja la app
 */

/** Clases de variables que se manejan en el servidor de GQL */
export type Maybe<T> = T | null;
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

/** Todos los queries que existen */
export type Query = {
  __typename?: 'Query'
  // Usuarios
  obtenerUsuario: Usuario
  // Clientes
  obtenerClientes: Array<Cliente>
  obtenerClientesVendedor: Array<Cliente>
  obtenerCliente: Cliente
  mejoresClientes: Array<TopCliente>
}

/** Todos los mutations que existen */
export type Mutation = {
  __typename?: 'Mutation'
  // Usuarios
  autenticarUsuario: Token
  crearUsuario: Usuario
  // Clientes
  nuevoCliente: Cliente
  actualizarCliente: Cliente
  eliminarCliente: Scalars['String']
}

/** Todos los datos que se pueden leer de un cliente */
export type Cliente = {
  __typename?: 'Cliente'
  id: Scalars['ID']
  nombre: Scalars['String']
  apellido: Scalars['String']
  email: Scalars['String']
  telefono: Scalars['String']
  empresa: Scalars['String']
  fechaCreacion: Scalars['String']
  vendedorQueLoDioDeAlta: Scalars['ID']
}

export type Token = {
  __typename?: 'Token'
  token: Scalars['String']
}

/** Datos recibidos de Top Cliente */
export type TopCliente = {
  __typename?: 'TopCliente'
  cliente: Array<Cliente>
}

/** Representación de usuarios en el sistema */
export type Usuario = {
  __typename?: 'Usuario'
  id: Scalars['ID']
  nombre: Scalars['String']
  apellido: Scalars['String']
  email: Scalars['String']
  fechaCreacion: Scalars['String']
}
