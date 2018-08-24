import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import { connect } from 'react-redux';
import { actAddCustomerOrdersRequest, actUpdateCustomerOrdersRequest, actGetCustomerOrdersRequest } 
    from 'redux/customerOrdersManagement/actions/index';
import {FormGroup,ControlLabel,FormControl,Form} from 'react-bootstrap';
import {actFetchListCustomerOrdersRequest} from 'redux/customerOrdersManagement/actions/cates';
import {getAllListOrders} from 'redux/customerOrdersManagement/actions/index';
import { actGetAllProduct }  from 'redux/productManagement/actions/index';
import { actAddOrderItemRequest,actFetchOrderItemRequest }  from 'redux/orderItemManagement/actions/index';
import $ from 'jquery';
import classNames from 'classnames';
class AddPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            customerId: '',
            orderStatusCode: '',
            shippingMethodCode: '',
            oderPlaceDatatime:'',
            orderDeliveDatatime:'',
            orderShoppingCharges:'',
            otherOrtherDetails:'',

            validationOrderId:null,
            validationCustomerID:null,
            validationStatusCode:null,
            validationShipCode:null,
            validationPlaceDataTime:null,
            validationDeliveDataTime:null,
            validationShopCharge:null,
            validationDetail:null,
            validationProductID:null,


            isNextPage:false,
            productCategoryCode:'',
            productPrice:'',
            productName:'',
            quantity:'',
            productId:'',
            show:false,

            saveOrder:true,
            isDone:false,
            error:false,
        };
    }
    componentDidMount(){
        this.props.fetchAllListCustomerOrders();
        this.props.actGetAllProduct();
        this.props.fetchAllOrder();
    }
    componentWillMount(){
        this.props.fetchAllListCustomerOrders();
        this.props.actGetAllProduct();
        this.props.fetchAllOrder();
    }
    validateForm =()=>{
        var isValid = true;
        var dateSet = this.state.oderPlaceDatatime;
        var dateDelive = this.state.orderDeliveDatatime;
        var pattern= (/^([0-9]{4})-([0-9]{2})-([0-9]{2})T(([1]{1}[0,1,2]{1})|([0]{1}[0-9]{1})):([0-5]{1}[0-9]{1})$/);
        if (dateSet === null || dateSet === "" || !pattern.test(dateSet)) {
            this.setState({validationPlaceDataTime:'error'});
            isValid=false;
        }
        if (dateDelive === null || dateDelive === "" || !pattern.test(dateDelive)) {
            this.setState({validationDeliveDataTime:'error'});
            isValid=false;
        }
        return isValid;
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        },()=>{
            // var {listProduct} = this.props;
            // if(this.state.productId!==''||this.state.productId!==undefined){
                
            // }
            var that=this;
            $("input[name=productId]").bind('input',function(){
                var a=$("input[name=productId]").val();
                var allProductOrder = that.props.orderItem;
                var {listProduct} = that.props;
                that.setState({validationProductID:"error"}); 
               
                $.each(listProduct,(key,val)=>{
                    if(val.productId===a){
                        that.setState({validationProductID:"success",show:true}); 
                    }
                });
                $.each(allProductOrder,(key,val)=>{
                    if(val.productId===a){
                        that.setState({validationProductID:"error",show:false});
                    }
                });
                if(that.state.validationProductID==="success"){
                    that.setState({show:true});
                    listProduct.forEach(p => {
                        if(p.productId===a){
                            that.setState({
                                productName:p.productName,
                                productPrice:p.productPrice,
                                productCategoryCode:p.productCategoryCode,
                                show:true
                            })
                        }
                    });
                }else{
                    that.setState({show:false});
                }
            })
        });
        if(name+''==="orderId") {
            var {orders} = this.props;
            var that=this;
            $("input[name=orderId]").bind('input',function(){
                var a=$("input[name=orderId]").val();
                var allProductOrder = orders;
                that.setState({validationOrderId:"success"}); 
                $.each(allProductOrder,(key,val)=>{
                    if(val.orderId===a){
                        that.setState({validationOrderId:"error",show:false});
                        that.setState({error:true});
                    }
                });
                if( that.state.validationOrderId==="success"){
                    that.props.fetchAllListOrderItem(that.state.orderId);
                    that.setState({error:false});
                }else{
                    that.setState({error:true});
                }
            })

        }
        if(name+''==="customerId") this.setState({validationCustomerID:"success"});
        if(name+''==="orderStatusCode") this.setState({validationStatusCode:"success"});
        if(name+''==="shippingMethodCode") this.setState({validationShipCode:"success"});
        if(name+''==="oderPlaceDatatime") this.setState({validationPlaceDataTime:"success"});
        if(name+''==="orderDeliveDatatime") this.setState({validationDeliveDataTime:"success"});
        if(name+''==="orderShoppingCharges") this.setState({validationShopCharge:"success"});
        if(name+''==="otherOrtherDetails") this.setState({validationDetail:"success"});

        if(!this.state.show){
            this.setState({validationProductID:'error'});
        }
    }

    submitData=(e)=>{
        e.preventDefault();
        var { orderId,customerId, orderStatusCode,shippingMethodCode,oderPlaceDatatime,
            orderDeliveDatatime,orderShoppingCharges,otherOrtherDetails,quantity,productId  } = this.state;
        if(this.state.saveOrder){
            console.log("add act: id:"+orderId +" Customer name:"+ customerId +" status:"+ orderStatusCode);
            var orderObj = {
                orderId: orderId,
                customerId: customerId,
                orderStatusCode: orderStatusCode,
                shippingMethodCode: shippingMethodCode,
                oderPlaceDatatime:oderPlaceDatatime,
                orderDeliveDatatime:orderDeliveDatatime,
                orderShoppingCharges:orderShoppingCharges,
                otherOrtherDetails:otherOrtherDetails,
            };
            this.props.onAddCustomerOrders(orderObj);
            this.setState({saveOrder:false,show:false});
            var orderItemObj={
                status:'true',
                orderId:orderId,
                productId:productId,
                quantity:quantity
            }
            this.props.AddOrderItem(orderItemObj);
            this.setState({
                productId:'',
                quantity:''
            });
        }else{
            let orderItemObj={
                status:'true',
                orderId:orderId,
                productId:productId,
                quantity:quantity
            }
            
            this.props.AddOrderItem(orderItemObj);
            this.setState({
                productId:'',
                quantity:'',
                show:false,
            });
        }
        if(this.state.isDone){
            swal("Xong!", "Bạn thêm thành công!", "success");
            this.setState({
                orderId: '',
                customerId: '',
                orderStatusCode: '',
                shippingMethodCode: '',
                oderPlaceDatatime:'',
                orderDeliveDatatime:'',
                orderShoppingCharges:'',
                otherOrtherDetails:'',
    
                validationOrderId:null,
                validationCustomerID:null,
                validationStatusCode:null,
                validationShipCode:null,
                validationPlaceDataTime:null,
                validationDeliveDataTime:null,
                validationShopCharge:null,
                validationDetail:null,
                isNextPage:true,
                isDone:false,
                show:false,
                saveOrder:true,
            });
             this.props.history.goBack();
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        var { orderId,customerId, orderStatusCode,shippingMethodCode,oderPlaceDatatime,
            orderDeliveDatatime,orderShoppingCharges,otherOrtherDetails  } = this.state;
        console.log("update act: id:"+orderId +" Customer name:"+ customerId +" status:"+ orderStatusCode);
        var orderObj = {
            orderId: orderId,
            customerId: customerId,
            orderStatusCode: orderStatusCode,
            shippingMethodCode: shippingMethodCode,
            oderPlaceDatatime:oderPlaceDatatime,
            orderDeliveDatatime:orderDeliveDatatime,
            orderShoppingCharges:orderShoppingCharges,
            otherOrtherDetails:otherOrtherDetails,
        };
        if(this.validateForm()){
            if(orderObj.orderId===undefined||orderObj.orderId===''||
                orderObj.customerId===undefined||orderObj.customerId===''){
                if(orderObj.orderId===''){
                    this.setState({validationOrderId:'error'});
                } 
                if(orderObj.customerId===''){
                    this.setState({validationCustomerID:'error'});
                } 
                
                swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "error");
                e.preventDefault();
            }else{
                this.setState({
                    validationOrderId:null,
                    validationCustomerID:null,
                    validationStatusCode:null,
                    validationShipCode:null,
                    validationPlaceDataTime:null,
                    validationDeliveDataTime:null,
                    validationShopCharge:null,
                    validationDetail:null,
                    isNextPage:true,
                });
            }
        }else{
            swal("Lỗi!", "Bạn nhập sai định dạng ngày!", "error");
            e.preventDefault();
        }
    }

    render(){
        var {productCategoryCode,productPrice,productName,quantity, orderStatusCode,shippingMethodCode,oderPlaceDatatime,
            orderDeliveDatatime,orderShoppingCharges,otherOrtherDetails  } = this.state;
        var {listCustomer,listProduct} =this.props;
        if(this.state.isNextPage){
            return(<div className="container">
            <div className="row">
                <Form onSubmit={this.submitData}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        {/* <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationOrderId}
                            >
                            <div className="form-group">
                                <ControlLabel>Mã đơn hàng: </ControlLabel>
                                <FormControl
                                    value={orderId}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="orderId"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup> */}
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationProductID}
                            >
                            <div className="form-group">
                                <ControlLabel>Tên sản phẩm: </ControlLabel>
                                <FormControl list="product-list" defaultValue="Enter value" name="productId" onChange={this.onChange}/>
                                <datalist id="product-list">
                                    {
                                        listProduct.map(function(obj,ind){
                                            return(
                                                <option key={ind} value={obj.productId}>
                                                    {obj.productName}
                                                </option>
                                            );
                                        })
                                    }
                                </datalist>
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationQuantity}
                        >
                            <div className="form-group">
                                <ControlLabel>Số lượng: </ControlLabel>
                                <FormControl
                                    value={quantity}
                                    type="number"
                                    min="1"
                                    max="300"
                                    placeholder="Enter quantity"
                                    onChange={this.onChange}
                                    name="quantity"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                       
                    </div>
                    <div className={classNames({
                        "col-xs-6 col-sm-6 col-md-6 col-lg-6":true,
                        "show":this.state.show,
                        "hidden":!this.state.show
                        })}>
                        <FormGroup controlId="formBasicText" >
                            <div className="form-group">
                                <ControlLabel>Giá: </ControlLabel>
                                <input
                                    className="form-control"
                                    value={productPrice}
                                    type="number"
                                    placeholder="Enter text"
                                    name="productPrice"
                                    disabled
                                />
                            </div>
                        </FormGroup>
                        <FormGroup controlId="formBasicText" >
                            <div className="form-group">
                                <ControlLabel>Tên sản phẩm: </ControlLabel>
                                <FormControl
                                    disabled
                                    value={productName}
                                    type="text"
                                    name="productName"
                                />
                            </div>
                        </FormGroup>
                        <FormGroup controlId="formBasicText"  >
                            <div className="form-group">
                                <ControlLabel>Loại sản phẩm: </ControlLabel>
                                <FormControl
                                    disabled 
                                    value={productCategoryCode}
                                    type="text"
                                    name="productCategoryCode"
                                />
                            </div>
                        </FormGroup>
                        <div className="" style={{float:'right'}}>
                            <Link to="/orders-list" className="btn btn-danger mr-5">
                                <i className="glyphicon glyphicon-arrow-left"></i> Hủy bỏ
                            </Link>
                            <button type="submit" className="btn btn-primary">
                                <i className="glyphicon glyphicon-save"></i> Thêm
                            </button>{' '}
                        </div>     
                    </div>
                </Form>
               
            </div>
            <div className="row">
                <button onClick={()=>{this.setState({isDone:true})}} className="btn btn-primary">
                    <i className="glyphicon glyphicon-arrow-right"></i> Xong
                </button>
            </div>
            </div>
            );
           
        }else{
            return (<div className="container">
            <div className="row">
                <Form onSubmit={this.onSubmit}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationOrderId}
                            >
                            <div className="form-group">
                                <ControlLabel>Mã đơn hàng: </ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="orderId"
                                />
                                <p style={{color:'red'}}  className={classNames({
                                    "show":this.state.error,
                                    "hidden":!this.state.error
                                    })}
                                >Mã đơn hàng không hợp lệ!!!</p>
                                <FormControl.Feedback />

                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationCustomerID}
                            >
                            <div className="form-group">
                                <ControlLabel>Tên khách hàng: </ControlLabel>
                                <FormControl 
                                        componentClass="select" name="customerId"
                                        placeholder="Select" onChange={this.onChange}>
                                    {
                                        listCustomer.map(function(obj,ind){
                                            return(
                                                <option key={ind} value={obj.customerId}>
                                                    {obj.customerName}
                                                </option>
                                            );
                                        })
                                    }
                                </FormControl>
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStatusCode}
                        >
                            <div className="form-group">
                                <ControlLabel>Trạng thái đơn hàng: </ControlLabel>
                                <FormControl
                                    value={orderStatusCode}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="orderStatusCode"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationShipCode}
                        >
                            <div className="form-group">
                                <ControlLabel>Mã phương thức vận chuyển: </ControlLabel>
                                <FormControl
                                    value={shippingMethodCode}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="shippingMethodCode"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationPlaceDataTime}
                        >
                            <div className="form-group">
                                <ControlLabel>Ngày đặt: </ControlLabel>
                                <input
                                    className="form-control"
                                    value={oderPlaceDatatime}
                                    type="datetime-local"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="oderPlaceDatatime"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationDeliveDataTime}
                        >
                            <div className="form-group">
                                <ControlLabel>Ngày chuyển: </ControlLabel>
                                <input
                                    className="form-control"
                                    value={orderDeliveDatatime}
                                    type="datetime-local"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="orderDeliveDatatime"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationShopCharge}
                        >
                            <div className="form-group">
                                <ControlLabel>Shop Charge: </ControlLabel>
                                <FormControl
                                    value={orderShoppingCharges}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="orderShoppingCharges"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationDetail}
                        >
                            <div className="form-group">
                                <ControlLabel>Chi tiết đơn hàng: </ControlLabel>
                                <FormControl
                                    value={otherOrtherDetails}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="otherOrtherDetails"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{float:'right'}}>
                            <Link to="/orders-list" className="btn btn-danger mr-5">
                                <i className="glyphicon glyphicon-arrow-left"></i> Trở Lại
                            </Link>
                            <button type="submit"  
                            className={classNames({
                                "btn btn-primary":true,
                                "show":!this.state.error,
                                "hidden":this.state.error
                                })}>
                                <i className="glyphicon glyphicon-arrow-right"></i> Tiếp tục
                            </button>
                    </div>     
                </Form>
            </div>
        </div>
            );
       }
    }
}
const mapStateToProps = state => {
    return {
        itemEditing : state.itemOrderEditing,
        listCustomer:state.listCustomer,
        saveCustomerID:state.saveCustomerID,
        orders: state.order,
        isFetching:state.isFetchingOrder,
        listProduct:state.products,
        orderItem: state.orderItem,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddCustomerOrders: (CustomerOrders) => {
            dispatch(actAddCustomerOrdersRequest(CustomerOrders));
        },
        onUpdateCustomerOrders: (CustomerOrders,pageIndex,pageSize,iSearch) => {
            dispatch(actUpdateCustomerOrdersRequest(CustomerOrders,pageIndex,pageSize,iSearch));
        },
        onEditCustomerOrders : (id) => {
            dispatch(actGetCustomerOrdersRequest(id));
        },
        fetchAllListCustomerOrders:()=>{
            dispatch(actFetchListCustomerOrdersRequest());
        },
        actGetAllProduct:()=>{
            dispatch(actGetAllProduct());
        },
        AddOrderItem:(orderIitem)=>{
            dispatch(actAddOrderItemRequest(orderIitem));
        },
        fetchAllListOrderItem:(filter)=>{
            dispatch(actFetchOrderItemRequest(filter));
        },
        fetchAllOrder:()=>{
            dispatch(getAllListOrders());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPages);