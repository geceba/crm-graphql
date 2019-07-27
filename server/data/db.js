import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/clientes', { useNewUrlParser: true });

// definir el squema de clientes

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array,
    edad: Number,
    tipo: String,
    pedidos: Array
});

const Clientes = mongoose.model('clientes', clientesSchema);
export { Clientes };

