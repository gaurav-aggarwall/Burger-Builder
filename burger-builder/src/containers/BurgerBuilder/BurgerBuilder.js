import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import HOC from '../../hocomponents/HOC';

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        
        this.state={
            ingredients: {
                salad: 1,
                tomato: 1,
                patty: 1,
                cheese: 1,
            }
        }
    }
    render(){
        return(
            <HOC>
                <Burger ingredients={this.state.ingredients} /> 
                <Controls />
            </HOC>
        );
    }
}

export default BurgerBuilder;