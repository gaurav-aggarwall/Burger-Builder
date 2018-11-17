import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import HOC from '../../hocomponents/HOC';

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        
        this.state={
            ingredients: {
                salad: 0,
                tomato: 0,
                patty: 0,
                cheese: 0,
            }
        }
    }
    render(){
        return(
            <HOC>
                <Burger ingredients={this.state.ingredients} /> 
                <div>Build Controls</div>
            </HOC>
        );
    }
}

export default BurgerBuilder;