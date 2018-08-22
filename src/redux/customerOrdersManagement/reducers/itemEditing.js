import * as Types from './../constants/ActionType';
var initialState = {};

const itemEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_CUSTOMER_ORDER:
            return action.CustomerOrders;
        default :
            return state;
    }
}

export default itemEditing;