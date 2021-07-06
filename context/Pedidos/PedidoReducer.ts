import { SELECCIONAR_CLIENTE, SELECCIONAR_PRODUCTOS } from "../actions"

export const reducerPedido = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case SELECCIONAR_CLIENTE:
      return { ...state, clientePedido: payload };
    case SELECCIONAR_PRODUCTOS:
      return { ...state, pedido: payload };
    default:
      return state;
  }
}
