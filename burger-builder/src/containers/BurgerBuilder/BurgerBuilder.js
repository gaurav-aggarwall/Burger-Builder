import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import HOC from '../../hocomponents/HOC';

class BurgerBuilder extends Component{
    render(){
        return(
            <HOC>
                <Burger/> 
                <div>Build Controls</div>
            </HOC>
        );
    }
}

export default BurgerBuilder;