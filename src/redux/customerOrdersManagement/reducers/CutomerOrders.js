import * as Types from 'redux/customerOrdersManagement/constants/ActionType';

var arr =[]
var customerOrdersData = [];
const CustomerOrders = (state = customerOrdersData, action) => {
    var { customerOrders, id } = action;
    var index = -1;
    var arrTemp=[];
    switch (action.type) {
        case Types.FETCH_CUSTOMER_ORDERS:
            var sumTotal = action.totalData;
             arrTemp = new Array(sumTotal);
            arrTemp.fill(0);
            var pageId=action.pageIndex;
            if(pageId===1){
                for (let i = 0; i < action.CustomerOrders.length; i++) {
                    arrTemp[i]=action.CustomerOrders[i];
                } 
                arr=arrTemp; 
                return arrTemp;
            }
            var pageSize = action.pageSize;
            for (var i = 0; i < action.CustomerOrders.length; i++) {
               arr[(pageId-1)*pageSize+i]=action.CustomerOrders[i];
            }
            return arr;
        case Types.FETCH_CUSTOMER_ORDERS_FILTER:
            var sumData = action.totalData;
            // console.log(sumData+" is total data filter");
             arrTemp = new Array(sumData);
            arrTemp.fill(0);
            if(action.pageIndex===1){
                for (let i = 0; i < action.CustomerOrders.length; i++) {
                    arrTemp[i]=action.CustomerOrders[i];
                }
                customerOrdersData=arrTemp;
                return customerOrdersData;
            } 
            for (let i = 0; i < action.CustomerOrders.length; i++) {
                customerOrdersData[(action.pageIndex-1)*action.pageSize+i]=action.CustomerOrders[i];
                
            }
            //copy productData vao arrTemp sau do gan lai cho productData
            return customerOrdersData;
        case Types.SEARCH_CUSTOMER_ORDERS:
            var objPageData={
                isFetchData:true,
                data:[...action.CutomerOrders],
            }
            customerOrdersData.set(action.pageIndex,objPageData);
            return customerOrdersData;
        case Types.FETCH_ALL_CUSTOMER_ORDERS:
            return [...action.CustomerOrders];
        case Types.FILTER_CUSTOMER_ORDER:
            return [...customerOrdersData];
        case Types.ADD_CUSTOMER_ORDER:
            arr=[];
            customerOrdersData=[];
            state.push(action.CustomerOrders);
            return [...state];
        case Types.UPDATE_CUSTOMER_ORDER:
            arr=[];
            customerOrdersData=[];
            index = findIndex(state, customerOrders.productId);
            state[index] = customerOrders;
            return [...state];
        case Types.DELETE_CUSTOMER_ORDER:
            return [...arr];
        case Types.FIND_CUSTOMER_ORDER_BY_CATEID:
            var arrPositionProductByCateID = findIndexCate(action.product,id);
            var arrProductByCate=[];
            arrPositionProductByCateID.forEach((posProduct,index)=>{
                arrProductByCate[index]=action.product[posProduct];
            });
            return arrProductByCate;
        default: return [...state];
        }
    };

var findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product.productId === id) {
            result = index;
        }
    });
    return result;
}

var findIndexCate = (products, id) => {
    var result = [];
    products.forEach((product, index) => {
        if (product.productCategoryCode === id) {
            result.push(index);
        }
    });
    return result;
}
export default CustomerOrders;



