import gql from "graphql-tag";


export const CUSTOMERS_QUERY = gql`{
  getClientes {
    id
    nombre
    apellido
    empresa
  }
}`;
