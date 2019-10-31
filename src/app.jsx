import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { object } from 'prop-types';
import Home from './Modules/Home/Home';
import NotFound from './Modules/Pages/NotFound';
import NavigationBar from './Modules/Navigation/NavigationBar';
import { LoggedIn } from './Providers/Providers';
import Login from './Modules/LoginControlled/Login';
import ProtectedRoute from './components/ProtectedRoute';

import store from './store/store';
import Todos from './Modules/Todo/Todos';
import ShoppingList from './Modules/ShoppingList/ProductList';
import Checkout from './Modules/Checkout/Checkout';
import Logout from './Modules/Logout/Logout';

function AppWithoutRender({ initialUser = '' }) {
  const [userName, setUserName] = useState(initialUser);

  function setUser(user) {
    setUserName({ userName: user });
  }

  return (
    <>
      <LoggedIn.Provider value={userName}>
        <NavigationBar />
        <Switch>
          <Route path="/login" exact render={() => <Login cbSetName={setUser} />} />
          <Route path="/logout" exact render={() => <Logout cbSetName={setUser} />} />
          <ProtectedRoute path="/todos" exact component={Todos} />
          <Route path="/products" exact component={ShoppingList} />
          <ProtectedRoute path="/checkout" exact component={Checkout} />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </LoggedIn.Provider>
    </>
  );
}

AppWithoutRender.propTypes = {
  initialUser: object,
};

AppWithoutRender.defaultProps = {
  initialUser: undefined,
};

export function App(initialUser = '') {
  return (
    <>
      <Router>
        <Provider store={store}>
          <AppWithoutRender initialUser={initialUser} />
        </Provider>
      </Router>
    </>
  );
}

export default hot(App);
export { AppWithoutRender };
