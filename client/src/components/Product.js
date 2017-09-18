import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Product extends Component {
  state = { product: {} }

  componentDidMount() {
    fetch(`/api/products/${this.props.match.params.id}`)
      .then( res => res.json() )
      .then( product => this.setState({ product }))
  }

  render() {
    const { product: { name, description, price, department } } = this.state;

    return(
      <div>
        <h1>{name}</h1>
        <h3>{description}</h3>
        <h3>${price}</h3>
        <h3>{department}</h3>
        <hr />
        <Link to='/dashboard'>All Products</Link>
      </div>
    )
  }
}

export default Product;
