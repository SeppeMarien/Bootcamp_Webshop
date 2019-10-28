/* eslint-disable import/prefer-default-export */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function NotificationCounter() {
  return (
    <div>
      <FontAwesomeIcon role="img" icon={faEnvelope} /> 0
    </div>
  );
}
