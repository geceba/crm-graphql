import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo')
});

// el resolver
const root = {
    cliente: () => {
        return {
            "id": 19,
            "nombre": "Gerardo ",
            "apellido": "Cetzal",
            "empresa": "BioFractal",
            "emails": [
                {email: "correo@es.com"},
                {email: "correo@empresa.com"}
            ]
        }
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