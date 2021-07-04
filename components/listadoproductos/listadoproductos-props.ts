import { Query } from "../../gql-tags/generated-types/crm-types";

export default interface ListadoProductosProps {
  productos: Query['obtenerProductos']
}