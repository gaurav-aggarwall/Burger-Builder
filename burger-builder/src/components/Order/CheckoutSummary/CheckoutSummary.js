import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './CheckoutSummary.css';

const CheckoutSummary = props =>{
    return(
        <div className="CheckoutSummary">
            <h1>Hope its Tasty</h1>
            <div id='BurgerOrder'>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutCont}>CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;