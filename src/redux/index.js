import { combineReducers } from 'redux';
import products from './productManagement/reducers/products';
import itemEditing from './productManagement/reducers/itemEditing';
import categorys from './productManagement/reducers/cates';
import saveCateCode from './productManagement/reducers/saveCateCode';
import totalData from './productManagement/reducers/TotalData';
import isFetching from './productManagement/reducers/isFetching';
const appReducers = combineReducers({
    products,
    itemEditing,
    categorys,
    saveCateCode,
    totalData,
    isFetching
});

export default appReducers;