import Swal from 'sweetalert2'
import DatosClienteProps from "./datoscliente-props";
import DatoCliente from "./datocliente";
import { useMutation } from '@apollo/client';
import { Mutation } from '../../gql-tags/generated-types/crm-types';
import { DELETE_CLIENTE_MUTATION, FETCH_CLIENTES_VENDEDOR_QUERY } from '../../gql-tags/clientes';

export default function DatosCliente({ cliente, num }: DatosClienteProps) {
  const { nombre, apellido, email, empresa, id } = cliente

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
      <DatoCliente>{num}</DatoCliente>
      <DatoCliente>{nombre} {apellido}</DatoCliente>
      <DatoCliente>{empresa}</DatoCliente>
      <DatoCliente>{email}</DatoCliente>
      <DatoCliente>
        <button
          type='button'
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmEliminarCliente(id)}
        >
          <p>Eliminar</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </DatoCliente>
    </tr>
  )
}