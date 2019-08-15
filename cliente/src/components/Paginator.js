import React, { Component } from 'react'
class Paginator extends Component {
    state = {  }
    render() { 
        const { actual } = this.props;
        const btnAnterior = (actual > 1) ? <button className="btn btn-success mr-2">&laquo; Anterior</button> : '';
        return ( 
            <div className="mt-5 d-flex justify-content-center">
                {btnAnterior}
            </div>
         );
    }
}
 
export default Paginator;