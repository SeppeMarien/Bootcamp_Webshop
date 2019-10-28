import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { TodoReducer } from './reducers/TodoReducer';

const reducer = combineReducers({
  todos: TodoReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
