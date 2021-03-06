import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  AllUsers,
  SingleUser,
  Cart,
  Confirmation,
  AddProduct,
} from './components';
import {me} from './store';

/* * COMPONENT * */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route path="/confirmation" component={Confirmation} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/cart/:cartId" component={Cart} />
            {/* Routes placed here are only available after verifying user isAdmin */}
            {isAdmin && (
              <Switch>
                <Route exact path="/addproduct" component={AddProduct} />
                <Route exact path="/users" component={AllUsers} />
                <Route exact path="/users/:userId" component={SingleUser} />
              </Switch>
            )}
          </Switch>
        )}

        {/* Displays our Login component as a fallback route */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/* * CONTAINER * */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id. Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/* * PROP TYPES * */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
