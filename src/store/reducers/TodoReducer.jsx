import { ADD_TODO, COMPLETE_TODO } from '../Actions/actionTypes';

function TodoReducer(state = {}, action) {
  switch (action && action.type) {
    case ADD_TODO: {
      const { payload: newTodo } = action;

      return {
        ...state,
        [newTodo.id]: newTodo,
      };
    }
    case COMPLETE_TODO: {
      const { payload: idToComplete } = action;

      const { [idToComplete]: toComplete, ...rest } = state;

      return {
        ...rest,
      };
    }

    default:
      return state;
  }
}

// eslint-disable-next-line import/prefer-default-export
export { TodoReducer };
