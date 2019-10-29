import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import NavigationBar from './NavigationBar';
import { LoggedIn } from '../../Providers/Providers';
import { renderWithRouter } from '../../../test/react-testing-helpers';

jest.mock('../Notifications/NotificationCounter', () => () => {
  return <div data-testid="navNotificationCounter" />;
});

jest.mock('../../components/ShoppingCartBadge', () => () => {
  return <div data-testid="navShoppingBadge" />;
});

describe('Navigation bar component', () => {
  test('It renders by default', () => {
    const { getByRole } = renderWithRouter(<NavigationBar />);

    getByRole('navigation');
  });

  test('It renders with brand logo by default', () => {
    const { getByAltText } = renderWithRouter(<NavigationBar />);

    getByAltText('Bootcamp Logo');
  });

  test('It renders with brand text by default', () => {
    const { getByText } = renderWithRouter(<NavigationBar />);

    getByText('Bootcamp');
  });

  test('it renders with product link', () => {
    const { getByText } = renderWithRouter(<NavigationBar />);

    getByText('Products');
  });

  test('it renders the shopping cart badge', () => {
    const { getByTestId } = renderWithRouter(<NavigationBar />);
    expect(getByTestId('navShoppingBadge')).toBeInTheDocument();
  });

  describe('Log in, log out tests', () => {
    test('It renders with a log out link if user is logged in', () => {
      const { getByText, queryByText, getByTestId } = renderWithRouter(
        <LoggedIn.Provider value="Seppe">
          <NavigationBar UserLoggedIn />
        </LoggedIn.Provider>
      );

      const logIn = queryByText('Log In');
      expect(logIn).not.toBeInTheDocument();
      getByText('Log Out');

      getByTestId('navNotificationCounter');
    });

    test("It renders with a login link if user isn't logged int", () => {
      const { getByText, queryByText, queryByTestId } = renderWithRouter(
        <LoggedIn.Provider value={undefined}>
          <NavigationBar UserLoggedIn />
        </LoggedIn.Provider>
      );

      const logOut = queryByText('Log Out');
      expect(logOut).not.toBeInTheDocument();

      const img = queryByTestId('navNotificationCounter');
      expect(img).not.toBeInTheDocument();

      getByText('Log In');
    });
  });
});
