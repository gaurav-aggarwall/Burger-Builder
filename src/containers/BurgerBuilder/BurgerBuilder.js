import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import HOC from '../../hocomponents/HOC';
import OrderSummary from '../../components/Burger/Order Summary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios';
import ErrorHandler from '../../hocomponents/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component{
    state={
        ordering: false, 
    } 

    ordering = () => {
        this.setState({ordering: true});
    }

    Cancelhandler = () => {
        this.setState({ordering: false})
    }

    ContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo ={
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }

        let orderSpace = <OrderSummary 
                            ingredients={this.props.ings}
                            purchaseCanceled={this.Cancelhandler}
                            purchaseCont={this.ContinueHandler}
                            totalPrice={this.props.price}
                        />;
        
        
        return(
            <HOC>
                <Modal show={this.state.ordering} modalClosed={this.Cancelhandler}>
                    {orderSpace}
                </Modal>
                <Burger ingredients = {this.props.ings} /> 
                <Controls 
                    ingAdder = {this.props.ingredientAdded} 
                    ingDeleter = {this.props.ingredientDeleted}
                    disable = {disabledInfo}
                    price = {this.props.price}
                    purchaseable = {this.props.orderNowBtn}
                    Ordering = {this.ordering}
                />
            </HOC>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        orderNowBtn: state.burgerBuilder.purchaseable
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ingredientAdded: (ingType) => dispatch(actions.addIngredient(ingType)),
        ingredientDeleted: (ingType) => dispatch(actions.delIngredient(ingType)),
        onPurchaseInit: () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));