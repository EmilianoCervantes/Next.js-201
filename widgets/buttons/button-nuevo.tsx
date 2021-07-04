import Link from 'next/link'

interface ButtonNuevoProps {
  destino: string
  titulo: string
}

export const ButtonNuevo = ({ destino, titulo }: ButtonNuevoProps) => {
  return (
    <Link href={destino}>
      <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo {titulo}</a>
    </Link>
  )
}