import React, { Component } from 'react';
import './OrdersListPage.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';

import swal from 'sweetalert';
import MyButton from 'components/button/Button';
import MyDropdownList from 'components/dropdown/DropdownOrder';
import { actFetchCustomerOrdersRequest, actDeleteCustomerOrdersRequest, searchCustomerOrdersRequest  } 
        from 'redux/customerOrdersManagement/actions/index';
import {actFetchListCustomerOrdersRequest} from 'redux/customerOrdersManagement/actions/cates';
import {FormGroup,FormControl,Form,Button} from 'react-bootstrap';
class CustomerOrdersListPage extends Component {  
    constructor(props){
        super(props);
        this.state={
            iSearch:"ALL",
            pageSize:5,
            pageIndex:1,
            listPageVisit:[1],
            listPageVisitFilter:[1],
        };
    }
    componentDidMount(){
        var {pageSize,pageIndex,iSearch} = this.state;
        this.props.fetchAllCustomerOrders(pageSize,pageIndex,iSearch);
        this.props.fetchAllListCustomerOrders();
    }
    componentWillMount(){
        // Gọi trước khi component đc render lần đầu tiên 
        var {pageSize,pageIndex,iSearch} = this.state;
        this.props.fetchAllCustomerOrders(pageSize,pageIndex,iSearch);
        this.props.fetchAllListCustomerOrders();
    }
    onChange=e =>{
        var val =e.target.value;
        if(val.trim()===''){
            this.setState({iSearch:"ALL"});
            this.props.fetchAllCustomerOrders(this.state.pageSize,this.state.pageIndex,"ALL");
            this.props.fetchAllListCustomerOrders();
        }else{
            this.setState({iSearch:e.target.value},function(){
             this.props.searchCustomerOrders(this.state.pageSize,this.state.pageIndex,this.state.iSearch);
            });
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
    }

    searchHandle=e=>{
        e.preventDefault();
        var word = this.state.iSearch;
        if(word!==''){
            if(word==='ALL'){
                this.props.fetchAllCustomerOrders(this.state.pageSize,this.state.pageIndex,"ALL");
                this.props.fetchAllListCustomerOrders();
            }else{
                console.log(word+" is word search, pageSize: "+this.state.pageSize+" pageInd: "+this.state.pageIndex);
                this.props.searchCustomerOrders(this.state.pageSize,this.state.pageIndex,word);
            }
        }else{
            console.log("Lỗi này hơi bị ghê!!!");
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
       
    }
    onDeleteCustomerOrders = (id) => { 
        var {onDeleteCustomerOrders,saveCustomerID} = this.props;
        var StringFilter=this.state.iSearch;
        if(saveCustomerID==='all-cate'){
          StringFilter='ALL';
        }
        if(saveCustomerID!=='null') StringFilter=saveCustomerID;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                onDeleteCustomerOrders(id,this.state.pageSize,this.state.pageIndex,StringFilter);
                
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
    render() {
        var { isFetching,orders,listCustomer,fetchAllCustomerOrders,searchCustomerOrders,saveCustomerID } = this.props;
        return (
            <div className="container-content">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container-table">
                            <div className="row-button">
                                <div className="button-left">
                                    <Link to="/orders/add" className="btn btn-primary mb-5">
                                        <i className="glyphicon glyphicon-plus"></i> Thêm Đơn Hàng
                                    </Link>
                                </div>
                                <div className="button-right" >
                                    <Form inline onSubmit={this.searchHandle}>
                                        <FormGroup controlId="formInlineName">
                                            <FormControl onChange={this.onChange} type="text" name="iSearch" ref="iSearch" placeholder="Search by word..." />
                                        </FormGroup>{' '}
                                        <Button type="submit">Search</Button>
                                    </Form>
                                </div>
                                <div className="button-right">
                                    <div className="backGround-dropdown"  >
                                        <MyDropdownList
                                         pagination={[ 
                                             this.state.pageIndex,
                                             this.state.pageSize,
                                            ]} 
                                         cateButton="Primary" 
                                         title="Category" id="1" 
                                         listCustomer={listCustomer}/>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                           <div style={{width:'100%',marginTop:'30px',}}>
                           <ReactTable data={orders}
                                        loading={isFetching}
                                        defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                        columns={[
                                        {
                                            Header: "ID",
                                            id: "shippingMethodCode",
                                            accessor: d => d.shippingMethodCode,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["shippingMethodCode"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Status",
                                            id: "orderStatusCode",
                                            accessor: d => d.orderStatusCode,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["orderStatusCode"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Customer Name",
                                            id: "customerId",
                                            accessor: d => d.customerId,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["customerId"] }),
                                            Cell: row=>{

                                                var result ="";
                                                listCustomer.forEach((cate, index) => {
                                                    if (cate.customerId === row.value) {
                                                        result = cate.customerName;
                                                    }
                                                });
                                                return result;
                                            }
                                            ,
                                            
                                            filterAll: true
                                        },
                                        {
                                            Header: "Detail",
                                            id: "otherOrtherDetails",
                                            accessor: d => d.otherOrtherDetails,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["otherOrtherDetails"] }),
                                            filterAll: true
                                        },
                                        {
                                            
                                            Header: "Edit",
                                            accessor:"orderId",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton small aria_label='EDIT' 
                                                    ID={row.value} 
                                                    obj="orders"
                                                    pagination={[
                                                        this.state.pageIndex,
                                                        this.state.pageSize,
                                                        this.state.iSearch
                                                    ]}/>
                                            </div>
                                            )
                                        },
                                        {   
                                            Header: "Delete",
                                            accessor:"orderId",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton size="small" 
                                                    aria_label='DELETE' 
                                                    onClickComponent={()=>this.onDeleteCustomerOrders(row.value)}
                                                    productId={row.value} 
                                                    pagination={[this.state.pageIndex,this.state.pageSize,this.state.iSearch]}/> 
                                            </div>

                                            )
                                        }]}
                                        defaultPageSize={5}
                                        onPageChange={(pageInd) => {
                                            var stringFilter=(saveCustomerID!=='null')?saveCustomerID:this.state.iSearch;
                                            if(saveCustomerID==='all-cate'){
                                                this.setState({
                                                    listPageVisit:[],
                                                    listPageVisitFilter:[],
                                                    iSearch:'ALL'
                                                });
                                            }
                                            if(saveCustomerID==='null'||saveCustomerID==='all-cate'){
                                                if(stringFilter===''||stringFilter===0||stringFilter==="ALL"){
                                                    var pageVisit = this.state.listPageVisit;
                                                    this.setState({
                                                    pageIndex:pageInd+1,
                                                    listPageVisitFilter:[],
                                                    isActiveDropdown:false,
                                                },
                                                    function(){
                                                        // console.log(this.state.listPageVisit);
                                                        var isPageVisit= this.state.listPageVisit.includes(pageInd+1);
                                                        if(isPageVisit===false){
                                                            pageVisit.push(pageInd+1);
                                                            this.setState({listPageVisit:pageVisit, });
                                                            fetchAllCustomerOrders(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                "ALL"
                                                            );
                                                           
                                                        }
                                                    });
                                                }else{
                                                    this.setState({pageIndex:pageInd+1,listPageVisit:[]},
                                                        function(){
                                                            var pageVisit = this.state.listPageVisitFilter;
                                                            var isPageVisit= this.state.listPageVisitFilter.includes(pageInd+1);
                                                            if(isPageVisit===false){
                                                                pageVisit.push(pageInd+1);
                                                                this.setState({listPageVisitFilter:pageVisit, });
                                                                searchCustomerOrders(
                                                                    this.state.pageSize,
                                                                    this.state.pageIndex,
                                                                    stringFilter
                                                                );
                                                            }
        
                                                        });
                                                    }
                                            }else{
                                                this.setState({
                                                    listPageVisit:[],
                                                    listPageVisitFilter:[],
                                                    pageIndex:pageInd+1,
                                                },()=>{
                                                    var pageVisit = this.state.listPageVisitFilter;
                                                    var isPageVisit= this.state.listPageVisitFilter.includes(pageInd+1);
                                                    if(isPageVisit===false){
                                                        pageVisit.push(pageInd+1);
                                                        this.setState({listPageVisitFilter:pageVisit, });
                                                        searchCustomerOrders(
                                                            this.state.pageSize,
                                                            this.state.pageIndex,
                                                            stringFilter
                                                        );
                                                    }
                                                });

                                            }
                                        } 
                                        } // Called when the page index is changed by the user
                                        onPageSizeChange={(pSize, pIndex) => {  
                                            this.setState({
                                                pageIndex:pIndex+1,
                                                pageSize:pSize,
                                                listPageVisit:[],
                                                listPageVisitFilter:[],
                                            },
                                                function(){
                                                    if(this.state.iSearch===0||
                                                        this.state.iSearch===''||
                                                        this.state.iSearch==="ALL"){
                                                            fetchAllCustomerOrders(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                "ALL"
                                                            );
                                                        }else{
                                                            searchCustomerOrders(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                this.state.iSearch
                                                            );
                                                        }
                                                });                                            
                                            }
                                        } 
                                        className="-striped -highlight"
                                    />
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        listCustomer:state.listCustomer,
        saveCustomerID:state.saveCustomerID,
        orders: state.order,
        isFetching:state.isFetchingOrder
    }   
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCustomerOrders: (pageSize,pageIndex,StringFilter) => {
            dispatch(actFetchCustomerOrdersRequest(pageSize,pageIndex,StringFilter));
        },
        fetchAllListCustomerOrders:()=>{
            dispatch(actFetchListCustomerOrdersRequest());
        },
        onDeleteCustomerOrders: (CustomerOrdersId,pageSize,pageIndex,StringFilter) => {
            dispatch(actDeleteCustomerOrdersRequest(CustomerOrdersId,pageSize,pageIndex,StringFilter));
        },
        searchCustomerOrders: (pageSize,pageNow,keywork) => {
            dispatch(searchCustomerOrdersRequest(pageSize,pageNow,keywork))
        },
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersListPage);
