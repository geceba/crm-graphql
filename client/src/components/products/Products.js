import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_PRODUCTS } from './../../queries';
import { DELETE_PRODUCT } from './../../mutations';
import { Link } from 'react-router-dom';
import Success from '../alerts/Success';

import Paginator from "../Paginator";

class Product extends Component {
	limite = 2;

	state = {
		alerta: {
			mostrar: false,
			mensaje: ''
		},
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
		const { alerta: { mostrar, mensaje } } = this.state;

		const alerta = mostrar ? <Success mensaje={mensaje} /> : '';
		return (
			<Fragment>
				<h1 className="text-center mb-5">Productos</h1>
                {alerta}
				<Query query={GET_PRODUCTS} pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset}}>
					{({ loading, error, data, startPolling, stopPolling }) => {
						if (loading) return 'Loading...';
						if (error) return `Error: ${error.message}`;


						return (
							<Fragment>
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
													<Mutation mutation={DELETE_PRODUCT} onCompleted={(data) => {
														this.setState({
															alerta: {
																mostrar: true,
																mensaje: data.eliminarProducto
															}
														}, () => {
															setTimeout(() => {
																this.setState({
																	alerta: {
																		mostrar: false,
																		mensaje: ''
																	}
																})
															}, 2000)
														})
													}}>
														{(eliminarProducto) => (
															<button
																type="button"
																className="btn btn-danger"
																onClick={() => {
																	if (
																		window.confirm(
																			'¿Seguro que quieres eliminar este producto?'
																		)
																	) {
																		eliminarProducto({
																			variables: { id }
																		});
																	}
																}}
															>
																&times; Eliminar
															</button>
														)}
													</Mutation>
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
								<Paginator
									actual={this.state.paginador.actual}
									total={data.totalProductos}
									limite={this.limite}
									paginaAnterior={this.paginaAnterior}
									paginaSiguiente={this.paginaSiguiente}
								/>
							</Fragment>
						);
					}}
				</Query>
			</Fragment>
		);
	}
}

export default Product;
