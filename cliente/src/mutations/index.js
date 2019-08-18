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

export const DELETE_CUSTOMER = gql`
	mutation eliminarCliente($id: ID!) {
		eliminarCliente(id: $id)
	}
`;

// PRODUCTS
export const NEW_PRODUCT = gql`
	mutation nuevoProducto($input: ProductoInput) {
		nuevoProducto(input: $input) {
			nombre
		}
	}
`;
