import React, { Fragment, Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CUSTOMERS_QUERY } from '../../queries';
import { Link } from 'react-router-dom';
import { DELETE_CUSTOMER } from '../../mutations';
import Paginator from '../Paginator';

class Customers extends Component {
	limite = 4;

	state = {
		paginador: {
			offset: 0,
			actual: 1
		}
	};

	paginaAnterior = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset - this.limite,
				actual: this.state.paginador.actual - 1
			}
		});
	};

	paginaSiguiente = () => {
		this.setState({
			paginador: {
				offset: this.state.paginador.offset + this.limite,
				actual: this.state.paginador.actual + 1
			}
		});
	};

	render() {
		return (
			<Query
				query={CUSTOMERS_QUERY}
				pollInterval={1000}
				variables={{ limite: this.limite, offset: this.state.paginador.offset }}
			>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if (loading) return 'Loading...';
					if (error) return `Error: ${error.message}`;

					return (
						<Fragment>
							<h2 className="text-center">Listado de Clientes</h2>
							<ul className="list-group">
								{data.getClientes.map((item) => {
									const { id } = item;
									return (
										<li key={item.id} className="list-group-item">
											<div className="row justify-content-between align-items-center">
												<div className="col-md-8 justify-content-between align-items-center">
													{item.nombre} {item.apellido} - {item.empresa}
												</div>

												<div className="col-md-4 d-flex justify-content-end">
													<Mutation mutation={DELETE_CUSTOMER}>
														{(eliminarCliente) => (
															<button
																type="button"
																className="btn btn-danger d-block d-md-inline-block mr-2"
																onClick={() => {
																	if (
																		window.confirm(
																			'Seguro que quieres eliminar este cliente?'
																		)
																	) {
																		eliminarCliente({
																			variables: { id }
																		});
																	}
																}}
															>
																&times; Eliminar
															</button>
														)}
													</Mutation>
													<Link
														to={`/customer/edit/${item.id}`}
														className="btn btn-success d-block d-md-inline-block"
													>
														Edit Customer
													</Link>
												</div>
											</div>
										</li>
									);
								})}
							</ul>
							<Paginator
								actual={this.state.paginador.actual}
								totalClientes={data.totalClientes}
								limite={this.limite}
								paginaAnterior={this.paginaAnterior}
								paginaSiguiente={this.paginaSiguiente}
							/>
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default Customers;
