import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import AuthContext from '../AuthContext';

// Official Doc: https://reactrouter.com/web/example/auth-workflow

const PublicOnlyRoute = ({ component: Component, path }) => {
  const location = useLocation();
  const authStatus = useContext(AuthContext);
  return (
    <Route
      path={path}
      render={() => (
        authStatus.authStatus
          ? (
            <Redirect to={{ pathname: '/dashboard', state: { from: location } }} />
          )
          : (
            <Component />
          )
      )}
    />
  );
};

PublicOnlyRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};

export default PublicOnlyRoute;
