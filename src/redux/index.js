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

const appReducers = combineReducers({
    products,
    itemEditing,
    categorys,
    saveCateCode,
    totalData,
    isFetching,
    
    categorys_index,
    isFetchingCategory,
    itemCateEditing,

    customer,
    isFetchingCustomer,
    itemCustomerEditing,
});

export default appReducers;