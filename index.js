import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers';

const root = resolvers;
const app = express();

app.get('/', (req, res) => {
    res.send('Todo listo')
});

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