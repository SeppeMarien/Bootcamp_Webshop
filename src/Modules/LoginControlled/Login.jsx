import React, { useRef, useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { LoggedIn } from '../../Providers/Providers';

const Login = ({ cbSetName }) => {
  // set states
  const [isDisplayError, setIsDisplayError] = useState(false);
  const [userCreds, setUserCreds] = useState({
    username: '',
    password: '',
  });
  const user = useContext(LoggedIn);

  // reference for focus
  const usernameInput = useRef();

  // set focus by render
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  // known users to log in
  function users() {
    return {
      Seppe: {
        username: 'Seppe',
        password: 'valid',
      },
      Ludwig: {
        username: 'Ludiewieg',
        password: 'AlsoValid',
      },
    };
  }

  if (user) return <Redirect to="/" />;

  // validate users!
  const validateUser = e => {
    e.preventDefault();

    const validUsers = users();

    if (validUsers[userCreds.username] && validUsers[userCreds.username].password === userCreds.password) {
      setIsDisplayError(false);
      cbSetName(userCreds.username);
      return;
    }

    setIsDisplayError(true);
  };

  // handle changes form the form and save them in the state
  const handleFormChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    setUserCreds(state => ({ ...state, [name]: value }));
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="card col-sm-6">
            <div className="card-body">
              <h4 className="card-title">Sign in</h4>
              {isDisplayError && (
                <p className="text-danger text-center" role="alert">
                  Unknown user or password
                </p>
              )}
              <form onSubmit={validateUser}>
                <div className="form-group">
                  <label aria-label="username" htmlFor="usernameInput">
                    Your username
                  </label>
                  <input
                    ref={usernameInput}
                    onChange={handleFormChange}
                    id="usernameInput"
                    className="form-control"
                    placeholder="username"
                    value={userCreds.username}
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label aria-label="password" htmlFor="password">
                    Your password
                  </label>
                  <input
                    onChange={handleFormChange}
                    id="password"
                    className="form-control"
                    placeholder="******"
                    value={userCreds.password}
                    type="password"
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      );
    </>
  );
};
Login.propTypes = {
  cbSetName: PropTypes.func.isRequired,
};

export default Login;
