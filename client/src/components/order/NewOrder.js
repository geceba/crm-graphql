import React, {Component, Fragment} from 'react';
import DataCustomer from "./DataCustomer";
import { Query } from "react-apollo";
import { GET_PRODUCTS} from "../../queries";
import ContentOrder from "./ContentOrder";
class NewOrder extends Component {
    render() {
        const { id } = this.props.match.params;
        return(
            <Fragment>
                <h1 className={"text-center mb-5"}>Nuevo Pedido</h1>
                <div className={"row"}>
                    <div className={"col-md-3"}>
                        <DataCustomer id={id}/>
                    </div>
                    <div className={"col-md-9"}>
                        <Query query={GET_PRODUCTS}>
                            {({ loading, error, data }) => {
                                if(loading) return (
                                    <div className="spinner">
                                        <div className="double-bounce1"></div>
                                        <div className="double-bounce2"></div>
                                    </div>
                                )

                                if(error) return `Error ${error.message}`;

                                return (
                                    <ContentOrder
                                        order={data.getProductos}
                                        id={id}
                                    />
                                )
                            }}
                        </Query>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default NewOrder;