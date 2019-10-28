/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { ADD_NOTIFICATION } from './Actions/actionTypes';

const initialState = {};

const NotificationReducerImmer = produce((draft, action) => {
  switch (action && action.type) {
    case ADD_NOTIFICATION: {
      const {
        payload: { to },
      } = action;

      if (draft[to]) {
        draft[to].push(action.payload);
      } else {
        draft[to] = [action.payload];
      }

      // 👌 Directly mutate draft
    }
  } // 💡 No default case immer auto
}, initialState);

export default NotificationReducerImmer;
