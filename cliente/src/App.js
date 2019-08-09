import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import Customers from './components/Customers';
import NewCustomer from './components/NewCustomer';
import EditCustomer from './components/EditCustomer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import components
import Header from './components/Header';

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
              <Route exact path="/" component={Customers} />
              <Route exact path="/customer/edit/:id" component={EditCustomer} />
              <Route exact path="/customer/new" component={NewCustomer} />
            </Switch>
					</div>
				</Fragment>
			</Router>
		</ApolloProvider>
	);
}

export default App;
