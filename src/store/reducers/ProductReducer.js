import { ADD_PRODUCT } from '../Actions/actionTypes';

const initialState = {};

export default function productReducer(state = initialState, action) {
  switch (action && action.type) {
    case ADD_PRODUCT:
      if (state[action.payload.id])
        return {
          ...state,
          [action.payload.id]: { product: action.payload, amount: state[action.payload.id].amount + 1 },
        };
      return { ...state, [action.payload.id]: { product: action.payload, amount: 1 } };
    default:
      return state;
  }
}

// return { ...state, [action.payload.id]: { product: action.payload, amount: state[action.payload.id].amount + 1 } };
