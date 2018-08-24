import { combineReducers } from 'redux';
import products from './productManagement/reducers/products';
import itemEditing from './productManagement/reducers/itemEditing';
import categorys from './productManagement/reducers/cates';
import saveCateCode from './productManagement/reducers/saveCateCode';
import totalData from './productManagement/reducers/TotalData';
import isFetching from './productManagement/reducers/isFetching';


import categorys_index from './categoryManagement/reducers/cate_index';
import isFetchingCategory from './categoryManagement/reducers/isFetching';
import itemCateEditing from './categoryManagement/reducers/itemCateEditing';

import customer from './customerManagement/reducers/cus_index';
import isFetchingCustomer from './customerManagement/reducers/isFetching';
import itemCustomerEditing from './customerManagement/reducers/itemCustomerEditing';

import order from './customerOrdersManagement/reducers/CutomerOrders';
import isFetchingOrder from './customerOrdersManagement/reducers/isFetching';
import itemOrderEditing from './customerOrdersManagement/reducers/itemEditing';
import saveCustomerID from './customerOrdersManagement/reducers/saveCustomerID';
import listCustomer from './customerOrdersManagement/reducers/listCustomer';

import isOrderItemEditing from './orderItemManagement/reducers/itemOrderEditing';
import orderItem from './orderItemManagement/reducers/orderItem';

const appReducers = combineReducers({
    products,itemEditing,categorys,saveCateCode,totalData,isFetching,
    
    categorys_index,isFetchingCategory,itemCateEditing,

    customer,isFetchingCustomer,itemCustomerEditing,

    order,isFetchingOrder,itemOrderEditing,saveCustomerID,listCustomer,

    isOrderItemEditing,orderItem
});

export default appReducers;