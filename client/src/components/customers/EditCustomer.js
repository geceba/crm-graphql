import React, { Component, Fragment } from 'react';
import { CUSTOMER_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import FormEdit from './FormEdit';

class EditCustomer extends Component {
	state = {};
	render() {
		// tomar el id del contacto a editar
		const { id } = this.props.match.params;
		// la variables se deben pasar como objeto cuando usas query
		return (
			<Fragment>
				<h2 className="text-center">Edit Customer</h2>

				<div className="row justify-content-center">
					<Query query={CUSTOMER_QUERY} variables={{id}}>
						{({ loading, error, data, refetch }) => {
							if (loading) return 'cargando...';
							if (error) return `Error!  ${error.message}`;
                            console.log(data)
							return <FormEdit 
								cliente={data.getCliente}
								refetch={refetch}
                            />;
						}}
					</Query>
				</div>
			</Fragment>
		);
	}
}

export default EditCustomer;
