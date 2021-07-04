import Swal from 'sweetalert2'
import DatosClienteProps from "./datoscliente-props"
import { useMutation } from '@apollo/client'
import { Mutation } from '../../gql-tags/generated-types/crm-types'
import { DELETE_CLIENTE_MUTATION, FETCH_CLIENTES_VENDEDOR_QUERY } from '../../gql-tags/clientes';
import { ButtonIcon, DatoRow } from '../../widgets'
import { useRouter } from 'next/router';
import { EDITAR_CLIENTE } from '../../navigation/crm-user-navigation';

export default function DatosCliente({ cliente, num }: DatosClienteProps) {
  const { nombre, apellido, email, empresa, id } = cliente

  const router = useRouter()

  const [eliminarCliente] = useMutation<Mutation>(DELETE_CLIENTE_MUTATION, {
    update(cache) {
      const { obtenerClientesVendedor } = cache.readQuery({
        query: FETCH_CLIENTES_VENDEDOR_QUERY
      })

      cache.writeQuery({
        query: FETCH_CLIENTES_VENDEDOR_QUERY,
        data: {
          obtenerClientesVendedor: obtenerClientesVendedor.filter(cliente => cliente.id !== id)
        }
      })
    }
  })

  const editarCliente = () => {
    router.push({
      pathname: `${EDITAR_CLIENTE}[id]`,
      query: { id },
    })
  }

  const confirmEliminarCliente = (id: string) => {
    Swal.fire({
      title: 'Confirmación para eliminar',
      text: `¿Segura/o que deseas borrar a ${nombre} ${apellido}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonAriaLabel: 'Confirmar',
      cancelButtonText: 'No borrar',
      cancelButtonAriaLabel: 'No borrar',
    }).then(async res => {
      if (res.isConfirmed) {
        const { data, errors } = await eliminarCliente({
          variables: { id }
        })

        if (errors?.length || !data.eliminarCliente) {
          Swal.fire(
            '¡Ha ocurrido un problema!',
            `Intenta más tarde borrar a ${nombre} ${apellido}.`,
            'error'
          )
        } else {
          Swal.fire(
            'Eliminado',
            `Se ha borrado a ${nombre} ${apellido} exitosamente.`,
            'success'
          )
        }
      }
    })
  }

  return (
    <tr>
      <DatoRow>{num}</DatoRow>
      <DatoRow>{nombre} {apellido}</DatoRow>
      <DatoRow>{empresa}</DatoRow>
      <DatoRow>{email}</DatoRow>
      <DatoRow>
        <ButtonIcon
          color='bg-green-400'
          click={() => editarCliente()}
          title='Editar'
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </ButtonIcon>
      </DatoRow>
      <DatoRow>
        <ButtonIcon
          color='bg-red-800'
          click={() => confirmEliminarCliente(id)}
          title='Eliminar'
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </ButtonIcon>
      </DatoRow>
    </tr>
  )
}
