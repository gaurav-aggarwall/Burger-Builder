import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import HOC from '../../hocomponents/HOC';
import OrderSummary from '../../components/Burger/Order Summary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hocomponents/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../store/action';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    tomato: 0.7,
    patty: 1.5,
    cheese: 1.1
}

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        
        this.state={
            // ingredients: {
            //     salad: 0,
            //     tomato: 0,
            //     patty: 0,
            //     cheese: 0
            // },
            totalPrice: 4,
            purchaseable: false,
            ordering: false, 
            loading: false
        }

        this.addIngredient = this.addIngredient.bind(this);
        this.delIngredient = this.delIngredient.bind(this);
        this.ordering = this.ordering.bind(this);
        this.ContinueHandler = this.ContinueHandler.bind(this);
        this.Cancelhandler = this.Cancelhandler.bind(this);
    }

    addIngredient(type){
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const ing = {
            ...this.state.ingredients
        };
        ing[type]=newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: ing,
            totalPrice: newPrice,
            purchaseable: true
        });
    };

    delIngredient(type){
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const newCount = oldCount - 1;    
        const ing = {
            ...this.state.ingredients
        };
        ing[type]=newCount;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENTS_PRICES[type];
        const purchaseable = newPrice > 4;   

        this.setState({
            ingredients: ing,
            totalPrice: newPrice,
            purchaseable: purchaseable
        });
    };

    ordering(){
        this.setState({ordering: true});
    }

    Cancelhandler(){
        this.setState({ordering: false})
    }

    ContinueHandler(){
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disabledInfo ={
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }

        let orderSpace;

        if(this.state.loading){
            orderSpace = <Spinner />;
        }
        else{
            orderSpace = <OrderSummary 
                            ingredients={this.props.ings}
                            purchaseCanceled={this.Cancelhandler}
                            purchaseCont={this.ContinueHandler}
                            totalPrice={this.state.totalPrice}
                        />;
        }
        
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
                    price = {this.state.totalPrice}
                    purchaseable = {this.state.purchaseable}
                    Ordering = {this.ordering}
                />
            </HOC>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
};

const mapDispatchToProps = dispatch => {
    return {
        ingredientAdded: (ingType) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientType: ingType}),
        ingredientDeleted: (ingType) => dispatch({type: actionTypes.DEL_INGREDIENT, ingredientType: ingType})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));