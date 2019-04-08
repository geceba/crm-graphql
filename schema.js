import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        edad: Int
        tipo: TipoCliente
        pedidos: [Pedido]
        emails: [Email]
    }
    type Pedido {
        producto: String
        precio: Int
    }
    type Email {
        email: String
    }
    enum TipoCliente {
        BASICO
        PREMIUM
    }
    type Query {
        getCliente(id: ID): Cliente
    }
    input EmailInput {
        email: String
    }
    input PedidoInput {
        producto: String
        precio: Int
    }
    input ClienteInput {
        id: ID
        nombre: String!
        apellido: String!
        empresa: String!
        edad: Int!
        tipo: TipoCliente!
        pedidos: [PedidoInput]
        emails: [EmailInput]
    }
    """ Mutations para crear nuevos clientes """
    type Mutation {
        #nombre del resolver, Input con datos y el valor que retorna
        """ te permite crear nuevos clientes """
        crearCliente(input: ClienteInput): Cliente
    }
`);

export default schema;