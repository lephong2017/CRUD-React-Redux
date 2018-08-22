import * as Types from './../constants/ActionType';
import callApi from '../../../utils/CallAPI/apiCaller';

export const actFetchCategoryCustomerOrdersRequest = () => {
    return (dispatch) => {
        return callApi('CustomerOrders/getAllCustomerOrders', 'GET', null).then(res => {
            dispatch(actFetchCategoryCustomerOrders(res.data));
        });
    }
};
export const actFetchCategoryCustomerOrders = (category) => {
    return {
        type: Types.FETCH_CATEGORYS,
        category
    }
};