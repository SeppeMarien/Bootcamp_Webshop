import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './Modules/Home/Home';
import NotFound from './Modules/Pages/NotFound';
import NavigationBar from './Modules/Navigation/NavigationBar';
import { LoggedIn } from './Providers/Providers';
import Login from './Modules/LoginControlled/Login';

import store from './store/store';
import Todos from './Modules/Todo/Todos';

function AppWithoutRender() {
  const [userName, setUserName] = useState('');

  function setUser(user) {
    setUserName(user);
  }

  return (
    <>
      <LoggedIn.Provider value={userName}>
        <NavigationBar />
        <Switch>
          <Route path="/login" exact render={() => <Login cbSetName={setUser} />} />
          <Route path="/todos" exact component={Todos} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </LoggedIn.Provider>
    </>
  );
}

export function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <AppWithoutRender />
        </Provider>
      </Router>
    </>
  );
}

export default hot(App);
export { AppWithoutRender };
