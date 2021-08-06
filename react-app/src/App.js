import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginFormModal/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/Home';
import MaterialFolder from './components/MaterialFolder';
import SingleMaterial from './components/SingleMaterial';
import EditMaterial from './components/EditMaterial'
import CreatesMaterialForm from './components/CreateMaterialForm';
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
        <MaterialFolder allMaterials={allMaterials} />
        </Route>
        <ProtectedRoute path='/create' exact={true}>
        <NavBar />
          <CreatesMaterialForm/>
        </ProtectedRoute>
        <Route path='/materials/:materialId' exact={true}>
        <NavBar />
        <SingleMaterial />
        <h1>this is where an individual material will be displayed</h1>
        </Route>
        <Route path='/materials/:materialId/edit' exact={true}>
        <NavBar/>
        <EditMaterial/>
        <h1>this is where an individual material will be edited</h1>
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
          <h1>you made it</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
