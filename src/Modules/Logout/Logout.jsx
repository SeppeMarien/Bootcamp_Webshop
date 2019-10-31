import React from 'react';
import { Redirect } from 'react-router-dom';
import { func } from 'prop-types';

function Logout({ cbSetName }) {
  cbSetName(undefined);
  return <Redirect to="/" />;
}

Logout.propTypes = {
  cbSetName: func.isRequired,
};

export default Logout;
