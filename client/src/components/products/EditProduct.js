import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { GET_PRODUCT } from './../../queries';
import FormEdit from './FormEdit';

class EditProduct extends Component {
    state = {  }
    render() { 
        // tomar el id para editar
        const { id } = this.props.match.params;
        return ( 
            <Fragment>
                <h1 className="text-center">Editar producto</h1>
                <div className="row justify-content-center">
                    <Query query={GET_PRODUCT} variables={{id}}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return 'Cargando...'
                            if(error) return `Error ${error.message}`;

                            return (
                                <FormEdit
                                    producto={data}
                                    id={id}
                                    refetch={refetch}
                                />
                            );
                        }}
                    </Query>
                </div>
            </Fragment>
         );
    }
}
 
export default EditProduct;