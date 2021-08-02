import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Material from './components/Material';
import { authenticate } from './store/session';
import { getMaterials } from './store/material';




function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const allMaterials = useSelector(state => state.materials)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
  {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
        <NavBar />
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
        <NavBar />
          <SignUpForm />
        </Route>
        <Route path='/materials' exact={true}>
        <NavBar />
        <Material allMaterials={allMaterials} />
        </Route>
        <Route path='/materials/materialId' exact={true}>
        <NavBar />
        <h1>this is where an individual material will be displayed</h1>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
        <NavBar />
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
        <NavBar />
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
        <NavBar />
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
