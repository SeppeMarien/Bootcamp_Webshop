import { addTodo, completeTodo } from './TodoActions';

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} name
 * @property {bool} [completed]
 */
const todo = {
  id: 1,
  name: 'Make some tests!',
  completed: false,
};

describe('Todo action creator', () => {
  test('it returns action object with right payload', () => {
    const action = addTodo(todo);

    expect(action).toStrictEqual({
      type: 'ADD_TODO',
      payload: todo,
    });
  });

  test('it retrun action object of type completeTodo', () => {
    const actionCompletedTodo = completeTodo(1);

    expect(actionCompletedTodo).toStrictEqual({
      type: 'COMPLETE_TODO',
      payload: 1,
    });
  });
});
