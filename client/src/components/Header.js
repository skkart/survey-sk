import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'; // To navigate within react views
import Payments from './Payments'

class Header extends Component {
  renderContent () {
    // Check the user is Oauth with google
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        );
      default:
        return [
          <li key="1"><Payments/></li>,
          <li key="3" style={{margin: '0 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render () {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys': '/'}
                className="left brand-logo">
            Survey House
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth}
}

export default connect(mapStateToProps)(Header);
