// This component shows form & review
import React, {Component} from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from "./SurveryFormReview";
import {reduxForm} from 'redux-form';

class SurveyNew extends Component {
  state = {showFormReview: false};

  renderContent () {
    if (this.state.showFormReview) {
      return <SurveyReview
        onReviewCancel={() => this.setState({showFormReview: false})}
      />
    }
    return <SurveyForm
      onSurveySubmit={() => this.setState({showFormReview: true})}
    />
  }

  render () {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default  reduxForm({
  form: 'surveyForm',
})(SurveyNew);