import * as Types from 'redux/customerOrdersManagement/constants/ActionType';
import callApi from 'utils/CallAPI/apiCaller';

export const actFetchCustomerOrdersRequest = (pageSize,pageIndex,StringFilter) => {
    var total =0;
    callApi(`/CustomerOrders/CountCustomerOrdersFilter/${StringFilter}/false`, 'GET', null).then(res => {
        total = res.data;
    });

    return (dispatch) => {
        dispatch(actFetching(true));
        return callApi(`CustomerOrders/FilterCustomerOrders/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
            dispatch(actFetchCustomerOrders(res.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    } 
};

export const actFetchCustomerOrders = (CustomerOrders,pageIndex,pageSize,totalData) => {
    return {
        type: Types.FETCH_CustomerOrders,
        CustomerOrders,
        pageIndex,
        pageSize,
        totalData
    }
};
export const actFetchCustomerOrdersFilter = (CustomerOrders,pageSize,pageIndex,totalData) => {
    return {
        type: Types.FETCH_CustomerOrders_FILTER,
        CustomerOrders,
        pageSize,
        pageIndex,
        totalData
    }
};
export const actFetching = (isFetching) => {
    return {
        type: Types.IS_FETCHING,
       isFetching
    }
};


export const searchCustomerOrdersRequest = (pageSize,pageNow,keywork) => {
    var total =0;
    callApi(`/CustomerOrders/CountCustomerOrdersFilter/${keywork}/true`, 'GET', null).then(res => {
        total = res.data;
        // console.log(total+" ok my god");
    });
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApi(`/CustomerOrders/FilterCustomerOrders/${pageSize}/${pageNow}/${keywork}`, 'GET', null).then(res => {
            // console.log(pageNow+" size: "+pageSize+" index.js");
            // console.log(total+" ok my god");
            dispatch(actFetchCustomerOrdersFilter(res.data,pageSize,pageNow,total));
            dispatch(actFetching(false));
        });
    }
};

export const getTotalCustomerOrders = (StringFilter,Condition) => {
    return (dispatch) => {
        return callApi(`/CustomerOrders/CountCustomerOrdersFilter/${StringFilter}/${Condition}`, 'GET', null).then(res => {
            dispatch(actGetTotalData(res.data));
        });
    }
};

export const actGetTotalData = (count) => {
    return {
        type: Types.TOTAL_CustomerOrders,
        count
    }
};

export const searchCustomerOrders = (CustomerOrders) => {
    return {
        type: Types.SEARCH_CustomerOrders,
        CustomerOrders
    }
};


export const actAddCustomerOrdersRequest = (CustomerOrders) => {
    return (dispatch) => {
        return callApi('CustomerOrders/createCustomerOrders', 'POST', CustomerOrders).then(res => {
            console.log(res.data);
            if(res.data===true){
                dispatch(actAddCustomerOrders(CustomerOrders));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddCustomerOrders = (CustomerOrders) => {
    return {
        type: Types.ADD_CustomerOrders,
        CustomerOrders
    }
}

export const actUpdateCustomerOrdersRequest = (CustomerOrders,pageIndex,pageSize,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApi(`CustomerOrders/editCustomerOrders/id?id=${CustomerOrders.CustomerOrdersId}`, 'PUT', CustomerOrders).then(res => {
            var total =0;
            callApi(`/CustomerOrders/CountCustomerOrdersFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApi(`CustomerOrders/FilterCustomerOrders/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter==="ALL"||StringFilter===0){
                    dispatch(actFetchCustomerOrders(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchCustomerOrdersFilter(res.data,pageSize,pageIndex,total));
                }
            
            });
        });
    }
}

export const actUpdateCustomerOrders = (CustomerOrders) => {
    return {
        type: Types.UPDATE_CustomerOrders,
        CustomerOrders
    }
}

export const actDeleteCustomerOrdersRequest = (id,pageSize,pageIndex,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApi(`CustomerOrders/deleteCustomerOrders?id=${id}`, 'DELETE', null).then(res => {
            var total =0;
            callApi(`/CustomerOrders/CountCustomerOrdersFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApi(`CustomerOrders/FilterCustomerOrders/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter===0||StringFilter==="ALL"){
                    dispatch(actFetchCustomerOrders(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchCustomerOrdersFilter(res.data,pageSize,pageIndex,total));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
};

export const actDeleteCustomerOrders = (id) => {
    return {
        type: Types.DELETE_CustomerOrders,
        id
    }
}

export const actGetCustomerOrdersRequest = (id) => {
    return dispatch => {
        return callApi(`CustomerOrders/getFindIDCustomerOrders/id?id=${id}`, 'GET', null).then(res => {
            dispatch(actGetCustomerOrders(res.data))
        });
    }
}

export const actGetCustomerOrders = (CustomerOrders) => {
    return {
        type : Types.EDIT_CustomerOrders,
        CustomerOrders
    }
}
export const actSaveCateCode = (cateCode) => {
    return {
        type : Types.SAVE_CATE_CODE,
        cateCode
    }
}

export const actGetCustomerOrdersRequestByCateID = (id,pageIndex,pageSize) => {
    return (dispatch) => {
        var total =0;
        callApi(`/CustomerOrders/CountCustomerOrdersFilter/${id}/false`, 'GET', null).then(res => {
            total = res.data;
        });
        if(id==="all-cate"){
            return callApi(`CustomerOrders/FilterCustomerOrders/${pageSize}/${pageIndex}/ALL`, 'GET', null).then(res => {
                dispatch(actSaveCateCode('null'));
                dispatch(actFetchCustomerOrders(res.data,pageIndex,pageSize,total));
            });
        }else{
            return callApi(`CustomerOrders/FilterCustomerOrders/${pageSize}/${pageIndex}/${id}`, 'GET', null).then(res => {
                dispatch(actSaveCateCode(id));
                dispatch(searchCustomerOrdersRequest(pageSize,pageIndex,id));
            });
        } 
    }
}

export const actGetCustomerOrdersByCateId = (CustomerOrders,id) => {
    return {
        type : Types.FIND_CustomerOrders_BY_CATEID,
        CustomerOrders,
        id
    }
}