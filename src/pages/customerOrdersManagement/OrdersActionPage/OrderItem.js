
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actAddCustomerOrdersRequest, actUpdateCustomerOrdersRequest, actGetCustomerOrdersRequest } 
    from 'redux/customerOrdersManagement/actions/index';
import {actFetchListCustomerOrdersRequest} from 'redux/customerOrdersManagement/actions/cates';
import { actGetAllProduct }  from 'redux/productManagement/actions/index';
import { actAddOrderItemRequest,actFetchOrderItemRequest }  from 'redux/orderItemManagement/actions/index';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import MyButton from 'pages/customerOrdersManagement/OrdersActionPage/btnDialog';
import swal from 'sweetalert'; 
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {FormGroup,ControlLabel,FormControl,Form} from 'react-bootstrap';
import $ from 'jquery';
class ListOrderItem extends Component {
    constructor(props){
        super(props)
        this.state = {
          open: false, 
          orderId: '',
          productId: '',
          quantity: '',
          validationProductID:null,
          validationQuantity:null,
          fetchOk:0,
          show:false,
        };
    }
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    componentDidMount(){
       this.props.actGetAllProduct();
   }
    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.itemEditing){
            var {itemEditing} = nextProps;
            if(this.state.fetchOk<4){
                this.setState({
                    orderId: itemEditing.orderId,
                    fetchOk:this.state.fetchOk+1
                },()=>{
                    this.props.fetchAllListOrderItem(this.state.orderId);
                });
            }
            
        }
}
    
    checkExits=()=>{
        var orderId=this.state.orderId;
        var productId=this.state.productId;
        var host="https://demowebaspnetcore.azurewebsites.net/api/";
        axios.get(host+`OrderItem/getFindIDOrderItem/orderId/productId?orderId=${orderId}&productId=${productId}`)
        .then(res => {
           
        })
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
        if(name+''==="productId"){
            var that=this;
            $("input[name=productId]").bind('input',function(){
                var a=$("input[name=productId]").val();
                var allProductOrder = that.props.orderItem;
                var {listProduct} = that.props;
                that.setState({validationProductID:"error"}); 
                $.each(allProductOrder,(key,val)=>{
                    if(val.productId===a){
                        that.setState({validationProductID:"error",show:false}); 
                    }
                });
                $.each(listProduct,(key,val)=>{
                    if(val.productId===a){
                        that.setState({validationProductID:"success"}); 
                    }
                });
                if(that.state.validationProductID==="success"){
                    that.setState({show:true});
                }else{
                    that.setState({show:false});
                }
            })
            
        } 
        if(name+''==="quantity") this.setState({validationQuantity:"success"});
    }
    onSubmit=(e)=>{
        e.preventDefault();
        let { orderId,productId, quantity } = this.state;
            console.log("add orderItem: id:"+orderId +" productId:"+ productId +
            " quantity:"+ quantity);
        let orderObj = {
            status:"true",
            orderId: this.state.orderId,
            productId: productId,
            quantity: quantity,
        };
        if( orderObj.productId===undefined||orderObj.productId===''||
            orderObj.quantity===undefined||orderObj.quantity===''){
            if(orderObj.productId===undefined||orderObj.productId===''){
                this.setState({validationProductID:'error'});
            } 
            if(orderObj.quantity===undefined||orderObj.quantity==='') {
                this.setState({validationQuantity:'error'});
            }
            swal("Lỗi!", "Bạn vừa bỏ trống một số trường quan trọng!", "error");
            e.preventDefault();
        }else{
            swal("Xong!", "Bạn vừa thêm thành công!", "success");
            this.props.AddOrderItem(orderObj);
            this.setState({
                productId: '',
                validationProductID:null,
                validationQuantity:null,
            });
            // this.props.history.goBack();
        }
    }
    render() {
        var {orderItem,listProduct} = this.props;  
        return (<div>
             <Button onClick={this.handleClickOpen} variant="fab" mini color="secondary">
                <AddIcon />
            </Button>
            
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                  <div className="">
                    <div className="row" >
                    <h1>Thêm sản phẩm </h1>
                    <Form onSubmit={this.submitData}>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationProductID}
                            >
                            <div className="form-group">
                                <ControlLabel>Tên sản phẩm: </ControlLabel>
                                <FormControl  list="product-list" name="productId" onChange={this.onChange}/>
                                <datalist id="product-list">
                                    {
                                        listProduct.map(function(obj,ind){
                                            return(
                                                <option key={ind} value={obj.productId} >
                                                    {obj.productName}
                                                </option>
                                            );
                                        })
                                    }
                                </datalist>
                                <p style={{color:'red'}}  className={classNames({
                                    "show":!this.state.show,
                                    "hidden":this.state.show
                                    })}
                                >Mã sản phẩm không hợp lệ!!!</p>
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
                     </Form>
                    </div>
                </div>
              </DialogContent>
              <DialogActions>
                <div className="" style={{float:'right'}}>
                    <button onClick={this.handleClose} className="btn btn-primary">
                        <i className="glyphicon glyphicon-arrow-right"></i> Hủy
                    </button>{' '}
                    <button type="submit" onClick={this.onSubmit}
                        className={classNames({
                            "btn btn-primary":true,
                            "show":this.state.show,
                            "hidden":!this.state.show
                            })}
                        >
                        <i className="glyphicon glyphicon-save"></i> Thêm
                    </button>
                </div>    
              </DialogActions>
            </Dialog>

            <ReactTable data={orderItem}
                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                columns={[
                {
                    Header: "Mã đơn hàng",
                    id: "orderId",
                    accessor: d => d.orderId,
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["orderId"] }),
                    filterAll: true
                },
                {
                    Header: "Tên sản phẩm",
                    id: "productId",
                    accessor: d => d.productId,
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["productId"] }),
                    Cell: row=>{
                        var result ="";
                        listProduct.forEach((p, index) => {
                            if (p.productId === row.value) {
                                result = p.productName;
                            }
                        });
                        return result;
                    } ,
                    
                    filterAll: true
                },
                {
                    Header: "Số lượng",
                    id: "quantity",
                    accessor: d => d.quantity,
                    filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["quantity"] }),
                    filterAll: true
                },
                {
                    Header: "Edit",
                    accessor:"orderId",
                    filterable:false,
                    Cell: ({row}) => {
                        return( <div className="button-table"> 
                            <MyButton small aria_label='EDIT' 
                                orderId={row.orderId} 
                                productId={row.productId}
                                listProduct={listProduct}
                                quantity={row.quantity}
                                obj="orders"
                                icon="EDIT"
                            />
                        </div>
                        )}
                },
                {   
                    Header: "Delete",
                    accessor:"orderId",
                    filterable:false,
                    Cell: ({row}) => {
                        return (
                            <div className="button-table"> 
                                <MyButton 
                                    aria_label='DELETE' 
                                    icon="DELETE"
                                    listProduct={listProduct}
                                    orderId={row.orderId}
                                    productId={row.productId}
                                   /> 
                            </div>
        
                            )
                    }
                }]
               
            }
                defaultPageSize={5}
                className="-striped -highlight"
                style= {{textAlign:'center',height:'300px'}}
            />
        </div>
        );
}
}



const mapStateToProps = state => {
    return {
        itemEditing : state.itemOrderEditing,
        listCustomer:state.listCustomer,
        orderItem: state.orderItem,
        listProduct:state.products,
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
        fetchAllListOrderItem:(filter)=>{
            dispatch(actFetchOrderItemRequest(filter));
        },
        actGetAllProduct:()=>{
            dispatch(actGetAllProduct());
        },
        AddOrderItem:(orderIitem)=>{
            dispatch(actAddOrderItemRequest(orderIitem));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderItem);