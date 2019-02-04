import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        tomato: 0,
        patty: 0,
        cheese: 0
    },
    totalPrice: 4,
    purchaseable: false,
    building: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    tomato: 0.7,
    patty: 1.5,
    cheese: 1.1
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientType],
                purchaseable: true,
                building: true
            };

        case actionTypes.DEL_INGREDIENT:
            let purchase = false;
            if(state.totalPrice - INGREDIENTS_PRICES[action.ingredientType] > 4)
                purchase = true;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientType],
                purchaseable: purchase,
                building: true
        };    

        default:
            return state;    
    }
};

export default reducer;