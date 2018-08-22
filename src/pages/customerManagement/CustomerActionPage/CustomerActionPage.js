import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import { connect } from 'react-redux';
import { actAddCustomerRequest, actUpdateCustomerRequest, actGetCustomerRequest } from 'redux/customerManagement/actions/index';
import {FormGroup,ControlLabel,FormControl,Form} from 'react-bootstrap';
import validator from 'validator';
class CustomerActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addAction:false,

            validationStateID:null,
            validationStatePMC:null,
            validationStateName:null,
            validationStatePhone:null,
            validationStateEmail:null,
            validationStateAddress:null,
            validationStateLogin:null,
            validationStatePassword:null,
            validationStateDetail:null,
            pagination:[],

            customerId:	'',
            paymentMethodCode:	'',
            customerName:	'',
            customerPhone:	'',
            customerEmail:	'',
            customerAddress:	'',
            customerLogin:	'',
            customerPassword:	'',
            othorCustomerDetails:	'',
        };
    }

    componentWillMount() {
        var { match } = this.props;
        if (match) { // update
            var id = match.params.id;
            var pagination = match.params.pagination;
            this.setState({pagination:pagination.split(",")},()=>{console.log(this.state.pagination)});
            this.props.onEditCustomer(id);
        } else{
            this.setState({
                addAction:true,
                customerId:	'',
                paymentMethodCode:	'',
                customerName:	'',
                customerPhone:	'',
                customerEmail:	'',
                customerAddress:	'',
                customerLogin:	'',
                customerPassword:	'',
                othorCustomerDetails:	'',
            });
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.addAction===false){
            if(nextProps && nextProps.itemEditing){
                var {itemEditing} = nextProps;
                this.setState({
                    customerId:	itemEditing.customerId,
                    paymentMethodCode:	itemEditing.paymentMethodCode,
                    customerName:	itemEditing.customerName,
                    customerPhone:itemEditing.customerPhone,
                    customerEmail:	itemEditing.customerEmail,
                    customerAddress:itemEditing.customerAddress,
                    customerLogin:itemEditing.customerLogin,
                    customerPassword:	itemEditing.customerPassword,
                    othorCustomerDetails:itemEditing.othorCustomerDetails,
                })
            }
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
        if(name+''==="customerId") this.setState({validationStateID:"success"});
        if(name+''==="paymentMethodCode") this.setState({validationStatePMC:"success"});
        if(name+''==="customerName") this.setState({validationStateName:"success"});
        if(name+''==="customerPhone") this.setState({validationStatePhone:"success"});
        if(name+''==="customerEmail") this.setState({validationStateEmail:"success"});
        if(name+''==="customerAddress") this.setState({validationStateAddress:"success"});
        if(name+''==="customerLogin") this.setState({validationStateLogin:"success"});
        if(name+''==="customerPassword") this.setState({validationStatePassword:"success"});
        if(name+''==="othorCustomerDetails") this.setState({validationStateDetail:"success"});
    }
    validationForm=()=>{
        var isSubmit=true;
        if (!validator.isEmail(this.state.customerEmail)){
            this.setState({validationStateEmail:'error'});
            isSubmit=false;
        } 
        if(!validator.isMobilePhone(this.state.customerPhone,'vi-VN')){
            console.log(validator.isMobilePhone(this.state.customerPhone,'vi-VN')+" validation form phone");
            this.setState({validationStatePhone:'error'});
            isSubmit=false;
        }
        return isSubmit;
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.addAction===false) {
            var { customerId,paymentMethodCode,customerName,customerPhone,customerEmail,customerAddress,
                customerLogin,customerPassword,othorCustomerDetails } = this.state;
            console.log("update cate act: id:"+customerId +" name:"+ customerName );
            var customerObj = {
                customerId:customerId,
                paymentMethodCode:paymentMethodCode,
                customerName:customerName,
                customerPhone:customerPhone,
                customerEmail:customerEmail,
                customerAddress:customerAddress,
                customerLogin:customerLogin,
                customerPassword:customerPassword,
                othorCustomerDetails:othorCustomerDetails,
            };
           console.log("==============================");
           console.log(customerObj);
           console.log("==============================");
           if(this.validationForm()){
               if(customerObj.customerId===undefined||customerObj.customerId===''||
                   customerObj.customerName===undefined||customerObj.customerName===''){
                  
                   swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "error");
                   e.preventDefault();
               }else{
                   swal("Xong!", "Bạn đã sửa thông tin khách hàng thành công!", "success");
                   var pageIndex=this.state.pagination[0];
                   var pageSize = this.state.pagination[1];
                   var iSearch = this.state.pagination[2];
                   console.log(customerObj);
                   this.props.onUpdateCustomer(customerObj,pageIndex,pageSize,iSearch);
                   this.setState({
                       validationStateID:null,
                       validationStatePMC:null,
                       validationStateName:null,
                       validationStatePhone:null,
                       validationStateEmail:null,
                       validationStateAddress:null,
                       validationStateLogin:null,
                       validationStatePassword:null,
                       validationStateDetail:null,
   
                       customerId:	'',
                       paymentMethodCode:	'',
                       customerName:	'',
                       customerPhone:	'',
                       customerEmail:	'',
                       customerAddress:	'',
                       customerLogin:	'',
                       customerPassword:	'',
                       othorCustomerDetails:	'',
                   });
                   this.props.history.goBack();
               }
           }else{
            swal("Lỗi!", "Bạn nhập sai định dạng một số trường!", "error");
            e.preventDefault();
           }
        } else {
            let { customerId,paymentMethodCode,customerName,customerPhone,customerEmail,customerAddress,
                customerLogin,customerPassword,othorCustomerDetails} = this.state;
            console.log("add act: id:"+customerId +" name:"+ customerName );
            let customerObj = {
                customerId:customerId,
                paymentMethodCode:paymentMethodCode,
                customerName:customerName,
                customerPhone:customerPhone,
                customerEmail:customerEmail,
                customerAddress:customerAddress,
                customerLogin:customerLogin,
                customerPassword:customerPassword,
                othorCustomerDetails:othorCustomerDetails,
            };
            if(this.validationForm()){
                if(customerObj.customerId===undefined||customerObj.customerId===''||
                customerObj.customerPhone===undefined||customerObj.customerPhone===''){
                    console.log(validator.isMobilePhone(this.state.customerPhone,'vi-VN')+" validation form phone");
                    swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "success");
                    e.preventDefault();
                }else{
                    swal("Xong!", "Bạn vừa thêm thành công!", "success");
                    this.props.onAddCustomer(customerObj);
                    this.setState({
                        validationStateID:null,
                        validationStatePMC:null,
                        validationStateName:null,
                        validationStatePhone:null,
                        validationStateEmail:null,
                        validationStateAddress:null,
                        validationStateLogin:null,
                        validationStatePassword:null,
                        validationStateDetail:null,
    
                        customerId:	'',
                        paymentMethodCode:	'',
                        customerName:	'',
                        customerPhone:	'',
                        customerEmail:	'',
                        customerAddress:	'',
                        customerLogin:	'',
                        customerPassword:	'',
                        othorCustomerDetails:	'',
                    });
                    this.props.history.goBack();
                }
            }else{
                swal("Lỗi!", "Bạn nhập sai định dạng một số trường!", "error");
                e.preventDefault();
            }
        }
    }

   
    render() {
        var { customerId,paymentMethodCode,customerName,customerPhone,customerEmail,customerAddress,
            customerLogin,customerPassword,othorCustomerDetails, } = this.state;
        if(customerId===null || customerId===undefined){
            customerId ="";
        }
        if(this.state.addAction){
            return (
                <div className="container">
                    <div className="row">
                            <Form   onSubmit={this.onSubmit}>
                             <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateID}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Mã khách hàng: </ControlLabel><br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="customerId"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStatePMC}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Phương thức thanh toán: </ControlLabel><br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="paymentMethodCode"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateName}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Tên khách hàng: </ControlLabel><br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="customerName"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStatePhone}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Số điện thoại: </ControlLabel><br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="customerPhone"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateEmail}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Email: </ControlLabel> <br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="customerEmail"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateAddress}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Address: </ControlLabel><br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="customerAddress"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateLogin}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Login: </ControlLabel><br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="customerLogin"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStatePassword}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Password: </ControlLabel> <br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="customerPassword"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.state.validationStateDetail}
                                >
                                    <div className="form-group">
                                        <ControlLabel>Detail: </ControlLabel><br/>
                                        <FormControl
                                            type="text"
                                            placeholder="Enter text"
                                            onChange={this.onChange}
                                            name="othorCustomerDetails"
                                        />
                                        <FormControl.Feedback />
                                    </div>
                                </FormGroup>{'  '}

                            </div>
                            <div style={{marginTop:'25px',float:'right'}} className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <Link to="/customer-list" className="btn btn-danger mr-5">
                                    <i className="glyphicon glyphicon-arrow-left"></i> Trở Lại
                                </Link>
                                <button type="submit" className="btn btn-primary">
                                    <i className="glyphicon glyphicon-save"></i> Thêm loại sản phẩm
                                </button>
                            </div>
                            </Form>
                        </div>
                    {/* </div> */}
                </div>
            );
        }else{
            return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStatePMC}
                        >
                            <div className="form-group">
                                <ControlLabel>Phương thức thanh toán: </ControlLabel>
                                <FormControl
                                    value={`${paymentMethodCode}`}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="paymentMethodCode"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateName}
                        >
                            <div className="form-group">
                                <ControlLabel>Tên khách hàng: </ControlLabel>
                                <FormControl
                                    value={customerName}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="customerName"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStatePhone}
                        >
                            <div className="form-group">
                                <ControlLabel>Số điện thoại: </ControlLabel>
                                <FormControl
                                    value={customerPhone}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="customerPhone"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateEmail}
                        >
                            <div className="form-group">
                                <ControlLabel>Email: </ControlLabel>
                                <FormControl
                                    value={customerEmail}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="customerEmail"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateAddress}
                        >
                            <div className="form-group">
                                <ControlLabel>Address: </ControlLabel>
                                <FormControl
                                    value={customerAddress}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="customerAddress"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateLogin}
                        >
                            <div className="form-group">
                                <ControlLabel>Login: </ControlLabel>
                                <FormControl
                                    value={customerLogin}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="customerLogin"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStatePassword}
                        >
                            <div className="form-group">
                                <ControlLabel>Password: </ControlLabel>
                                <FormControl
                                    value={customerPassword}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="customerPassword"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationStateDetail}
                        >
                            <div className="form-group">
                                <ControlLabel>Detail: </ControlLabel>
                                <FormControl
                                    value={othorCustomerDetails}
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.onChange}
                                    name="othorCustomerDetails"
                                />
                                <FormControl.Feedback />
                            </div>
                        </FormGroup>
                 </div>
                 <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{float:'right'}}>
                        <Link to="/customer-list" className="btn btn-danger mr-5">
                            <i className="glyphicon glyphicon-arrow-left"></i> Trở Lại
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            <i className="glyphicon glyphicon-save"></i> Lưu Lại
                        </button>
                </div>
                </form>
                </div>
            </div>
        );
    }
    }
}

const mapStateToProps = state => {
    return {
        itemEditing : state.itemCustomerEditing,
        customers: state.customer,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddCustomer: (customer) => {
            dispatch(actAddCustomerRequest(customer));
        },
        onUpdateCustomer: (customer,pageIndex,pageSize,iSearch) => {
            dispatch(actUpdateCustomerRequest(customer,pageIndex,pageSize,iSearch));
        },
        onEditCustomer : (id) => {
            dispatch(actGetCustomerRequest(id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerActionPage);
