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

});

export default appReducers;