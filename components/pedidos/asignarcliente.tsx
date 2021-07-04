import Select from 'react-select'
import AsignarClienteProps from './asignarcliente-props'

export default function AsignarCliente({ setCliente, noClientFound }: AsignarClienteProps) {

  const seleccionarCliente = cliente => {
    setCliente(cliente)
  }

  return (
    <Select
      options={[]}
      onChange={seleccionarCliente}
      getOptionValue={opciones => opciones.id}
      getOptionLabel={opciones => opciones.nombre}
      placeholder='Elige a uno de tus clientes'
      noOptionsMessage={noClientFound}
    />
  )
}