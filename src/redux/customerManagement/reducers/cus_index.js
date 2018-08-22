import * as Types from 'redux/customerManagement/constants/ActionType';

var arr =[]
var customerData = [];
const products = (state = customerData, action) => {
    var { product } = action;
    var index = -1;
    var arrTemp=[];
    switch (action.type) {
        case Types.FETCH_CUSTOMERS:
            var sumTotal = action.totalData;
             arrTemp = new Array(sumTotal);
            arrTemp.fill(0);
            var pageId=action.pageIndex;
            if(pageId===1){
                for (let i = 0; i < action.Customer.length; i++) {
                    arrTemp[i]=action.Customer[i];
                } 
                arr=arrTemp; 
                return arrTemp;
            }
            var pageSize = action.pageSize;
            for (var i = 0; i < action.Customer.length; i++) {
               arr[(pageId-1)*pageSize+i]=action.Customer[i];
            }
            return arr;
        case Types.FETCH_CUSTOMERS_FILTER:
            var sumData = action.totalData;
            // console.log(sumData+" is total data filter");
             arrTemp = new Array(sumData);
            arrTemp.fill(0);
            if(action.pageIndex===1){
                for (let i = 0; i < action.Customer.length; i++) {
                    arrTemp[i]=action.Customer[i];
                }
                customerData=arrTemp;
                return customerData;
            } 
            for (let i = 0; i < action.Customer.length; i++) {
                customerData[(action.pageIndex-1)*action.pageSize+i]=action.Customer[i];
                
            }
            //copy productData vao arrTemp sau do gan lai cho productData
            return customerData;
        case Types.UPDATE_CUSTOMER:
            arr=[];
            customerData=[];
            index = findIndex(state, product.productId);
            state[index] = product;
            return [...state];
        case Types.DELETE_CUSTOMER:
            return [...arr];
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

    export default products;



