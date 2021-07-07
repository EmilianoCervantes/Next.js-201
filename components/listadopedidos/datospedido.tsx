import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import Swal from "sweetalert2"
import { FETCH_CLIENTE_QUERY } from "../../gql-tags/clientes"
import { Estatus, Mutation, Query } from "../../gql-tags/generated-types/crm-types"
import { DELETE_PEDIDO_MUTATION, FETCH_PEDIDOS_VENDEDOR_QUERY, UPDATE_PEDIDO_MUTATION } from "../../gql-tags/pedidos"
import { getColorEstatus, moneyFormat } from "../../utilities"
import { BoldTxt, ButtonIcon, CrmGenericMessage, IconTxt } from "../../widgets"
import { PedidoProps } from "./datospedido-props"

export default function DatosPedido({ pedidoProds }: PedidoProps) {
  const { clientePedido, estatus, id, pedido, total } = pedidoProds

  const [estado, setEstado] = useState(estatus)
  const [mensaje, setMensaje] = useState('')

  const { data, loading } = useQuery<Query>(FETCH_CLIENTE_QUERY, {
    variables: { id: clientePedido },
    skip: !clientePedido
  })

  const [actualizarPedido] = useMutation<Mutation>(UPDATE_PEDIDO_MUTATION)

  const [eliminarPedido] = useMutation<Mutation>(DELETE_PEDIDO_MUTATION, {
    update(cache) {
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: FETCH_PEDIDOS_VENDEDOR_QUERY
      })

      cache.writeQuery({
        query: FETCH_PEDIDOS_VENDEDOR_QUERY,
        data: {
          obtenerPedidosVendedor: obtenerPedidosVendedor.filter(pedido => pedido.id !== id)
        }
      })
    }
  })

  if (loading) {
    return <h2 className="font-bold text-gray-800">Cargando...</h2>
  }

  const { nombre, apellido, email, empresa, telefono } = data?.obtenerCliente

  const onEstatusChange = async (newEstatus) => {
    try {
      setEstado(newEstatus)
      const { data } = await actualizarPedido({
        variables: {
          id,
          input: {
            clientePedido,
            estatus: newEstatus,
            pedido: pedido.map(prod => {
              return {
                cantidad: prod.cantidad,
                idProducto: prod.idProducto,
                nombre: prod.nombre,
                precio: prod.precio
              }
            }),
            total
          }
        }
      })

      if (data?.actualizarPedido) {
        const { id, estatus } = data.actualizarPedido
        setMensaje(`Se actualizó correctamente el pedido: ${id} con estatus: ${estatus}`)

        setTimeout(() => {
          setMensaje('')
        }, 3500);
      }
    } catch (error) {
      setMensaje(error.message)
      setEstado(estatus)

      setTimeout(() => {
        setMensaje('')
      }, 2500);
    }
  }

  const deletePedido = async () => {
    try {
      const { data } = await eliminarPedido({
        variables: { id }
      })

      if (data?.eliminarPedido) {
        Swal.fire(
          'Eliminado',
          `Se ha borrado el pedido ${id} exitosamente.`,
          'success'
        )
      }
    } catch (error) {
      Swal.fire(
        '¡Ha ocurrido un problema!',
        `Intenta más tarde borrar el pedido ${id}.`,
        'error'
      )
    }
  }

  return (
    <>
      {!!mensaje && <CrmGenericMessage message={mensaje} />}
      <div className={`${getColorEstatus(estado)} mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
        <div className="">
          <BoldTxt>Cliente: {nombre} {apellido}</BoldTxt>

          {!!email && (
            <IconTxt
              txt={email}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </IconTxt>
          )}

          {!!telefono && (
            <IconTxt
              txt={telefono}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </IconTxt>
          )}
          {!!empresa && (
            <IconTxt
              txt={empresa}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </IconTxt>
          )}

          <h2 className="font-bold text-gray-800 mt-10">Estatus pedido: {estatus}</h2>
          <select
            className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
            value={estado}
            onChange={e => onEstatusChange(Estatus[e.target.value])}
          >
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="COMPLETADO">COMPLETADO</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        <div className="font-bold text-gray-800 mt-2">
          <h2>Resumen del pedido</h2>
          {pedido.map(prod => (
            <div key={prod.idProducto} className="mt-4">
              <p className="text-sm text-gray-600">Producto: {prod.nombre}</p>
              <p className="text-sm text-gray-600">Cantidad: {prod.cantidad}</p>
            </div>
          ))}

          <BoldTxt top>
            Total del pedido:{` `}
            <span className="font-light">${moneyFormat({ balance: total })}</span>
          </BoldTxt>

          <ButtonIcon
            color='bg-red-800'
            click={deletePedido}
            title='Eliminar Pedido'
            extraClasses='leading-tight inline-block px-5 mt-4'
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </ButtonIcon>
        </div>
      </div>
    </>
  )
}
