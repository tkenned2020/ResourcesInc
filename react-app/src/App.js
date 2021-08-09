import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginFormModal/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/Home';
import PersistFooter from './components/FooterComp'
import MaterialFolder from './components/MaterialFolder';
import SingleMaterial from './components/MaterialFolder/Individual/SingleMaterial';
import EditMaterial from './components/MaterialFolder/Edit/EditMaterial'
import CreatesMaterialForm from './components/MaterialFolder/CreateMaterialForm';
import CommentEdit from './components/CommentFolder/EditComment.js';
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
        <PersistFooter />
        </Route>
        <Route path='/sign-up' exact={true}>
        <NavBar />
          <SignUpForm />
          <PersistFooter />
        </Route>
        <Route path='/materials' exact={true}>
        <NavBar />
        <MaterialFolder allMaterials={allMaterials} />
        <PersistFooter />
        </Route>
        <ProtectedRoute path='/create' exact={true}>
        <NavBar />
          <CreatesMaterialForm/>
          <PersistFooter />
        </ProtectedRoute>
        <Route path='/materials/:materialId' exact={true}>
        <NavBar />
        <SingleMaterial />
        <PersistFooter />
        </Route>
        <Route path='/materials/:materialId/edit' exact={true}>
        <NavBar/>
        <EditMaterial/>
        <CommentEdit />
        <PersistFooter />
        </Route>
        <ProtectedRoute path='/comment/edit' exact={true}>
        <NavBar/>
          <PersistFooter />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
        <NavBar />
          <UsersList/>
          <PersistFooter />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
        <NavBar />
          <User />
          <PersistFooter />
        </ProtectedRoute>
        <Route path='/' exact={true} >
        <NavBar />
        <Home />
        <PersistFooter />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
