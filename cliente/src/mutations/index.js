import gql from 'graphql-tag';

export const NEW_CUSTOMER = gql`
	mutation crearCliente($input: ClienteInput) {
		crearCliente(input: $input) {
			id
			nombre
			apellido
		}
	}
`;

export const UPDATE_CUSTOMER = gql`
	mutation actualizarCliente($input: ClienteInput) {
		actualizarCliente(input: $input) {
			id
			nombre
			apellido
			edad
			empresa
			tipo
			emails {
				email
			}
		}
	}
`;
