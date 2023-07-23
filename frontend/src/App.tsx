import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom'
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Room from './components/Room/Room';

interface GuestRouteProps extends RouteProps {
  children: React.ReactNode;
}

const App: React.FC = () => {
  const { loading } = useLoadingWithRefresh();

  return loading ? (
    <Loader message="Loading, please wait.." />
  ) : (
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
        <ProtectedRoute path="/rooms/:id">
          <Room />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

const GuestRoute: React.FC<GuestRouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state: any) => state.auth);
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
  const { user, isAuth } = useSelector((state: any) => state.auth);
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
  const { user, isAuth } = useSelector((state: any) => state.auth);
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
