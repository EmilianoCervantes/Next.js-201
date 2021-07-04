import { Query } from "../../gql-tags/generated-types/crm-types";

export default interface ClientFormProps {
  submitTitle: string
  onSubmit: (e) => void
  paraQuien?: string
  data?: Query['obtenerCliente']
}