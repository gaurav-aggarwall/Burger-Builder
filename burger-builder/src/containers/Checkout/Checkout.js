import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contact from './Contact/Contact';

class Checkout extends Component{
    state={
        ingredients: {
            salad: 0,
            tomato: 0,
            patty: 0,
            cheese: 0
        }
    };

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        for(let param of query.entries()){
            ingredient[param[0]] = +param[1];
        }
        this.setState({ingredients: ingredient})
    }

    checkoutCancelHandler = () =>{
        this.props.history.goBack();
    }

    checkoutContHandler = () =>{
        this.props.history.push('/checkout/contact');
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancel= {this.checkoutCancelHandler}
                    checkoutCont= {this.checkoutContHandler}/>
                <Route path={this.props.match.path + '/contact'} component={Contact}/>    
            </div>
        );
    }
}

export default Checkout;