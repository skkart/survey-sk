import React from 'react';
import {Link} from 'react-router-dom';
import SurveryList from './surveys/SurveyList'

// Page after Oauth success
const Dashboard = () => {
  return (
    <div>
      <SurveryList/>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
