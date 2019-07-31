import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { CUSTOMERS_QUERY } from '../queries';

const Customers = () => (
 <Query query={CUSTOMERS_QUERY}>
     {({ loading, error, data }) => {
         if (loading) return "Loading...";
         if (error) return `Error: ${error.message}`

         return (
             <h2 className="text-center">List of costumers</h2>
         )
     }}

 </Query>
);

export default Customers;