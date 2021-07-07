import { CANTIDAD_PRODUCTO, SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTOS } from "../actions"

export const reducerPedido = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case SELECCIONAR_CLIENTE:
      return { ...state, clientePedido: payload };
    case SELECCIONAR_PRODUCTOS:
      /** INICIO porque en el state, pedido no se editaba cuando se reducían los prods */
      const arrIdsActuales = state.prodsSeleccionados.map(prod => prod.id)
      const arrIdsNuevos = payload.map(prod => prod.id)
      const mayorQue = arrIdsActuales.length > arrIdsNuevos.length
      const idEliminado = mayorQue ? arrIdsActuales.filter(function (id) {
        return this.indexOf(id) < 0
      }, arrIdsNuevos).join() : ''

      let pedido = state.pedido.filter(prod => prod.idProducto !== idEliminado)
      if (!payload.length) pedido = []
      /** FIN porque en el state, pedido no se editaba cuando se reducían los prods */

      return { ...state, prodsSeleccionados: payload, pedido };
    case CANTIDAD_PRODUCTO:
      const { cantidad, idProducto } = payload
      const pedidoUpdated = state.pedido.filter(pedido => pedido?.idProducto !== idProducto)

      return { ...state, pedido: [...pedidoUpdated, { idProducto, cantidad }] }
    default:
      return state;
  }
}
