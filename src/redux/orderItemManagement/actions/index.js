import * as Types from 'redux/orderItemManagement/constants/ActionType';
import callApi from 'utils/CallAPI/apiCaller';

export const actFetchOrderItemRequest = (filter) => {
    return (dispatch) => {
        return callApi(`OrderItem/getAllOrderItem/oderId?oderId=${filter}`, 'GET', null).then(res => {
            dispatch(actFetchOrderItem(res.data ));
        });
    } 
};
export const actFetchOrderItem = (OrderItem ) => {
    return {
        type: Types.FETCH_ORDER_ITEM,
        OrderItem,
    }
};


export const actAddOrderItemRequest = (OrderItem) => {
    return (dispatch) => {
        return callApi('OrderItem/createOrderItem', 'POST', OrderItem).then(res => {
            console.log(res.data+" add order item");
            if(res.data===true){
                dispatch(actAddOrderItem(OrderItem));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddOrderItem = (OrderItem) => {
    return {
        type: Types.ADD_ORDER_ITEM,
        OrderItem
    }
}

export const actUpdateOrderItemRequest = (OrderItem) => {
    return (dispatch) => {
        return callApi(`OrderItem/editOrderItem/orderId/productId/quantity/productChange?orderId=${OrderItem.orderId}&productId=${OrderItem.productId}&quantity=${OrderItem.quantity}&productChange=${OrderItem.productChange}`, 'PUT', OrderItem).then(res => {
                    dispatch(actUpdateOrderItem(OrderItem));
            });
    }
}

export const actUpdateOrderItem = (OrderItem) => {
    return {
        type: Types.UPDATE_ORDER_ITEM,
        OrderItem
    }
}

export const actDeleteOrderItemRequest = (orderId,productId) => {
    return (dispatch) => {
        return callApi(`OrderItem/deleteOrderItem/orderId/productId?orderId=${orderId}&productId=${productId}`, 'DELETE', null).then(res => {
        // return callApi(`OrderItem/deleteOrderItem/${orderId}/${productId}`, 'DELETE', null).then(res => {
                    dispatch(actDeleteOrderItem(orderId,productId));
        }).catch(err => {
            console.log(err);
        });
    }
};

export const actDeleteOrderItem = (orderId,productId) => {
    return {
        type: Types.DELETE_ORDER_ITEM,
        orderId,
        productId
    }
}

export const actGetOrderItemRequest = (orderId,productId) => {
    return dispatch => {
        return callApi(`OrderItem/getFindIDOrderItem/${orderId}/${productId}`, 'GET', null).then(res => {
            dispatch(actGetOrderItem(res.data));
        });
    }
}

export const actGetOrderItem = (orderItem) => {
    return {
        type : Types.EDIT_ORDER_ITEM,
        orderItem
    }
}


