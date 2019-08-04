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
