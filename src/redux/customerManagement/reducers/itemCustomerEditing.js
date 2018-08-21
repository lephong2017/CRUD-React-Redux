import * as Types from 'redux/customerManagement/constants/ActionType';
var initialState = {};

const itemEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_CUSTOMER:
            return action.Customer;
        default :
            return state;
    }
}

export default itemEditing;