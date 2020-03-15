import React, {Component} from 'react';
import {connect} from 'react-redux';

class Landing extends Component {
  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h3>Get your App Surveyed !!!</h3>
        Collect feedback from your users
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth}
}

export default connect(mapStateToProps)(Landing);
