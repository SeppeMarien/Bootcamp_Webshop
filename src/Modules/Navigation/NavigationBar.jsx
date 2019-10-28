import { NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { LoggedIn } from '../../Providers/Providers';
import NotificationCounter from '../Notifications/NotificationCounter';

function NavigationBar() {
  const pathToLogo = '../../public/images/js-logo.png';

  const userLoggedIn = useContext(LoggedIn);

  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        <img src={pathToLogo} width="30" height="30" className="d-inline-block align-top" alt="Bootcamp Logo" />
        Bootcamp
      </NavLink>
      <NavLink className="navbar-brand" to="/todos">
        {' '}
        todos
      </NavLink>
      {userLoggedIn ? (
        <>
          <NotificationCounter />
          <NavLink className="navbar-brand" to="/logout">
            Log Out
          </NavLink>
        </>
      ) : (
        <NavLink className="navbar-brand" to="/login">
          Log In
        </NavLink>
      )}
    </nav>
  );
}

export default NavigationBar;
