import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Ingredient.css'

class Ingredient extends Component{
    render(){
        let ingredients = null;

    switch(this.props.type){
        case('bread-top'):
            ingredients = (
                <div className="BreadTop">
                    <div className="Seeds1"></div>             
                    <div className="Seeds2"></div>             
                </div>
            );
            break;
         
        case('bread-bottom'):
            ingredients = <div className="BreadBottom"></div>;
            break;

        case('salad'):
            ingredients = <div className="Salad"></div>;
            break;
            
        case('cheese'):
            ingredients = <div className="Cheese"></div>;
            break;

        case('patty'):
            ingredients = <div className="Patty"></div>;
            break;
            
        case('bacon'):
            ingredients = <div className="Bacon"></div>;
            break;
        }

        // default:
        //     ingredients = null;

    return ingredients;
    }
}

Ingredient.PropTypes={
    type: PropTypes.string.isRequired
}

export default Ingredient;