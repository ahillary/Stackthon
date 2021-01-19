import React from 'react';
import {connect} from 'react-redux';
import {fetchUser} from '../../store/redux/users/usersReducer';

class SingleUser extends React.Component {
  componentDidMount() {
    this.props.loadUser(this.props.match.params.userId);
  }

  render() {
    const userItem = this.props.userList;
    if (!userItem.length) {
      return 'No one to see here';
    }
    const user = userItem.find(
      (useritem) => useritem.id == this.props.match.params.userId
    );
    if (!user) {
      return 'No one to see here';
    }

    return (
      <div id="single-view">
        <p>
          User name: {user.firstName} {user.lastName}
        </p>
        <p>User email: {user.email}</p>
        <p>User is Admin: {`${user.isAdmin}`}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {userList: state.usersReducer};
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleUser);
