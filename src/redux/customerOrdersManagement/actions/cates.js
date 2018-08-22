import * as Types from './../constants/ActionType';
import callApi from '../../../utils/CallAPI/apiCaller';

export const actFetchListCustomerOrdersRequest = () => {
    return (dispatch) => {
        return callApi('Customer/getAllCustomer', 'GET', null).then(res => {
            dispatch(actFetchListCustomerOrders(res.data));
        });
    }
};
export const actFetchListCustomerOrders = (listCustomer) => {
    return {
        type: Types.FETCH_CUSTOMER_LIST,
        listCustomer
    }
};