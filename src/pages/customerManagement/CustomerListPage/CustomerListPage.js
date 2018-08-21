import React, { Component } from 'react';
import './CustomerListPage.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';
import swal from 'sweetalert';
import MyButton from 'components/button/Button';

import {actFetchCustomerRequest, actDeleteCustomerRequest, searchCustomerRequest} from 'redux/customerManagement/actions/index';
import {FormGroup,FormControl,Form,Button} from 'react-bootstrap';
class CateListPage extends Component {  
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
        this.props.fetchAllCustomer(pageSize,pageIndex,iSearch);
    }
    componentWillMount(){
        // Gọi trước khi component đc render lần đầu tiên 
        var {pageSize,pageIndex,iSearch} = this.state;
        this.props.fetchAllCustomer(pageSize,pageIndex,iSearch);
    }
    onChange=e =>{
        if(e.target.value===''){
            this.setState({iSearch:"ALL"});
            this.props.fetchAllCustomer(this.state.pageSize,this.state.pageIndex,"ALL");
        }else{
            this.setState({iSearch:e.target.value},function(){
             this.props.searchCustomer(this.state.pageSize,this.state.pageIndex,this.state.iSearch);
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
                this.props.fetchAllCustomer(this.state.pageSize,this.state.pageIndex,"ALL");
            }else{
                console.log(word+" is word search, pageSize: "+this.state.pageSize+" pageInd: "+this.state.pageIndex);
                this.props.searchCustomer(this.state.pageSize,this.state.pageIndex,word);
            }
        }else{
            console.log("Lỗi này hơi bị ghê!!!");
        }
        this.setState({
            listPageVisit:[],
            listPageVisitFilter:[],
        });
       
    }
    onDelete = (id) => { 
        var {onDeleteCustomer} = this.props;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                onDeleteCustomer(id,this.state.pageSize,this.state.pageIndex,this.state.iSearch);
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
    }
    

    render() {
        var { isFetchingCustomer,Customers,fetchAllCustomer,searchCustomer } = this.props;
        return (
            <div className="container-content">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="container-table">
                            <div className="row-button">
                                <div className="button-left">
                                    <Link to="/customer/add" className="btn btn-primary mb-5">
                                        <i className="glyphicon glyphicon-plus"></i> Thêm Khách Hàng
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
                                
                            </div>
                            <br/>
                            <br/>
                            <br/>
                           <div style={{width:'100%',marginTop:'30px',}}>
                           <ReactTable data={Customers}
                                        loading={isFetchingCustomer}
                                        defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                        columns={[
                                        {
                                            Header: "Name",
                                            id: "customerName",
                                            accessor: d => d.customerName,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["customerName"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Phone",
                                            id: "customerPhone",
                                            accessor: d => d.customerPhone,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["customerPhone"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Email",
                                            id: "customerEmail",
                                            accessor: d => d.customerEmail,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["customerEmail"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Address",
                                            id: "customerAddress",
                                            accessor: d => d.customerAddress,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["customerAddress"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Payment Method",
                                            id: "paymentMethodCode",
                                            accessor: d => d.paymentMethodCode,
                                            filterMethod: (filter, rows) =>
                                            matchSorter(rows, filter.value, { keys: ["paymentMethodCode"] }),
                                            filterAll: true
                                        },
                                        {
                                            Header: "Edit",
                                            accessor:"customerId",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton small aria_label='EDIT' 
                                                    ID={row.value}
                                                    obj="customer"
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
                                            accessor:"customerId",
                                            filterable:false,
                                            Cell: row => (
                                            <div className="button-table"> 
                                                <MyButton  size="small"  aria_label='DELETE' 
                                                    onClickComponent={()=>this.onDelete(row.value)}/> 
                                            </div>
                                            )
                                        }]}
                                        defaultPageSize={5}
                                        onPageChange={(pageInd) => {
                                            var stringFilter = this.state.iSearch;
                                                if(stringFilter===''||stringFilter==="ALL"){
                                                    var pageVisit = this.state.listPageVisit;
                                                    this.setState({
                                                    pageIndex:pageInd+1,
                                                    listPageVisitFilter:[],
                                                },
                                                    function(){
                                                        // console.log(this.state.listPageVisit);
                                                        var isPageVisit= this.state.listPageVisit.includes(pageInd+1);
                                                        if(isPageVisit===false){
                                                            pageVisit.push(pageInd+1);
                                                            this.setState({listPageVisit:pageVisit, });
                                                            fetchAllCustomer(
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
                                                                searchCustomer(
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
                                                            fetchAllCustomer(
                                                                this.state.pageSize,
                                                                this.state.pageIndex,
                                                                "ALL"
                                                            );
                                                        }else{
                                                            searchCustomer(
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
        Customers: state.customer,
        isFetchingCustomer:state.isFetchingCustomer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllCustomer: (pageSize,pageIndex,StringFilter) => {
            dispatch(actFetchCustomerRequest(pageSize,pageIndex,StringFilter));
        },
        searchCustomer: (pageSize,pageNow,keywork) => {
            dispatch(searchCustomerRequest(pageSize,pageNow,keywork))
        },
        onDeleteCustomer: (id,pageSize,pageIndex,StringFilter) => {
            dispatch(actDeleteCustomerRequest(id,pageSize,pageIndex,StringFilter));
        },
        

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CateListPage);
