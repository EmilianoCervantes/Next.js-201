/**
 * Configuración desde el lado del cliente para conectar con nuestro servidor de GQL
 */

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'
import fetch from 'node-fetch'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
  fetch
})
/** Modificar los headers que se envían */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true, // No necesario pero recomendable
  link: authLink.concat(httpLink)
})

export default client
