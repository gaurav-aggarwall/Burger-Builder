import React from 'react';
import HOC from '../../../hocomponents/HOC';
import Button from "../../UI/Button/Button"; 

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
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong> </p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.purchaseCont}>Continue</Button>
        </HOC>
    )
};

export default OrderSummary;