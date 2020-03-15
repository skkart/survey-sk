import React from 'react';

// Every field component for survey Form
export default ({input, label, meta: {error, touched}}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom: '5px'}}/>
      <div className="red-text" style={{marginBottom: '20px'}}>
        {touched && error}
      </div>
    </div>
  );
}
