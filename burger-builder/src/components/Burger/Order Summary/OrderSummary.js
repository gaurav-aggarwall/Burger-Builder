import React from 'react';
import HOC from '../../../hocomponents/HOC';

const OrderSummary = props =>{
    const summary = Object.keys(props.ingredients)
        .map(key =>{
            return(<li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>
                {props.ingredients[key]}
                </li>
            )
        })
    return(
        <HOC>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {summary}
            </ul>
            <p>Proceed to Checkout!</p>
        </HOC>
    )
};

export default OrderSummary;