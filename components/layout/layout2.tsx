import Head from 'next/head'
import { PropsWithChildren } from 'react'
import LayoutParams from './layout-props'

export default function Layout2({ children }: PropsWithChildren<LayoutParams>) {
  return (
    <>
      <Head>
        <title>CRM - Administración de clientes</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </Head>

      {/* min-h-screen: que creezca a todo lo disponible */}
      <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
        <div>
          {children}
        </div>
      </div>
    </>
  )
}