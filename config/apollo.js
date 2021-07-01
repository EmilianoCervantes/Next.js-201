/**
 * Configuración desde el lado del cliente para conectar con nuestro servidor de GQL
 */

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'node-fetch'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: true, // No necesario pero recomendable
  link: new createHttpLink({
    uri: 'http://localhost:4000/',
    fetch
  })
})

export default client
