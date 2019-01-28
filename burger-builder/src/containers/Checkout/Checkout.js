import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';

class Checkout extends Component{

    checkoutCancelHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContHandler = () =>{
        this.props.history.push('/checkout/contact');
    }

    render(){
        let summary = <Redirect to = "/" />
        if ( this.props.ings ) {
            const purchasedRedirect = this.props.didPurchased ? <Redirect to = "/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings} 
                        checkoutCancel= {this.checkoutCancelHandler}
                        checkoutCont= {this.checkoutContHandler}/>
                    <Route
                        path={this.props.match.path + '/contact'}
                        component={Contact} />
                </div>
            );
        }
        return summary;
    }    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        didPurchased: state.orders.purchased
    }
};

export default connect(mapStateToProps)(Checkout);