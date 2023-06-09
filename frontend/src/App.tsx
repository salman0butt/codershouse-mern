import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';

const isAuth = false;
const user = {
  activated: false
};

interface GuestRouteProps extends RouteProps {
  children: React.ReactNode;
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children, ...rest }) => {

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuth ? (
          <Redirect
            to={{
              pathname: '/rooms',
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
}

const SemiProtectedRoute: React.FC<GuestRouteProps> = ({ children, ...rest }) => {

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          children
        ) : (<Redirect
          to={{
            pathname: '/rooms',
            state: { from: location },
          }}
        />);
      }}
    />
  );
}


const ProtectedRoute: React.FC<GuestRouteProps> = ({ children, ...rest }) => {

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !isAuth ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        ) : isAuth && !user.activated ? (
          <Redirect
            to={{
              pathname: '/activate',
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
}

export default App;
