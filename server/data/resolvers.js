import mongoose from 'mongoose';
import { Clientes, Productos } from './db';
import { rejects } from 'assert';

export const resolvers = {
	Query: {
		getClientes: (root, {limite, offset}) => {
			return Clientes.find({}).limit(limite).skip(offset);
		},
		getCliente: (root, { id }) => {
			return new Promise((resolve, object) => {
				Clientes.findById(id, (err, cliente) => {
					if(err) rejects(err);
					else resolve(cliente);
				});
			});
		},
		totalClientes : (root) => {
			return new Promise((resolve, object) => {
				Clientes.countDocuments({}, (err, count) => {
					if(err) rejects(err);
					else resolve(count);
				});
			});
		},
		// productos
		getProductos : (root, {limite, offset}) => {
			return Productos.find({}).limit(limite).skip(offset)
		},
		getProducto : (root, {id}) => {
			return new Promise((resolve, object) =>{
				Productos.findById(id, (error, producto) => {
					if(error) rejects(error);
					else resolve(producto);
				});
			});
		},
		totalProductos : (root) => {
			return new Promise((resolve, object) => {
				Productos.countDocuments({}, (err, count) => {
					if(err) rejects(err);
					else resolve(count);
				});
			});
		},
	},
	Mutation: {
		crearCliente: (root, { input }) => {
			const nuevoCliente = new Clientes({
				nombre: input.nombre,
				apellido: input.apellido,
				empresa: input.empresa,
				emails: input.emails,
				edad: input.edad,
				tipo: input.tipo,
				pedidos: input.pedidos
			});

			nuevoCliente.id = nuevoCliente._id;

			return new Promise((resolve, object) => {
				nuevoCliente.save((err) => {
					if (err) rejects(err);
					else resolve(nuevoCliente);
				});
			});
        },
        actualizarCliente: (root, {input}) => {
             
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate({ _id: input.id}, input, { new: true }, (err, cliente) => {
                    if(err) rejects(err)
                    else resolve(cliente)
                });
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
				Clientes.findOneAndDelete({_id: id}, (err) => {
					if(err) rejects(err)
					else resolve("Se eliminó correctamente")
				});
			});
		},
		
		// Productos
		nuevoProducto: (root, {input}) => {
			const nuevoProducto= new Productos({
				nombre: input.nombre,
				precio: input.precio,
				stock: input.stock
			});
			// mongo debe crear el id que se asigna al objeto
			nuevoProducto.id = nuevoProducto._id;

			return new Promise((resolve, object) => {
				nuevoProducto.save((err) => {
					if (err) rejects(err);
					else resolve(nuevoProducto);
				});
			});
		},
		actualizarProducto: (root, {input}) => {
			return new Promise((resolve, producto) => {
				Productos.findOneAndUpdate({_id: input.id}, input, {new: true}, (error, producto) => {
					if(error) rejects(error);
					else resolve(producto);
				});
			});
		},
		eliminarProducto: (root, {id}) => {
			return new Promise((resolve, producto) => {
				Productos.findOneAndDelete({_id: id}, (error) => {
					if(error) rejects(error);
					else resolve('Se eliminó correctamente');
				});
			});
		}

        
	}
};

export default resolvers;
