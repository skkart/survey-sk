import React from 'react';
import {connect} from 'react-redux'
import {map} from 'lodash'
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';


const SurveyReview = ({onReviewCancel, formValues, submitSurvey, history}) => {

  const reviewFields = map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {reviewFields}
      </div>
      <button className="yellow btn-flat left darken-3" onClick={onReviewCancel}>
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStatesToProps(state) {
  console.log(state)
  return {
    formValues: state.form.surveyForm.values
  };
}

export default connect(mapStatesToProps, actions)(withRouter(SurveyReview));