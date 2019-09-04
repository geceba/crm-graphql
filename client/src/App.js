import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Customers from './components/customers/Customers';
import NewCustomer from './components/customers/NewCustomer';
import EditCustomer from './components/customers/EditCustomer';
import NewProduct from './components/products/NewProduct';
import Product from './components/products/Products';
import EditProduct from './components/products/EditProduct';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import components
import Header from './components/layout/Header';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache({
		addTypename: false
	}),
	onError: ({ networkError, graphqlErrors }) => {
		console.log('graphQLErrors', graphqlErrors);
		console.log('network errors', networkError);
	}
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Fragment>
					<Header />
					<div className="container">
						<Switch>
              <Route exact path="/customer" component={Customers} />
              <Route exact path="/customer/edit/:id" component={EditCustomer} />
              <Route exact path="/customer/new" component={NewCustomer} />
              <Route exact path="/products/new" component={NewProduct} />
              <Route exact path="/products" component={Product} />
              <Route exact path="/products/edit/:id" component={EditProduct} />
            </Switch>
					</div>
				</Fragment>
			</Router>
		</ApolloProvider>
	);
}

export default App;
