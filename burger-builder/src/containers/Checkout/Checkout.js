import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state={
        ingredients: {
            salad: 1,
            tomato: 1,
            patty: 1,
            cheese: 1
        }
    };

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
            </div>
        );
    }
}

export default Checkout;