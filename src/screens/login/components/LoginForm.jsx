import React, { useState } from 'react';
import '../styles/LoginForm.css';
import apiClient from '../../../api/axios';
import LoadingLogin from './LoadingLogin';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
const LoginForm = () => {
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const enteredEmailIsValid = isValidEmail(enteredEmail);
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid = enteredPassword.trim() !== '' && enteredPassword.length >= 6;
  const enteredPasswordIsInvalid = !enteredPasswordIsValid && enteredPasswordTouched;

  const [isShaking, setIsShaking] = useState(false);

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const emailInputChangeHandler = (event) => {
    setInvalidCredentials(false);
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setInvalidCredentials(false);
    setEnteredPassword(event.target.value);
  };

  const emailInputBlurHandler = () => {
    setInvalidCredentials(false);
    setEnteredEmailTouched(true);
  };

  const passwordInputBlurHandler = () => {
    setInvalidCredentials(false);
    setEnteredPasswordTouched(true);
  };

  const [loading, setLoading] = useState(false);

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);

    if (!enteredEmailIsValid || !enteredPasswordIsValid) {
      return;
    }

    setLoading(true);

    console.log(enteredEmail, enteredPassword);

    setEnteredEmail('');
    setEnteredEmailTouched(false);

    setEnteredPassword('');
    setEnteredPasswordTouched(false);

    try {
      const url = '/signin';
      const data = {};

      const result = await apiClient.post(url, data, {
        auth: {
          username: enteredEmail,
          password: enteredPassword,
        },
      });

      if (result.data.isSuccess === 1) {
        console.log('result: ', result);
        localStorage.setItem('token', JSON.stringify(result.data.token));
        window.location.href = '/home';
      } 
      setLoading(false);
    } catch {
      setInvalidCredentials(true);
      console.log('Invalid Credentials');
      setLoading(false);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 1000); 
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`login-form-div ${isShaking ? 'shake' : ''}`}>
      {loading && <LoadingLogin />}
      <div className="login-welcome-back">
        <p className="welcome-back-text">
          Welcome Back 👋
        </p>
      </div>
      <div className="login-new-day">
        <p className="new-day-text">
          Today is a new day. It’s your day. You shape it.
        </p>
        <p className="new-day-text signin-text">
        Sign  in to access personalized features and exciting content. 
        </p>
      </div>
      <form className="login-form-container" onSubmit={formSubmissionHandler}>
          <div className="login-form-inner-div">
            <div className="login-input-box">
              <label className="login-input-label" htmlFor="email">
                E-Mail
              </label>
              <input
                placeholder="Enter Email"
                className="login-input-field"
                type="email"
                id="email"
                onChange={emailInputChangeHandler}
                onBlur={emailInputBlurHandler}
                value={enteredEmail}
              />
              {enteredEmailIsInvalid && <p className="login-error-text">Please enter a valid email.</p>}
            </div>
            <div className="login-input-box">
              <label className="login-input-label" htmlFor="password">
                Password
              </label>
              <div className="login-password-input-container">
                <input
                  placeholder="Enter Password"
                  className="login-input-field"
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  onChange={passwordInputChangeHandler}
                  onBlur={passwordInputBlurHandler}
                  value={enteredPassword}
                />
                {passwordVisible ? <VisibilityIcon className="login-password-icon" onClick={togglePasswordVisibility}/> : <VisibilityOffIcon className="login-password-icon" onClick={togglePasswordVisibility}/>}
              </div>
              {enteredPasswordIsInvalid && (
                <p className="login-error-text">Password must be at least 6 characters.</p>
              )}
            </div>
            <div className="login-button-div">
              <button className="login-submit-button" disabled={!formIsValid}>
                Sign In
              </button>
            </div>
            {invalidCredentials && <p className="login-error-text">Invalid Credentials!</p>}
          </div>
      </form>
      <div className="signup-page-link-div">
        <span>
          Doesn't have an account? <a href="/signup">Sign Up</a>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
