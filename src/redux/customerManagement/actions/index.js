import * as Types from 'redux/customerManagement/constants/ActionType';
import callApi from 'utils/CallAPI/apiCaller';

export const actFetchCustomerRequest = (pageSize,pageIndex,StringFilter) => {
    var total =0;
    callApi(`/Customer/CountCustomerFilter/${StringFilter}/false`, 'GET', null).then(res => {
        total = res.data;
    });

    return (dispatch) => {
        dispatch(actFetching(true));
        return callApi(`Customer/FilterCustomer/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
            dispatch(actFetchCustomer(res.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    } 
};

export const actFetchCustomer = (Customer,pageIndex,pageSize,totalData) => {
    return {
        type: Types.FETCH_CUSTOMERS,
        Customer,
        pageIndex,
        pageSize,
        totalData
    }
};
export const actFetchCustomerFilter = (Customer,pageSize,pageIndex,totalData) => {
    return {
        type: Types.FETCH_CUSTOMERS_FILTER,
        Customer,
        pageSize,
        pageIndex,
        totalData
    }
};
export const actFetching = (isFetching) => {
    return {
        type: Types.IS_FETCHING_CUSTOMER,
       isFetching
    }
};


export const searchCustomerRequest = (pageSize,pageNow,keywork) => {
    console.log(keywork+" is search with word ");
    var total =0;
    callApi(`/Customer/CountCustomerFilter/${keywork}/true`, 'GET', null).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApi(`/Customer/FilterCustomer/${pageSize}/${pageNow}/${keywork}`, 'GET', null).then(res => {
            dispatch(actFetchCustomerFilter(res.data,pageSize,pageNow,total));
            dispatch(actFetching(false));
        });
    }
};

export const actAddCustomerRequest = (Customer) => {
    return (dispatch) => {
        return callApi('Customer/createCustomer', 'POST', Customer).then(res => {
            console.log(res.data);
            if(res.data===true){
                dispatch(actAddCustomer(Customer));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddCustomer = (Customer) => {
    return {
        type: Types.ADD_CUSTOMER,
        Customer
    }
}

export const actUpdateCustomerRequest = (Customer,pageIndex,pageSize,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApi(`Customer/editCustomer/id?id=${Customer.customerId}`, 'PUT', Customer).then(res => {
            console.log("edit is: "+res.data);
            var total =0;
            callApi(`/Customer/CountCustomerFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApi(`Customer/FilterCustomer/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter==="ALL"||StringFilter===0){
                    dispatch(actFetchCustomer(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchCustomerFilter(res.data,pageSize,pageIndex,total));
                }
            });
        });
    }
}

export const actUpdateCustomer = (Customer) => {
    return {
        type: Types.UPDATE_CUSTOMER,
        Customer
    }
}

export const actDeleteCustomerRequest = (id,pageSize,pageIndex,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApi(`Customer/deleteCustomer?id=${id}`, 'DELETE', null).then(res => {
            var total =0;
            callApi(`/Customer/CountCustomerFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApi(`Customer/FilterCustomer/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter===0||StringFilter==="ALL"){
                    dispatch(actFetchCustomer(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchCustomerFilter(res.data,pageSize,pageIndex,total));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
};

export const actDeleteCustomer = (id) => {
    return {
        type: Types.DELETE_CUSTOMER,
        id
    }
}

export const actGetCustomerRequest = (id) => {
    return dispatch => {
        return callApi(`Customer/getFindIDCustomer/id?id=${id}`, 'GET', null).then(res => {
            console.log(res.data);
            dispatch(actGetCustomer(res.data));
        });
    }
}

export const actGetCustomer = (Customer) => {
    return {
        type : Types.EDIT_CUSTOMER,
        Customer
    }
}


