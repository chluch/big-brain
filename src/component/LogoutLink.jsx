import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthAPI from '../api/AuthAPI';
import AuthContext from '../AuthContext';

const LogoutLink = () => {
  const history = useHistory();
  const { setAuthStatus } = useContext(AuthContext);
  const handleLogout = async () => {
    const LogoutAPI = new AuthAPI();
    const ret = await LogoutAPI.logout();
    // if response === 200, an object {} is returned
    if (Object.keys(ret).length === 0 && ret.constructor === Object) {
      setAuthStatus(false);
      localStorage.clear();
      history.push('/');
    }
  };
  return (
    <Link to="/" className="navLink" id="logout-link" onClick={handleLogout} aria-label="logout-BigBrain">
      Logout
    </Link>
  );
};

export default LogoutLink;
