import { Query } from "../../gql-tags/generated-types/crm-types";

export default interface ProductFormProps {
  submitTitle: string
  onSubmit: (e) => void
  data?: Query['obtenerProducto']
}