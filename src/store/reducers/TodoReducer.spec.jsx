import { TodoReducer } from './TodoReducer';
import { addTodo, completeTodo } from './Actions/TodoActions';

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} name
 * @property {bool} [completed]
 */
function createTodo(id, completed = false) {
  return {
    id,
    name: `Mocked test ${id}.`,
    completed,
  };
}

describe('Todo reducer', () => {
  test('it has empty object as initial state', () => {
    const todoInit = TodoReducer();

    expect(todoInit).toStrictEqual({});
  });

  test('it spreads the existing state', () => {
    const todo = createTodo(1);

    const initialState = {
      0: {
        id: 0,
        name: 'Make some tests!',
        completed: false,
      },
    };

    const newState = TodoReducer(initialState, addTodo(todo));

    expect(newState).toStrictEqual({
      ...initialState,
      [todo.id]: todo,
    });
  });

  test('it returns the todos without completed todo without touching others', () => {
    const initialState = { 1: createTodo(1), 2: createTodo(2) };

    const newState = TodoReducer(initialState, completeTodo(1));

    const { 1: deletedFromTodos, ...rest } = initialState;

    expect(newState).toStrictEqual({
      ...rest,
    });
  });
});
