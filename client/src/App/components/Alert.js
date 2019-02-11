import React from 'react';
import PropTypes from 'prop-types';

import alertImage from '../assets/sad-bulbasaur.jpg';

const Alert = (props) => {
  const {
    msg,
  } = props;
  return (
    <div className="alert-wrapper">
      <div className="alert-image-wrapper">
        <img src={alertImage} alt="sad bulbasaur" className="alert__image" />
      </div>
      <div className="alert alert--danger">
        { msg }
      </div>
    </div>
  );
}

export default Alert;

Alert.propTypes = {
  msg: PropTypes.string.isRequired,
};
