import Link from 'next/link'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { usePedido, useProductos } from "../../../context"
import { Producto } from '../../../gql-tags/generated-types/crm-types'
import { NUEVO_PRODUCTO } from '../../../navigation/crm-user-navigation'
import { CrmErrorMessage, StepTitle } from "../../../widgets"

export default function AsignarProductos() {
  const [listaProdsExistentes, setProductosExistentes] = useState<Producto[]>([])
  const [listaProdsPedido, setProductosPedido] = useState<Producto[]>([])

  const { productos, isError, isLoading, useRefetchProductos } = useProductos()
  useRefetchProductos(productos)

  const { actualizarProductos } = usePedido()

  useEffect(() => {
    setProductosExistentes(productos.filter(prod => !!prod.existencia))
  }, [productos])

  useEffect(() => {
    actualizarProductos(listaProdsPedido)
  }, [actualizarProductos, listaProdsPedido])

  if (isLoading) {
    return (
      <>
        <StepTitle>2. Indica los productos que contendrá este pedido</StepTitle>
        <h2>Cargando productos...</h2>
      </>
    )
  }

  if (isError) {
    return (
      <>
        <StepTitle>1. Selecciona un cliente al pedido</StepTitle>
        <CrmErrorMessage>Ocurrió un error cargando el listado de productos</CrmErrorMessage>
      </>
    )
  }

  const noProdFound = () => <Link href={NUEVO_PRODUCTO}><a>Agregar un nuevo producto</a></Link>

  return (
    <>
      <StepTitle>2. Haz click en todos los productos que contendrá este pedido</StepTitle>
      <Select
        className='mt-3'
        isMulti={true}
        options={listaProdsExistentes}
        onChange={setProductosPedido}
        getOptionValue={opciones => opciones.id}
        getOptionLabel={opciones => `${opciones.nombre} - ${opciones.existencia} disponibles`}
        placeholder='Elige uno o más productos para el pedido'
        noOptionsMessage={noProdFound}
      />
    </>
  )
}