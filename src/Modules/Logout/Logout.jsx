import React from 'react';
import { func } from 'prop-types';

function Logout({ cbSetName }) {
  cbSetName(undefined);
  return <div />;
}

Logout.propTypes = {
  cbSetName: func.isRequired,
};

export default Logout;
