import React from 'react';
import ProductListPage from './pages/productManagement/ProductListPage/ProductListPage';
import ProductActionPage from './pages/productManagement/ProductActionPage/ProductActionPage';

const routes = [
    // {
    //     path: '/',
    //     exact: true,
    //     main: () => <HomePage />
    // },
    {
        path: '/product-list',
        exact: false,
        main: () => <ProductListPage />
    },
    {
        path: '/product/add',
        exact: false, 
        main: ({ location, history }) => <ProductActionPage location={location} history={history} />
    },
    {
        path: '/product/:id/:pagination/edit',
        exact: false,
        main: ({ match, history }) => <ProductActionPage match={match} history={history} />
    },
    // {
    //     path: '',
    //     exact: false,
    //     main: () => <NotFound />
    // }
];

export default routes;