import * as Types from 'redux/productManagement/constants/ActionType';
import callApi from 'utils/CallAPI/apiCaller';

export const actFetchProductsRequest = (pageSize,pageIndex,StringFilter) => {
    var total =0;
    callApi(`/Product/CountProductFilter/${StringFilter}/false`, 'GET', null).then(res => {
        total = res.data;
    });

    return (dispatch) => {
        dispatch(actFetching(true));
        return callApi(`Product/FilterProduct/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
            dispatch(actFetchProducts(res.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    } 
};

export const actFetchProducts = (products,pageIndex,pageSize,totalData) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products,
        pageIndex,
        pageSize,
        totalData
    }
};
export const actFetchProductsFilter = (products,pageSize,pageIndex,totalData) => {
    return {
        type: Types.FETCH_PRODUCTS_FILTER,
        products,
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


export const searchProductRequest = (pageSize,pageNow,keywork) => {
    var total =0;
    callApi(`/Product/CountProductFilter/${keywork}/true`, 'GET', null).then(res => {
        total = res.data;
        // console.log(total+" ok my god");
    });
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApi(`/Product/FilterProduct/${pageSize}/${pageNow}/${keywork}`, 'GET', null).then(res => {
            // console.log(pageNow+" size: "+pageSize+" index.js");
            // console.log(total+" ok my god");
            dispatch(actFetchProductsFilter(res.data,pageSize,pageNow,total));
            dispatch(actFetching(false));
        });
    }
};

export const getTotalProduct = (StringFilter,Condition) => {
    return (dispatch) => {
        return callApi(`/Product/CountProductFilter/${StringFilter}/${Condition}`, 'GET', null).then(res => {
            dispatch(actGetTotalData(res.data));
        });
    }
};

export const actGetTotalData = (count) => {
    return {
        type: Types.TOTAL_PRODUCTS,
        count
    }
};

export const searchProduct = (products) => {
    return {
        type: Types.SEARCH_PRODUCTS,
        products
    }
};


export const actAddProductRequest = (product) => {
    return (dispatch) => {
        return callApi('Product/createProduct', 'POST', product).then(res => {
            console.log(res.data);
            if(res.data===true){
                dispatch(actAddProduct(product));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product
    }
}

export const actUpdateProductRequest = (product,pageIndex,pageSize,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApi(`Product/editProduct/id?id=${product.productId}`, 'PUT', product).then(res => {
            var total =0;
            callApi(`/Product/CountProductFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApi(`Product/FilterProduct/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter==="ALL"||StringFilter===0){
                    dispatch(actFetchProducts(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchProductsFilter(res.data,pageSize,pageIndex,total));
                }
            
            });
        });
    }
}

export const actUpdateProduct = (product) => {
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}

export const actDeleteProductRequest = (id,pageSize,pageIndex,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApi(`Product/deleteProduct?id=${id}`, 'DELETE', null).then(res => {
            var total =0;
            callApi(`/Product/CountProductFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApi(`Product/FilterProduct/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter===0||StringFilter==="ALL"){
                    dispatch(actFetchProducts(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchProductsFilter(res.data,pageSize,pageIndex,total));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
};

export const actDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}

export const actGetProductRequest = (id) => {
    return dispatch => {
        return callApi(`Product/getFindIDProduct/id?id=${id}`, 'GET', null).then(res => {
            dispatch(actGetProduct(res.data))
        });
    }
}

export const actGetProduct = (product) => {
    return {
        type : Types.EDIT_PRODUCT,
        product
    }
}
export const actSaveCateCode = (cateCode) => {
    return {
        type : Types.SAVE_CATE_CODE,
        cateCode
    }
}

export const actGetProductRequestByCateID = (id,pageIndex,pageSize) => {
    return (dispatch) => {
        var total =0;
        callApi(`/Product/CountProductFilter/${id}/false`, 'GET', null).then(res => {
            total = res.data;
        });
        if(id==="all-cate"){
            return callApi(`Product/FilterProduct/${pageSize}/${pageIndex}/ALL`, 'GET', null).then(res => {
                dispatch(actSaveCateCode('null'));
                dispatch(actFetchProducts(res.data,pageIndex,pageSize,total));
            });
        }else{
            return callApi(`Product/FilterProduct/${pageSize}/${pageIndex}/${id}`, 'GET', null).then(res => {
                dispatch(actSaveCateCode(id));
                dispatch(searchProductRequest(pageSize,pageIndex,id));
            });
        } 
    }
}

export const actGetProductByCateId = (product,id) => {
    return {
        type : Types.FIND_PRODUCT_BY_CATEID,
        product,
        id
    }
}