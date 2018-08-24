import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import $ from 'jquery';
import classNames from 'classnames';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { actGetAllProduct }  from 'redux/productManagement/actions/index';
import { actAddOrderItemRequest,actFetchOrderItemRequest ,
    actUpdateOrderItemRequest,actDeleteOrderItemRequest
    }  from 'redux/orderItemManagement/actions/index';

import swal from 'sweetalert'; 
import {FormGroup,ControlLabel,FormControl,Form} from 'react-bootstrap';
const styles = theme => ({
    button: {
      margin:0,
      padding:0

    },
    input: {
      display: 'none',
    },
  });
  
class IconButtons extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        open: false,
        orderId: '',
        productId: '',
        quantity: '',
        validationOrderId:null,
        validationProductID:null,
        validationQuantity:null,
        productChange:''
      };
  }
  componentDidMount(){
      this.setState({orderId:this.props.orderId,productId:this.props.productId});
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
        [name]: value
    });
    if(name+''==="productChange"){
            var that=this;
            $("input[name=productChange]").bind('input',function(){
                var a=$("input[name=productChange]").val();
                var allProductOrder = that.props.orderItem;
                var {listProduct} = that.props;
                that.setState({validationProductID:"error"}); 
               
                $.each(listProduct,(key,val)=>{
                    if(val.productId===a){
                        that.setState({validationProductID:"success"}); 
                    }
                });
                $.each(allProductOrder,(key,val)=>{
                    if(val.productId===a){
                        that.setState({validationProductID:"error",show:false});
                        console.log("error"); 
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
  onDeleteCustomerOrders = () => { 
    var {onDelete} = this.props;
    var {orderId,productId}=this.props;
    swal({
        title: "Bạn chắc chưa?",
        text: "Suy nghĩ cho kỉ nghe chưa, xóa là đếch lấy lại được đâu!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            onDelete(orderId,productId);
            
            swal("OK! Mất rồi đấy!", {
                icon: "success",
            });
        } else {
            swal("Có sự cố gì rồi bạn à!");
        }
    });

}
    onSubmit = (e) => {
        e.preventDefault();
        let { orderId,productId, quantity,productChange } = this.state;
            console.log("add orderItem: id:"+orderId +" productId:"+ productId +
            " quantity:"+ quantity+" product change: "+productChange);
        let orderObj = {
            orderId: orderId,
            productId: productId,
            quantity: quantity,
            productChange:productChange
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
            swal("Xong!", "Bạn vừa sửa thành công!", "success");
            this.props.onUpdate(orderObj);
            this.setState({ open: false });
            this.setState({
                productChange:'',
                validationOrderId:null,
                validationProductID:null,
                validationQuantity:null,
            });
            // this.props.history.goBack();
        }
    }
    

  render() {
      var {classes,icon} = this.props;
      var {listProduct,quantity,productId} = this.props;
      if(icon==='DELETE'){
          return (<div>
              <IconButton onClick={this.onDeleteCustomerOrders} className={classes.button} aria-label="Delete" color="primary">
                  <DeleteIcon />
              </IconButton>
            </div>
          );

      }else if(icon==='EDIT'){
        return (  <div>
            <IconButton onClick={this.handleClickOpen} className={classes.button} aria-label="Delete" color="primary">
                <EditIcon></EditIcon>
            </IconButton>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                  <div className="">
                    <div className="row" >
                    <h1>Sửa thông tin </h1>
                    <Form onSubmit={this.submitData}>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.state.validationProductID}
                            >
                            <div className="form-group">
                                <ControlLabel>Tên sản phẩm: </ControlLabel>
                                <FormControl list="product-list" name="productChange" onChange={this.onChange}/>
                                <datalist id="product-list">
                                    <option key="acb" defaultValue={productId}>
                                        {productId}
                                    </option>
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
                                    defaultValue={quantity}
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
                        <i className="glyphicon glyphicon-save"></i> Save
                    </button>
                </div>    
              </DialogActions>
            </Dialog>
          </div>
        );
      }
  }
}
IconButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
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
        onDelete:(orderId,productId)=>{
            dispatch(actDeleteOrderItemRequest(orderId,productId)); 
        },
        onUpdate:(OrderItem)=>{
            dispatch(actUpdateOrderItemRequest(OrderItem)); 
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IconButtons));