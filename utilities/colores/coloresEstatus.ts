import { Estatus } from "../../gql-tags/generated-types/crm-types";

export const getColorEstatus = (estatus: Estatus) => {
  switch (estatus) {
    case Estatus['PENDIENTE']:
      return 'border border-t-4 border-yellow-500'
    case Estatus['COMPLETADO']:
      return 'border border-t-4 border-green-500'
    case Estatus['CANCELADO']:
      return 'border border-t-4 border-red-800'
    default:
      return 'border border-t-4 border-yellow-500'
  }
}