import { ADD_NOTIFICATION } from './actionTypes';

// eslint-disable-next-line import/prefer-default-export
export function AddNotification(payload) {
  return {
    type: ADD_NOTIFICATION,
    payload,
  };
}
