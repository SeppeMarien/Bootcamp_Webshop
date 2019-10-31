import React from 'react';
import { renderWithRouter } from '../../../test/react-testing-helpers';
import Logout from './Logout';

describe('logout module', () => {
  const mockedSetUser = jest.fn(x => x);

  const renderLogout = () => {
    return renderWithRouter(<Logout cbSetName={mockedSetUser} />, { route: '/logout' });
  };

  test('it uses its cbSetName function (prop)', () => {
    renderLogout();
    expect(mockedSetUser).toHaveBeenCalledWith(undefined);
  });

  test('it redirects to home', () => {
    const { history } = renderLogout();
    expect(history.location.pathname).toBe('/');
  });
});
