import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CUSTOMERS_QUERY } from '../queries';

const Customers = () => (
	<Query query={CUSTOMERS_QUERY}>
		{({ loading, error, data }) => {
			if (loading) return 'Loading...';
			if (error) return `Error: ${error.message}`;

			return (
				<Fragment>
					<h2 className="text-center mt-4">List of costumers</h2>
					<ul className="list-group mt-4">
						{data.getClientes.map((item) => (
							<li key={item.id} className="list-group-item">
								<div className="row justify-content-between align-items-center">
									<div className="col-md-8 justify-content-between align-items-center">
										{item.nombre} {item.apellido} - {item.empresa}
									</div>

									<div className="col-md-4 d-flex justify-content-end">
										<a className="btn btn-success d-block d-md-inline-block">Edit Customer</a>
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
