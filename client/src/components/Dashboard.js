import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductForm from './ProductForm';

class Dashboard extends Component {
  state = { products: [] };

  componentDidMount() {
    fetch('/api/products')
      .then( res => res.json() )
      .then( products => this.setState({ products }))
  }

  addProduct = (product) => {
    this.setState({ products: [product, ...this.state.products]});
  }

  render() {
    const { products } = this.state;
    return(
      <div>
        <ProductForm product={{}} addProduct={this.addProduct} />
        <ul>
          { products.map(product => {
            return(
              <li>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Dashboard;
