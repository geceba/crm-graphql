import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_PRODUCTS } from './../../queries';
import { Link } from 'react-router-dom';

class Product extends Component {
	state = {};
	render() {
		return (
			<Fragment>
				<h1 className="text-center mb-5">Productos</h1>
				<Query query={GET_PRODUCTS} pollInterval={1000}>
					{({ loading, error, data, startPolling, stopPolling }) => {
						if (loading) return 'Loading...';
						if (error) return `Error: ${error.message}`;

						console.log(data);

						return (
							<table className="table">
								<thead>
									<tr className="table-primary">
										<th scope="col">Nombre</th>
										<th scope="col">Precio</th>
										<th scope="col">Existencia</th>
										<th scope="col">Eliminar</th>
										<th scope="col">Editar</th>
									</tr>
								</thead>
								<tbody>
									{data.getProductos.map((item) => {
										const { id } = item;
										return (
											<tr key={id}>
												<td>{item.nombre}</td>
												<td>{item.precio}</td>
												<td>{item.stock}</td>
												<td>
													<button type="button" className="btn btn-danger">
														&times; Eliminar
													</button>
												</td>
                                                <td>
                                                    <Link to={`/products/edit/${id}`} className="btn btn-success">
                                                        Editar Producto
                                                    </Link>
                                                </td>
											</tr>
										);
									})}
								</tbody>
							</table>
						);
					}}
				</Query>
			</Fragment>
		);
	}
}

export default Product;
