import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { TodoReducer } from './reducers/TodoReducer';
import productReducer from './reducers/ProductReducer';

const reducer = combineReducers({
  todos: TodoReducer,
  products: productReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
