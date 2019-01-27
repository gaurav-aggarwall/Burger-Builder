import * as actionTypes from './actionTypes';

export const addIngredient = type =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientType: type
    };
}; 

export const delIngredient = type =>{
    return{
        type: actionTypes.DEL_INGREDIENT,
        ingredientType: type
    };
}; 

