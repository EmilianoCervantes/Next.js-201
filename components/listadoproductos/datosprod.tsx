import { useRouter } from "next/router"
import Swal from "sweetalert2"
import DatosProductoProps from "./datosprod-props"
import { ButtonIcon, DatoRow } from "../../widgets"
import { moneyFormat } from "../../utilities"
import { useMutation } from "@apollo/client"
import { Mutation } from "../../gql-tags/generated-types/crm-types"
import { DELETE_PRODUCTO_MUTATION, FETCH_PRODUCTOS_QUERY } from "../../gql-tags/productos"
import { EDITAR_PRODUCTO } from "../../navigation/crm-user-navigation"

export default function DatosProducto({ num, producto }: DatosProductoProps) {
  const { existencia, id, nombre, precio: balance } = producto

  const router = useRouter()

  const [eliminarProducto] = useMutation<Mutation>(DELETE_PRODUCTO_MUTATION, {
    update(cache) {
      const { obtenerProductos } = cache.readQuery({
        query: FETCH_PRODUCTOS_QUERY
      })

      cache.writeQuery({
        query: FETCH_PRODUCTOS_QUERY,
        data: {
          obtenerProductos: obtenerProductos.filter(prod => prod.id !== id)
        }
      })
    }
  })

  const editarProducto = () => {
    router.push({
      pathname: `${EDITAR_PRODUCTO}[id]`,
      query: { id }
    })
  }

  const confirmEliminarProducto = () => {
    Swal.fire({
      title: 'Confirmación para eliminar',
      text: `¿Segura/o que deseas borrar el producto ${nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonAriaLabel: 'Confirmar',
      cancelButtonText: 'No borrar',
      cancelButtonAriaLabel: 'No borrar',
    }).then(async res => {
      if (res.isConfirmed) {
        const { data, errors } = await eliminarProducto({
          variables: { id }
        })

        if (errors?.length || !data.eliminarProducto) {
          Swal.fire(
            '¡Ha ocurrido un problema!',
            `Intenta más tarde borrar a ${nombre}.`,
            'error'
          )
        } else {
          Swal.fire(
            'Eliminado',
            `Se ha borrado a ${nombre} exitosamente.`,
            'success'
          )
        }
      }
    })
  }

  return (
    <tr>
      <DatoRow>{num}</DatoRow>
      <DatoRow>{nombre}</DatoRow>
      <DatoRow>{existencia}</DatoRow>
      <DatoRow>${moneyFormat({ balance })}</DatoRow>
      <DatoRow>
        <ButtonIcon
          color='bg-green-400'
          click={() => editarProducto()}
          title='Editar'
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </ButtonIcon>
      </DatoRow>
      <DatoRow>
        <ButtonIcon
          color='bg-red-800'
          click={() => confirmEliminarProducto()}
          title='Eliminar'
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </ButtonIcon>
      </DatoRow>
    </tr>
  )
}
