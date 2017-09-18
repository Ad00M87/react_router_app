/*eslint no-restricted-globals: ["warn", "event", "fdescribe"]*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductForm from './ProductForm';

class Product extends Component {
  state = { product: {}, editing: false }

  componentDidMount() {
    this.fetchProducts()
  }

  componentDidUpdate() {
    this.fetchProducts()
  }

  fetchProducts = () => {
    axios.get(`/api/products/${this.props.match.params.id}.json`)
      .then( res => this.setState({ product: res.data }))
  }

  toggleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  successRedirect = () => {
    this.props.history.push(`/products/${this.state.product.id}`)
  }

  deleteProduct = () => {
    if(confirm('Really Delete?')) {
      axios.delete(this.state.product.url)
        .then( res => {
          this.props.history.push('/dashboard');
        })
        .catch( res => {
          // TODO: handle client side errors better. HINT: flash messages in react
          console.log('error deleting product');
        })
    }
  }

  render() {
    const { editing, product: { name, description, price, department } } = this.state;

    if(editing) {
      return(
        <ProductForm
          product={this.state.product}
          cancelAction={this.toggleEdit}
          successRedirect={this.successRedirect}
        />
      )
    } else {
      return(
        <div>
          <h1>{name}</h1>
          <h3>{description}</h3>
          <h3>{price}</h3>
          <h3>{department}</h3>
          <button onClick={this.toggleEdit}>Edit</button>
          <button onClick={this.deleteProduct}>Delete</button>
          <hr />
          <Link to='/dashboard'>All Products</Link>
        </div>
      )
    }
  }
}

export default Product;
