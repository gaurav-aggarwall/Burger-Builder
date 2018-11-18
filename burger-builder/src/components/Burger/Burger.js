import React from 'react';
import Ingredient from './Ingredient/Ingredient';

import './Burger.css';

const Burger = props => {
    let ingredientsArray = Object.keys(props.ingredients)
    .map( igkey => {
        return [...Array(props.ingredients[igkey])].map((_,i) =>{
            return<Ingredient key={igkey+1} type={igkey} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el); 
    },[]);

    if(ingredientsArray.length===0)
        ingredientsArray = <p>Please start adding ingredients!</p>;
        
    return(
        <div className='Burger'>
            <Ingredient type='bread-top'></Ingredient>
            {ingredientsArray}
            <Ingredient type='bread-bottom'></Ingredient>
        </div>
    )
};

export default Burger;