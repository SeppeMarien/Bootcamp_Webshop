/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { TodoReducer } from '../src/store/reducers/TodoReducer';

export function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
  } = {}
) {
  // eslint-disable-next-line no-undef
  return {
    ...render(ui, {
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper: props => <Router {...props} history={history} />,
    }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

export function renderWithRedux(ui, { initialState = {}, store = createStore(TodoReducer, initialState) } = {}) {
  return {
    ...render(ui, {
      wrapper: props => <Provider {...props} store={store} />,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

export default renderWithRouter;
