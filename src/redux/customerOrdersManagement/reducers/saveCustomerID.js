import * as Types from './../constants/ActionType';
var initialState = 'null';

const saveCustomerID = (state = initialState, action) => {
    switch(action.type){
        case Types.SAVE_CUSTOMER_ORDER_CODE:
            return action.CustomerOrders;
        default :
            return state;
    }
}

export default saveCustomerID;