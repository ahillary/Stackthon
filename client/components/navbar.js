import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';

// see nav_hold.js for previous version
class Navbar extends Component {
  render() {
    const {handleClick, isLoggedIn, isAdmin, orderId} = this.props;
    return (
      <div id="navbar">
        <div id="store-name">
          <h1>Insecuritee</h1>
        </div>
        <nav>
          <div id="pages">
            <Link to="/home">Home</Link>
            <Link to="/products">Shop</Link>
            {isAdmin && isLoggedIn && <Link to="/addproduct">Add Product</Link>}
            {isAdmin && isLoggedIn && (
              <Link to="/users" className="admin-nav">
                Users
              </Link>
            )}
            {isLoggedIn && <Link to={`/cart/${orderId}`}>Cart</Link>}
            {isLoggedIn && (
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            )}
            {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
            {!isLoggedIn && <Link to="/home">Sign In</Link>}
          </div>
        </nav>
      </div>
    );
  }
}

/* * CONTAINER * */

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    orderId: state.user.order ? state.user.order.id : null,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/* * PROP TYPES * */

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
