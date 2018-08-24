import * as Types from 'redux/orderItemManagement/constants/ActionType';
var initialState = {};

const orderItemEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_ORDER_ITEM:
            return action.OrderItem;
        default :
            return state;
    }
}

export default orderItemEditing;