import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CUSTOMERS_QUERY } from '../queries';
import { Link } from 'react-router-dom';

const Customers = () => (
	<Query query={CUSTOMERS_QUERY} pollInterval={1000}>
		{({ loading, error, data, startPolling, stopPolling }) => {
			if (loading) return 'Loading...';
			if (error) return `Error: ${error.message}`;

			return (
				<Fragment>
					<h2 className="text-center">Listado de Clientes</h2>
					<ul className="list-group">
						{data.getClientes.map((item) => (
							<li key={item.id} className="list-group-item">
								<div className="row justify-content-between align-items-center">
									<div className="col-md-8 justify-content-between align-items-center">
										{item.nombre} {item.apellido} - {item.empresa}
									</div>

									<div className="col-md-4 d-flex justify-content-end">
										<Link to={`/customer/edit/${item.id}`}  className="btn btn-success d-block d-md-inline-block">Edit Customer</Link>
									</div>
								</div>
							</li>
						))}
					</ul>
				</Fragment>
			);
		}}
	</Query>
);

export default Customers;
