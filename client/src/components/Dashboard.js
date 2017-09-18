import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  state = { products: [] };

  componentDidMount() {
    fetch('/api/products')
      .then( res => res.json() )
      .then( products => this.setState({ products }))
  }

  render() {
    const { products } = this.state;
    return(
      <ul>
        { products.map(product => {
          return(
            <li>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Dashboard;
