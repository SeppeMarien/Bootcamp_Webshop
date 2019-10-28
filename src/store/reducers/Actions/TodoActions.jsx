const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';

// eslint-disable-next-line import/prefer-default-export
export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo,
  };
}

export function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    payload: id,
  };
}
