/* eslint-disable jest/no-disabled-tests */
import React from 'react';
import renderWithRouter from '../test/react-testing-helpers';
import { AppWithoutRender as App } from './app';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./Modules/Home/Home', () => () => {
  return <div data-testid="homeComp" />;
});

jest.mock('./Modules/LoginControlled/Login', () => () => {
  return <div data-testid="loginComp" />;
});

jest.mock('./Modules/Pages/NotFound', () => () => {
  return <div data-testid="notFoundComp" />;
});

jest.mock('./Modules/Navigation/NavigationBar', () => () => {
  return <div data-testid="navComp" />;
});

describe('App testing', () => {
  describe('testing rendering', () => {
    test('it renders home component on default', () => {
      const { queryByTestId, getByTestId } = renderWithRouter(<App />);
      expect(queryByTestId('notFoundComp')).not.toBeInTheDocument();
      getByTestId('homeComp');
    });

    test('it renders Login component', () => {
      const { getByTestId, queryByTestId } = renderWithRouter(<App />, { route: '/login' });
      expect(queryByTestId('notFoundComp')).not.toBeInTheDocument();
      getByTestId('loginComp');
    });

    test('it renders the not found with unknown path', () => {
      const { getByTestId } = renderWithRouter(<App />, { route: '/thisWillNotBeFound' });
      getByTestId('notFoundComp');
    });

    test('It renders Navigation component', () => {
      const { queryByTestId, getByTestId } = renderWithRouter(<App />);
      expect(queryByTestId('notFoundComp')).not.toBeInTheDocument();
      getByTestId('navComp');
    });
  });
});