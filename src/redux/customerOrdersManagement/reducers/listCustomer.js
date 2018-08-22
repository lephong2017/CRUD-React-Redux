import * as Types from './../constants/ActionType';

var initialState = [];

const ListCustomer = (state = initialState, action) => {
    switch (action.type) {
        case Types.FETCH_CUSTOMER_LIST:
            return [...action.listCustomer];
        
        default: return [...state];
    }
};


export default ListCustomer;