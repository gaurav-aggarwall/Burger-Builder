import React from 'react';
import Ingredient from './Ingredient/Ingredient';

import './Burger.css';

const Burger = props => {
    return(
        <div className='Burger'>
            <Ingredient type='bread-top'></Ingredient>
            <Ingredient type='cheese'></Ingredient>
            <Ingredient type='salad'></Ingredient>
            <Ingredient type='patty'></Ingredient>
            <Ingredient type='bacon'></Ingredient>
            <Ingredient type='bread-bottom'></Ingredient>
        </div>
    )
};

export default Burger;