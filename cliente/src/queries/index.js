import gql from 'graphql-tag';

export const CUSTOMERS_QUERY = gql`
	query getCliente($limite: Int, $offset: Int) {
		getClientes(limite: $limite, offset: $offset) {
			id
			nombre
			apellido
			empresa
		}
		totalClientes
	}
`;

export const CUSTOMER_QUERY = gql`
	query ConsultarCliente($id: ID) {
		getCliente(id: $id) {
			id
			nombre
			apellido
			empresa
			edad
			tipo
			emails {
				email
			}
		}
	}
`;
