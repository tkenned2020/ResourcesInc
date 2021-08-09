import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../../store/session';
import styles from '../../auth/SignInLogIn.module.css'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemoLogin = async (email, password) => {
    await dispatch(login(email, password))
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className={styles.formBackground}>
      <div className={styles.signUpLinkContainer}>
        <p><strong><em>Not Already Apart Of The Family?</em></strong>
          <span>
            <NavLink to='/sign-up' className={styles.signUpLink}> <i class="fas fa-user-plus"></i> Sign up !</NavLink>
          </span>
        </p>
      </div>
      <div className={styles.loginFormContainer}>
        <form onSubmit={onLogin}>
        <h2 className={styles.loginTitle}><i class="fas fa-sign-in-alt"></i> Log in</h2>
        {errors.length > 0 && (
          <div className={styles.errorsContainer}>
            {errors && errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>)}
          <div>
            <label htmlFor='email'>Email</label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
              className={styles.input}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
              className={styles.input}
            />
            <div>
              <button className={styles.btn} type='submit'><i class="fas fa-sign-in-alt"></i> Login</button>
              <button
                type='button'
                className={styles.btn}
                onClick={() => handleDemoLogin("demo@ri.io", "password")}
              ><i class="fas fa-sign-in-alt"></i> Demo</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
