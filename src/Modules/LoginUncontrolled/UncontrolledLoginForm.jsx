import React, { useState } from 'react';
import LoginForm from './components/LoginForm';

function UncontrolledLoginForm() {
  const [currentUser, setCurrentUser] = useState();
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = username => {
    setCurrentUser(username);
    setSubmitted(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="card col-sm-6">
          <div className="card-body">
            <h4 className="card-title">Sign in</h4>
            {submitted &&
              (!currentUser ? (
                <p className="text-center text-danger" role="alert">
                  Unknown user or password
                </p>
              ) : (
                <p className="text-center text-success" role="alert">
                  yippie-kay-ey
                </p>
              ))}
            <LoginForm onLogin={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UncontrolledLoginForm;
