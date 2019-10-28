import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

import Todos from './Todos';
import { renderWithRedux } from '../../../test/react-testing-helpers';

function initialTodos() {
  return {
    0: {
      id: 0,
      name: 'Shoot stupid people',
      completed: false,
    },
  };
}

const renderTodos = () => {
  return renderWithRedux(<Todos />, {
    initialState: {
      todos: initialTodos(),
    },
  });
};

describe('Todos component testing', () => {
  test('it render todos comp by default', () => {
    const { getByRole, getByText } = renderTodos();
    getByRole('heading');
    getByText(/remaining/);
  });

  describe('list of remaining todos', () => {
    test('it renders the list of the dotos', () => {
      const { getByRole } = renderTodos();
      getByRole('list');
    });

    test('it removes taskes when clicked', () => {
      const { queryByLabelText } = renderTodos();
      let box = queryByLabelText('Shoot stupid people');
      fireEvent.click(box);

      box = queryByLabelText('shoot stupid people');
      expect(box).not.toBeInTheDocument();
    });
  });

  // test('it add item to list', () => {
  //   const { queryByText, getByRole, getByText } = renderTodos();

  //   const input = getByRole('textbox');
  //   const form = getByRole('form');

  //   fireEvent.change(input, { target: { value: 'Shoot stupid people again' } });
  //   fireEvent.submit(form);

  //   expect(queryByText(/Shoot stupid people again/)).toBeInTheDocument();
  // });
});
