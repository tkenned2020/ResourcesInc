import React, { useState } from 'react';
/*<React.fragment></React.fragment> or <></> will allow you to return more than one JSX Element as the highest level tag*/
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp, login  } from '../../store/session';
import styles from './SignInLogIn.module.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [areasOfInterest, setAreasOfInterest] = useState('');
  const [biography, setBiography] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstName, lastName, areasOfInterest, biography, username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const handleDemoLogin = async (email, password) => {
    await dispatch(login(email, password))
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const updateLastName = (e) => {
    setLastName(e.target.value);
  };
  const updateAreasOfInterest = (e) => {
    setAreasOfInterest(e.target.value);
  };
  const updateBiography = (e) => {
    setBiography(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className={styles.formBackground}>
      <div className={styles.logInLinkContainer}>
        <p><strong><em>Already Apart Of The Family?</em></strong>
          <span>
            <NavLink to='/login' className={styles.logInLink}> <i class="fas fa-sign-in-alt"></i> Log in ! </NavLink>
          </span>
        </p>
      </div>
      <div className={styles.signUpFormContainer}>
        <form onSubmit={onSignUp}>
          <h2 className={styles.loginTitle}> <i class="fas fa-user-plus"></i> <span>Sign up</span> </h2>
          {errors.length > 0 && (
            <div className={styles.errorsContainer}>
              {errors && errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>)}
          <div>
            <label>First Name</label>
            <br/>
            <input
              type='text'
              name='First Name'
              onChange={updateFirstName}
              value={firstName}
              placeholder='First Name'
              className={styles.input}
            ></input>
          </div>
          <div>
            <label>Last Name</label>
            <br/>
            <input
              type='text'
              name='Last Name'
              onChange={updateLastName}
              value={lastName}
              placeholder='Last Name'
              className={styles.input}
            ></input>
          </div>
          <div>
            <label>Areas of Interest</label>
            <br/>
            <textarea
              type='text'
              name='What Interest You?'
              onChange={updateAreasOfInterest}
              value={areasOfInterest}
              placeholder='Areas of Interest'
              className={styles.input}
            ></textarea>
          </div>
          <div>
            <label>Biography</label>
            <br/>
            <textarea
              type='text'
              name='Tell Us About Yourself!'
              onChange={updateBiography}
              value={biography}
              placeholder='Biography'
              className={styles.input}
            ></textarea>
          </div>
          <div>
            <label>User Name</label>
            <br/>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='Username'
              className={styles.input}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <br/>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
              className={styles.input}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <br/>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
              className={styles.input}
            ></input>
          </div>
          <div>
            <label>Confirm Password</label>
            <br/>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder='Confirm Password'
              className={styles.input}
            ></input>
          </div>
          <div >
            <button className={styles.btn} type='submit'><i class="fas fa-user-plus"></i> Sign Up</button>
            <button
                    type='button'
                    className={styles.btn}
                    onClick={() => handleDemoLogin("marcus@ri.io", "password")}
                  ><i class="fas fa-sign-in-alt"></i> Demo</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
