import mongoose from 'mongoose';
import { Clientes } from './db';
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
		}
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
				Clientes.findOneAndRemove({_id: id}, (err) => {
					if(err) rejects(err)
					else resolve("Se eliminó correctamente")
				});
			});
        }

        
	}
};

export default resolvers;
