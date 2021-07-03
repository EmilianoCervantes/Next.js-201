import { Query } from "../../gql-tags/generated-types/crm-types";

export default interface ListadoClientesProps {
  clientesVendedor: Query['obtenerClientesVendedor']
}