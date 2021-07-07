import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { Query } from "../../gql-tags/generated-types/crm-types"
import { FETCH_USER } from "../../gql-tags/usuarios"
import { LOGIN } from "../../navigation/crm-auth-navigation"

export default function Header() {
  const { data, error, loading } = useQuery<Query>(FETCH_USER)

  const router = useRouter()

  const cerrarSesion = () => {
    localStorage.clear()
    router.push(LOGIN)
  }

  if (loading) {
    return (
      <header className="flex justify-end">
        <h1>Cargando CRM...</h1>
      </header>
    )
  }

  if (error || !data.obtenerUsuario) {
    cerrarSesion()

    return (
      <header className="flex justify-between mb-6">
        <h1 className="mr-2">Nombre no encontrado</h1>
      </header>
    )
  }

  const { nombre, apellido } = data.obtenerUsuario

  return (
    <header className="sm:flex sm:justify-between mb-6">
      <h1 className="mr-2 mb-5 lg:mb-0">Hola: {nombre} {apellido}</h1>
      <button
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        onClick={() => cerrarSesion()}
        type="button"
      >
        Cerrar Sesión
      </button>
    </header>
  )
}
