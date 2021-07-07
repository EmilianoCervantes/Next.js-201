import ProductoCantidad from "./productocantidad"
import { usePedido } from "../../../context"
import { CrmGenericMessage, StepTitle } from "../../../widgets"

export default function CantidadProductos() {
  const { prodsSeleccionados } = usePedido()

  return (
    <>
      <StepTitle>3. Indica la cantidad de elementos para cada producto</StepTitle>
      {!!prodsSeleccionados.length ?
        prodsSeleccionados.map(prod => (
          <ProductoCantidad
            key={prod.id}
            prod={prod}
          />
        ))
        :
        <CrmGenericMessage message='Todavía no seleccionas ningún producto' />
      }
    </>
  )
}
