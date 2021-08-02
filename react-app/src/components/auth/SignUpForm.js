import React, { useState } from 'react';
/*<React.fragment></React.fragment> or <></> will allow you to return more than one JSX Element as the highest level tag*/
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

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
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>First Name</label>
        <br/>
        <input
          type='text'
          name='First Name'
          onChange={updateFirstName}
          value={firstName}
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
        ></input>
      </div>
      <div>
        <label>Areas of Interest</label>
        <br/>
        <input
          type='text'
          name='What Interest You?'
          onChange={updateAreasOfInterest}
          value={areasOfInterest}
        ></input>
      </div>
      <div>
        <label>Biography</label>
        <br/>
        <input
          type='text'
          name='Tell Us About Yourself!'
          onChange={updateBiography}
          value={biography}
        ></input>
      </div>
      <div>
        <label>User Name</label>
        <br/>
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
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
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <br/>
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;
