import * as Types from './../constants/ActionType';
import callApi from '../../../utils/CallAPI/apiCaller';

export const actFetchCategoryProductRequest = () => {
    return (dispatch) => {
        return callApi('RefProductCategories/getAllRefProductCategories', 'GET', null).then(res => {
            dispatch(actFetchCategoryProduct(res.data));
        });
    }
};
export const actFetchCategoryProduct = (category) => {
    return {
        type: Types.FETCH_CATEGORYS,
        category
    }
};