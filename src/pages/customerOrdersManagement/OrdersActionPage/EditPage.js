import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import { connect } from 'react-redux';
import { actAddCustomerOrdersRequest, actUpdateCustomerOrdersRequest, actGetCustomerOrdersRequest } from 'redux/customerOrdersManagement/actions/index';
import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
import {actFetchListCustomerOrdersRequest} from 'redux/customerOrdersManagement/actions/cates';
import classNames from 'classnames';
import ListOrderItem from './OrderItem';

class EditPages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pagination:[],
            show:false,

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

        };
    }

    componentWillMount() {
        var { match } = this.props;
        if (match) { // update
            var id = match.params.id;
            var pagination = match.params.pagination;
            this.setState({pagination:pagination.split(",")},()=>{console.log(this.state.pagination)});
            this.props.onEditCustomerOrders(id);
        } else{
            this.setState({
                addAction:true,
                orderId: '',
                customerId: '',
                orderStatusCode: '',
                shippingMethodCode: '',
                oderPlaceDatatime:'',
                orderDeliveDatatime:'',
                orderShoppingCharges:'',
                otherOrtherDetails:'',
            });
        }
        this.props.fetchAllListCustomerOrders();
        
    }

    componentWillReceiveProps(nextProps) {
            if(nextProps && nextProps.itemEditing){
                var {itemEditing} = nextProps;
                this.setState({
                    orderId: itemEditing.orderId,
                    customerId: itemEditing.customerId,
                    orderStatusCode: itemEditing.orderStatusCode,
                    shippingMethodCode: itemEditing.shippingMethodCode,
                    oderPlaceDatatime:itemEditing.oderPlaceDatatime,
                    orderDeliveDatatime:itemEditing.orderDeliveDatatime,
                    orderShoppingCharges:itemEditing.orderShoppingCharges,
                    otherOrtherDetails:itemEditing.otherOrtherDetails,
                })
            }
    }
    componentDidMount(){
        var {itemEditing} = this.props;
        this.setState({orderId: itemEditing.orderId,});
    }

    handleEditOrderItem=()=>{
        this.setState({show:!this.state.show,orderId:this.state.orderId});
    }

    validateForm =()=>{
        var isValid = true;
        var dateSet = this.state.oderPlaceDatatime;
        var dateDelive = this.state.orderDeliveDatatime;
        var pattern= (/^([0-9]{4})-([0-9]{2})-([0-9]{2})T(([1]{1}[0,1,2]{1})|([0]{1}[0-9]{1})):([0-5]{1}[0-9]{1}):([0-5]{1}[0-9]{1})$/);
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
        });
        if(name+''==="orderId") this.setState({validationOrderId:"success"});
        if(name+''==="customerId") this.setState({validationCustomerID:"success"});
        if(name+''==="orderStatusCode") this.setState({validationStatusCode:"success"});
        if(name+''==="shippingMethodCode") this.setState({validationShipCode:"success"});
        if(name+''==="oderPlaceDatatime") this.setState({validationPlaceDataTime:"success"});
        if(name+''==="orderDeliveDatatime") this.setState({validationDeliveDataTime:"success"});
        if(name+''==="orderShoppingCharges") this.setState({validationShopCharge:"success"});
        if(name+''==="otherOrtherDetails") this.setState({validationDetail:"success"});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let { orderId,customerId, orderStatusCode,shippingMethodCode,oderPlaceDatatime,
            orderDeliveDatatime,orderShoppingCharges,otherOrtherDetails  } = this.state;
            console.log("add act: id:"+orderId +" Customer name:"+ customerId +" status:"+ orderStatusCode);
        let orderObj = {
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
            orderObj.customerId===undefined||orderObj.customerId===''||
            orderObj.orderDeliveDatatime===undefined||orderObj.orderDeliveDatatime===''||
            orderObj.oderPlaceDatatime===undefined||orderObj.oderPlaceDatatime===''){
            if(orderObj.orderId===undefined||orderObj.orderId===''){
                this.setState({validationOrderId:'error'});
            } 
            if(orderObj.customerId===undefined||orderObj.customerId===''){
                this.setState({validationCustomerID:'error'});
            } 
            if(orderObj.orderDeliveDatatime===undefined||orderObj.orderDeliveDatatime===''){
                this.setState({validationDeliveDataTime:'error'});
            } 
            if(orderObj.oderPlaceDatatime===undefined||orderObj.oderPlaceDatatime==='') {
                this.setState({validationPlaceDataTime:'error'});
            }

            swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "error");
            e.preventDefault();
        }else{
            swal("Xong!", "Bạn vừa thêm thành công!", "success");
            var pageIndex=this.state.pagination[0];
            var pageSize = this.state.pagination[1];
            var iSearch = this.state.pagination[2];
            var {saveCustomerID} = this.props;
            if(saveCustomerID==='all-cate') iSearch='ALL';
            if(saveCustomerID!=='null') iSearch=saveCustomerID;
            this.props.onUpdateCustomerOrders(orderObj,pageIndex,pageSize,iSearch);
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
            });
            this.props.history.goBack();
        }
        }else{
        swal("Lỗi!", "Bạn nhập sai định dạng ngày!", "error");
        e.preventDefault();
        }
        
    }

   
    render() {
        var { customerId, orderStatusCode,shippingMethodCode,oderPlaceDatatime,
            orderDeliveDatatime,orderShoppingCharges,otherOrtherDetails} = this.state;
        // var orderObjID = orderID;
        var {listCustomer} =this.props;
            return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationCustomerID}
                            >
                            <div className="form-group">
                                <ControlLabel>Tên khách hàng: </ControlLabel>
                                <FormControl
                                    componentClass="select" name="customerId"
                                    placeholder="Select" onChange={this.onChange}>
                                    <option key={customerId} value={customerId}>
                                        {customerId}
                                    </option>
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
                                value={orderStatusCode+''}
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
                                    value={shippingMethodCode+''}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="shippingMethodCode"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationPlaceDataTime}
                        >
                            <div className="form-group">
                                <ControlLabel>Ngày đặt: </ControlLabel>
                                <input
                                    className="form-control"
                                    value={oderPlaceDatatime+''}
                                    type="datetime-local"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="oderPlaceDatatime"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                    </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <FormGroup
                                controlId="formBasicText"
                                validationState={this.state.validationDeliveDataTime}
                            >
                                <div className="form-group">
                                    <ControlLabel>Ngày chuyển: </ControlLabel>
                                    <input
                                        className="form-control"
                                        value={orderDeliveDatatime+''}
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
                                        value={orderShoppingCharges+''}
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
                                        value={otherOrtherDetails+''}
                                        type="text"
                                        placeholder="Enter text"
                                        onChange={this.onChange}
                                        name="otherOrtherDetails"
                                    />
                                    <FormControl.Feedback />
                                </div>
                            </FormGroup>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{float:'right',marginTop:'25px'}}>
                                <Link to="/orders-list" className="btn btn-danger mr-5">
                                    <i className="glyphicon glyphicon-arrow-left"></i> Trở Lại
                                </Link>
                                <button type="submit" className="btn btn-primary">
                                    <i className="glyphicon glyphicon-save"></i> Lưu Lại
                                </button>{' '}
                                <button type="button" onClick={this.handleEditOrderItem} className="btn btn-success">
                                    <i className="glyphicon glyphicon-edit"></i> Sửa sản phẩm
                                </button>
                        </div>
                    </form>
                 </div>
                <div className={classNames({
                    "container":true,
                    "row":true, 
                    "show":this.state.show,
                    "hidden":!this.state.show
                })}>
                    <ListOrderItem />
                </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        itemEditing : state.itemOrderEditing,
        listCustomer:state.listCustomer,
        saveCustomerID:state.saveCustomerID,
        orders: state.order,
        isFetching:state.isFetchingOrder
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPages);
