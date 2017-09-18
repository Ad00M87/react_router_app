import React, { Component } from 'react';
import axios from 'axios';

class ProductForm extends Component {
  state = { name: this.props.product.name, description: this.props.product.description,
            price: this.props.product.price, department: this.props.product.department }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, department } = this.state;
    const { product } = this.props;

    if(Object.keys(product).length) {
      axios.put(product.url, { product: { name, description, department, price } })
        .then( res => {
          this.props.cancelAction();
        })
        .catch( res => {
          // TODO: handle client side errors better
          console.log('error updating product');
        });
      } else {
        axios.post(`/api/products.json`, { product: { name, description, department, price }})
          .then( res => {
            // res.data = new product in our database
            this.setState({ name: '', description: '', price: '', department: ''})
            this.props.addProduct(res.data)
          })
          .catch( res => {
            console.log('error creating product')
          });
      }
  }

  setValue = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value })
  }

  render() {
    const { name, description, price, department } = this.state;
    const { cancelAction } = this.props;

    return(
      <form onSubmit={this.handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={this.setValue}
          id='name'
          required
          placeholder='Product Name'
        />
        <br />
        <label>Description</label>
        <textarea
          value={description}
          onChange={this.setValue}
          id='description'
          required
          placeholder='Product Description'
        />
        <br />
        <label>Price</label>
        <input value={price} onChange={this.setValue} id='price' type='number' required />
        <br />
        <label>Department</label>
        <input
          value={department}
          onChange={this.setValue}
          id='department'
          required
          placeholder='Product Department'
        />
        <br />
        { cancelAction && <button type='button' onClick={cancelAction}>Cancel</button> }
        <input type='submit' />
      </form>
    )
  }
}

export default ProductForm;
