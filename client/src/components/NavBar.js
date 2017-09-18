import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../fakeAuth';

const NavBar = ({ history }) => (
  <nav>
    <NavLink exact to='/' activeStyle={styles.active}>Home</NavLink>
    {' '}
    <NavLink to='/about' activeStyle={styles.active}>About</NavLink>
    {' '}
    { isAuthenticated() ?
      <span>
        <NavLink activeStyle={styles.active} to='/dashboard'>Dashboard</NavLink>
        <button onClick={ () => {
          logout();
          history.push('/login');
        }}>
          Logout
        </button>
      </span>
      :
      <NavLink activeStyle={styles.active} to='/login'>Login</NavLink>
    }
  </nav>
)

const styles = {
  active: {
    textDecoration: 'underline',
    fontWeight: 'bold',
    color: 'red',
    fontSize: '18px'
  }
}

export default withRouter(NavBar);
