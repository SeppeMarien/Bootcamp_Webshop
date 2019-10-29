import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { addTodo, completeTodo } from '../../store/Actions/TodoActions';
import { LoggedIn } from '../../Providers/Providers';
// import * as todoActions from '../../store/reducers/Actions/TodoActions';

const Todos = () => {
  const [todoName, setTodoName] = useState('');
  const todos = useSelector(state => Object.values(state.todos));
  const dispatch = useDispatch();
  const userName = useContext(LoggedIn);

  function onTodoNameChange(e) {
    const {
      target: { value },
    } = e;

    setTodoName(value);
  }

  function itemCompleted(e) {
    const {
      target: { name },
    } = e;

    dispatch(completeTodo(name));
  }

  function addItem(e) {
    e.preventDefault();
    let highestId = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].id >= highestId) highestId = todos[i].id + 1;
    }

    dispatch(addTodo({ id: highestId, name: todoName, completed: false }));
  }

  if (!userName) return <Redirect to="/login" />;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="todos col-4">
          <h1>Todos</h1>
          <form onSubmit={addItem}>
            <input
              value={todoName}
              type="text"
              aria-label="newTodoName"
              className="form-control"
              placeholder="Add todo"
              onChange={e => onTodoNameChange(e)}
            />
          </form>
          <hr />
          <ul className="list-unstyled todos__list">
            {todos &&
              Object.values(todos).map(todo => {
                if (!todo.completed) {
                  return (
                    <li key={`${todo.name}_${todo.id}`} className="todos__list-item">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            name={todo.id}
                            onClick={e => itemCompleted(e)}
                            type="checkbox"
                            className="form-check-input"
                            value=""
                          />
                          {todo.name}
                        </label>
                      </div>
                    </li>
                  );
                }
                return false;
              })}
          </ul>
          <hr />
          <div className="todos__footer">
            <strong>
              <span>{todos.length}</span>
            </strong>{' '}
            {todos.length === 1 ? `item remaining` : `items remaining`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
