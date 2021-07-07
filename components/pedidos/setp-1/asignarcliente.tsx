import Link from 'next/link'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useClientes, usePedido } from '../../../context'
import { Cliente } from '../../../gql-tags/generated-types/crm-types'
import { NUEVO_CLIENTE } from '../../../navigation/crm-user-navigation'
import { CrmErrorMessage, StepTitle } from '../../../widgets'

export default function AsignarCliente() {
  const [cliente, setCliente] = useState<Cliente>(null)

  const { clientes, isLoading, isError, useRefetchClientes } = useClientes()
  useRefetchClientes(clientes)

  const { actualizarCliente } = usePedido()

  useEffect(() => {
    if (cliente?.id) actualizarCliente(cliente)
  }, [actualizarCliente, cliente])

  const noClientFound = () => (
    <Link href={NUEVO_CLIENTE}>
      <a>Agregar un nuevo cliente</a>
    </Link>
  )

  if (isLoading) {
    return (
      <>
        <StepTitle>1. Selecciona un cliente al pedido</StepTitle>
        <h2>Cargando clientes...</h2>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <StepTitle>1. Selecciona un cliente al pedido</StepTitle>
        <CrmErrorMessage>Ocurrió un error cargando a los clientes</CrmErrorMessage>
      </>
    )
  }

  return (
    <>
      <StepTitle>1. Selecciona un cliente al pedido</StepTitle>
      <Select
        className='mt-3'
        options={clientes}
        onChange={setCliente}
        getOptionValue={opciones => opciones.id}
        getOptionLabel={opciones => opciones.nombre}
        placeholder='Elige a uno de tus clientes'
        noOptionsMessage={noClientFound}
      />
    </>
  )
}