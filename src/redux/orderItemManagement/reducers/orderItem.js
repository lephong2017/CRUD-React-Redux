import * as Types from 'redux/orderItemManagement/constants/ActionType';

var catesData = [];
const products = (state = catesData, action) => {
    var index = -1;
    switch (action.type) {
        case Types.FETCH_ORDER_ITEM:
            // console.log(state);
            return [...action.OrderItem];
        case Types.ADD_ORDER_ITEM:
            var arr = [...state];
            arr.push(action.OrderItem); 
            return [...arr];
        case Types.UPDATE_ORDER_ITEM:
            index = findIndex(state, action.OrderItem.orderId,action.OrderItem.productId);
            var orderItem = {
                status:'true',
                orderId:action.OrderItem.orderId,
                productId:action.OrderItem.productId,
                quantity:action.OrderItem.quantity
            }
            state[index] = orderItem;
            return [...state];
        case Types.DELETE_ORDER_ITEM:
            index = findIndex(state, action.orderId,action.productId);
            return state.filter((e,i)=> i !== index);
        default: return [...state];
        }
};

    var findIndex = (order, orderId,productId) => {
        var result = -1;
        order.forEach((o, index) => {
            if (o.orderId === orderId&&o.productId===productId) {
                result = index;
            }
        });
        return result;
    }

    export default products;



