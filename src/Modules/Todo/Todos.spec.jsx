import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

import Todos from './Todos';
import { renderWithRedux } from '../../../test/react-testing-helpers';
import { LoggedIn } from '../../Providers/Providers';

function initialTodos() {
  return {
    0: {
      id: 0,
      name: 'Shoot stupid people',
      completed: false,
    },
  };
}

const renderTodos = name => {
  return renderWithRedux(
    <LoggedIn.Provider value={name}>
      <Todos />
    </LoggedIn.Provider>,
    {
      initialState: {
        todos: initialTodos(),
      },
    }
  );
};

jest.mock('../LoginControlled/Login', () => () => {
  return <div data-testid="loginComp" />;
});

describe('Todos component testing', () => {
  test('it render todos comp by default', () => {
    const { getByRole, getByText } = renderTodos('Joske');
    getByRole('heading');
    getByText(/remaining/);
  });

  describe('list of remaining todos', () => {
    test('it renders the list of the dotos', () => {
      const { getByRole } = renderTodos('Ludwig');
      getByRole('list');
    });

    test('it removes taskes when clicked', () => {
      const { queryByLabelText } = renderTodos('Seppe');
      let box = queryByLabelText('Shoot stupid people');
      fireEvent.click(box);

      box = queryByLabelText('shoot stupid people');
      expect(box).not.toBeInTheDocument();
    });
  });
});
