import * as actionTypes from './action';

const initialState = {
    ingredients: {
        salad: 0,
        tomato: 0,
        patty: 0,
        cheese: 0
    },
    totalPrice: 4,
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                }
            };

        case actionTypes.DEL_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                }
        };    

        default:
            return state;    
    }
};

export default reducer;