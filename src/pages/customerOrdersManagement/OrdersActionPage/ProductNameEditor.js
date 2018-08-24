import React, { Component } from 'react';
import { actGetAllProduct }  from 'redux/productManagement/actions/index';

import { connect } from 'react-redux';
 class NameEditor extends Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      name: props.defaultValue,
      open: true
    };
  }
  componentDidMount(){
    this.props.actGetAllProduct();
}
  focus() {
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.name);
  }
  close = () => {
    this.setState({ open: false });
    this.props.onUpdate(this.props.defaultValue);
  }
  render() {
    const fadeIn = this.state.open ? 'in' : '';
    const display = this.state.open ? 'block' : 'none';
    var {listProduct} = this.props;
    return (
      <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
              <input
                ref='inputRef'
                className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
                style={ { display: 'inline', width: '50%' } }
                list="product-list" 
                value={ this.state.name }
                onChange={ e => { this.setState({ name: e.currentTarget.value }); } } />
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
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
              <button type='button' className='btn btn-default' onClick={ this.close }>Close</button>
            </div>
          </div>
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
      isFetching:state.isFetchingOrder,
      listProduct:state.products,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      actGetAllProduct:()=>{
          dispatch(actGetAllProduct());
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameEditor);