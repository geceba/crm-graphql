import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo')
});

class Cliente {
    constructor(id, {nombre, apellido, empresa, email}) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.empresa = empresa;
        this.email = email;
    }
}

const clientesDB = {};

// el resolver
const root = {
    cliente: () => {
        return {
            "id": 19,
            "nombre": "Gerardo ",
            "apellido": "Cetzal",
            "empresa": "BioFractal",
            "email": "correo@es.com"
        }
    },
    crearCliente: ({input}) => {
        const id = require('crypto').randomBytes(10).toString('hex');
        clientesDB[id] = input;
        return new Cliente(id, input);

    }
};

app.use('/graphql', graphqlHTTP({
    // schema
    schema,
    // resolver se pasa como root value
    rootValue: root,
    // utilizar graphiql
    graphiql: true
}));

app.listen(8000, ()=> {
    console.log('El servidor esta funcionando');
})