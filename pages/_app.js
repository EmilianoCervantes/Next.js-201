/**
 * Como el archivo principal del proyecto:
 * - Estilos globales - en este caso tailwind
 * - Config de ApolloClient
 */

import { ApolloProvider } from '@apollo/client'
import 'tailwindcss/tailwind.css'
import client from '../config/apollo'

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

