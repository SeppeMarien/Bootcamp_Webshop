/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Login from './Login';
import '@testing-library/jest-dom/extend-expect';

const renderLogin = () => {
  return render(<Login cbSetName={jest.fn(x => x + 10)} />);
};

describe('login form', () => {
  describe('Login form rendering', () => {
    test('Does form renders with input field username ane password', () => {
      const { getByPlaceholderText } = renderLogin();

      getByPlaceholderText('username');
      getByPlaceholderText('******');
    });

    test('it renders without showing error message', () => {
      const { queryByRole } = renderLogin();

      const alert = queryByRole('alert');

      expect(alert).not.toBeInTheDocument();
    });
  });

  test('it should focus username by default', () => {
    const { getByPlaceholderText } = renderLogin();
    const username = getByPlaceholderText('username');

    expect(username).toHaveFocus();
  });

  test('It has a password input of type password', () => {
    const { getByPlaceholderText } = renderLogin();
    const pass = getByPlaceholderText('******');

    expect(pass).toHaveProperty('type', 'password');
  });

  describe('validate user', () => {
    test('invalid user', () => {
      const { getByRole, getByLabelText } = renderLogin();
      const button = getByRole('button');
      const username = getByLabelText('Your username');
      const password = getByLabelText('Your password');

      fireEvent.change(username, { target: { value: 'Jean-Luc' } });
      fireEvent.change(password, { target: { value: 'Jeannine' } });

      fireEvent.click(button);

      const alert = getByRole('alert');

      expect(alert).toBeInTheDocument();
    });

    test('valid user', () => {
      const { getByRole, getByLabelText, queryByRole } = renderLogin();
      const button = getByRole('button');
      const username = getByLabelText('Your username');
      const password = getByLabelText('Your password');

      fireEvent.change(username, { target: { value: 'Seppe' } });
      fireEvent.change(password, { target: { value: 'valid' } });

      fireEvent.click(button);

      const alert = queryByRole('alert');

      expect(alert).not.toBeInTheDocument();
    });
  });
});

// getby label text
