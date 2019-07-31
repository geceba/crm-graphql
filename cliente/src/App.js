import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Customers from './components/Customers';

// import components
import Header from './components/Header';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	onError: ({ networkError, graphqlErrors }) => {
		console.log('graphQLErrors', graphqlErrors);
		console.log('network errors', networkError);
	}
});


function App() {
	return (
		<ApolloProvider client={client}>
			<Header/>
      <Customers/>
		</ApolloProvider>
	);
}

export default App;
