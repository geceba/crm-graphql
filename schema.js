import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        edad: Int
        tipo: TipoCliente
    }
    enum TipoCliente {
        BASICO
        PREMIUM
    }
    type Query {
        getCliente(id: ID): Cliente
    }
    input ClienteInput {
        id: ID
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        edad: Int!
        tipo: TipoCliente!
    }
    type Mutation {
        crearCliente(input: ClienteInput): Cliente
    }
`);

export default schema;