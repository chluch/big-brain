import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import AuthContext from './AuthContext';
import JoinGame from './pages/JoinGame';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EditGame from './pages/EditGame';
import EditQuestion from './pages/EditQuestion';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import PrivateRoute from './component/PrivateRoute';
import PublicOnlyRoute from './component/PublicOnlyRoute';
import LogoutLink from './component/LogoutLink';
import Results from './pages/Results';

function App() {
  const [authStatus, setAuthStatus] = useState(false);
  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      <Router>
        <header>
          <nav className="navbar">
            <h1>Big Brain</h1>
            <ul>
              <li>
                <Link to="/play" className="navLink" value="Join Game">
                  Join Game
                </Link>
              </li>
              {authStatus
                ? (
                  <>
                    <li><Link to="/dashboard" className="navLink">Dashboard</Link></li>
                    <li><LogoutLink /></li>
                  </>
                )
                : (
                  <>
                    <li><Link to="/" className="navLink">Login</Link></li>
                    <li><Link to="/signup" className="navLink">Signup</Link></li>
                  </>
                )}
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route component={JoinGame} exact path="/play/:sId?" />
            <PublicOnlyRoute component={Signup} exact path="/signup" />
            <PublicOnlyRoute component={Login} exact path="/" />
            <PrivateRoute component={Dashboard} path="/dashboard" />
            <PrivateRoute component={Results} path="/results/:quizId/:gId" />
            <PrivateRoute component={EditGame} exact path="/edit/:gId" />
            <PrivateRoute component={EditQuestion} exact path="/edit/:gId/:qId" />
            <Route component={Error} path="/error" />
            <Route component={NotFound} path="*" />
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
