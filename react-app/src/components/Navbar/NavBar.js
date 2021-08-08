
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { login } from '../../store/session';
import styles from './NavBar.module.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const handleDemoLogin = async (email, password) => {
    await dispatch(login(email, password))
  };

  return (
    <div>
      <nav className={styles.navBar}>
        <section className={styles.navBarLeft}>
            <div>
              <NavLink  className={styles.navLink} to='/materials' exact={true} activeClassName='active'>
              <div><i class="fas fa-scroll"></i> Articles</div>
              </NavLink>
            </div>
            <div>
              <NavLink className={styles.navLink} to='/create' exact={true} activeClassName='active'>
              <i class="fas fa-folder-plus"></i>Create An Article
              </NavLink>
            </div>
        </section>
        <section className={styles.navBarCenter}>
          <NavLink to='/' className={styles.logo} exact={true} activeClassName='active'>
            RESOURCESINC
          </NavLink>
        </section>
        <section className={styles.navBarRight}>
          {(user ?
            <div><LogoutButton /></div>
            :
            (<div>
              <button
                type='button'
                className={styles.demoBtn}
                onClick={() => handleDemoLogin("jackson@ri.io", "password")}
              >Demo</button>
              <NavLink to='/login' className={styles.logInLink}>Log in</NavLink>
              <LogoutButton />
            </div>)
          )}
        </section>
            <NavLink to='/users' className={styles.navLink} exact={true} activeClassName='active'>
              Users
            </NavLink>




      </nav>
    </div>
  );
}

export default NavBar;
