import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import HOC from '../../hocomponents/HOC';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    tomato: 0.9,
    patty: 1.5,
    cheese: 1
}

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        
        this.state={
            ingredients: {
                salad: 0,
                tomato: 0,
                patty: 0,
                cheese: 0
            },
            totalPrice: 4
        }

        this.addIngredient = this.addIngredient.bind(this);
        this.delIngredient = this.delIngredient.bind(this);
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
            totalPrice: newPrice
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

        this.setState({
            ingredients: ing,
            totalPrice: newPrice
        });
    };

    render(){
        const disabledInfo ={
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0
        }
        return(
            <HOC>
                <Burger ingredients = {this.state.ingredients} /> 
                <Controls 
                    ingAdder = {this.addIngredient} 
                    ingDeleter = {this.delIngredient}
                    disable = {disabledInfo}
                />
            </HOC>
        );
    };
}

export default BurgerBuilder;