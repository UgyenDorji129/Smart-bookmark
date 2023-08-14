import React, { useState } from "react";
import "../styles/SignUpForm.css";
import apiClient from "../../../api/axios";
import SignUpLoading from "./SignUpLoading";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
const SignUpForm = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordTouched, setEnteredPasswordTouched] = useState(false);

  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredConfirmPasswordTouched, setEnteredConfirmPasswordTouched] =
    useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const enteredEmailIsValid = isValidEmail(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const enteredPasswordIsValid =
    enteredPassword.trim() !== "" && enteredPassword.length >= 6;
  const passwordInputIsInvalid =
    !enteredPasswordIsValid && enteredPasswordTouched;

  const confirmPasswordsMatch = enteredPassword === enteredConfirmPassword;
  const confirmPasswordIsInvalid =
    !confirmPasswordsMatch && enteredConfirmPasswordTouched;

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    confirmPasswordsMatch
  ) {
    formIsValid = true;
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const confirmPasswordInputChangeHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
  };

  const emailInputBlurHandler = () => {
    setEnteredEmailTouched(true);
  };

  const passwordInputBlurHandler = () => {
    setEnteredPasswordTouched(true);
  };

  const confirmPasswordInputBlurHandler = () => {
    setEnteredConfirmPasswordTouched(true);
  };

  const [loading, setLoading] = useState(false);

  const formSubmissionHandler = async (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);
    setEnteredPasswordTouched(true);
    setEnteredConfirmPasswordTouched(true);

    if (
      !enteredNameIsValid ||
      !enteredEmailIsValid ||
      !enteredPasswordIsValid ||
      !confirmPasswordsMatch
    ) {
      return;
    }
    setLoading(true);

    console.log(enteredName, enteredEmail, enteredPassword);

    setEnteredName('');
    setEnteredNameTouched(false);

    setEnteredEmail('');
    setEnteredEmailTouched(false);

    setEnteredPassword('');
    setEnteredPasswordTouched(false);

    setEnteredConfirmPassword('');
    setEnteredConfirmPasswordTouched(false);

    try {
      const url = "/signup";
      const data = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };

      console.log(data);

      const result = await apiClient.post(url, data);
      console.log("Result: ", result);
      if (result.data.isSuccess === 1) {
        const url = "/signin";
        const data = {};

        const result = await apiClient.post(url, data, {
          auth: {
            username: enteredEmail,
            password: enteredPassword,
          },
        });

        if (result.data.isSuccess === 1) {
          console.log("result: ", result)
          localStorage.setItem("token", JSON.stringify(result.data.token));
          window.location.href = "/home";
        }
        setLoading(false);
      }
    } catch {
      setLoading(false);
      console.log('Invalid Credentials');
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    
    <div className="signup-form-div">
      {loading && <SignUpLoading />}
      <div className="signup-welcome-back">
        <p className="welcome-back-text">
          Hey there 👋
        </p>
      </div>
      {/* <div className="signup-new-day">
        <p className="new-day-text">
          Today is a new day. It’s your day. You shape it.
        </p>
        <p className="new-day-text signin-text">
        Sign Up to start managing your day.
        </p>
      </div> */}
      <form className="signup-form-container" onSubmit={formSubmissionHandler}>
        <div className="signup-form-inner-div">
          <div className="signup-input-box">
            <label className="signup-input-label" htmlFor="name">
              Name
            </label>
            <input
              placeholder="Enter Name"
              className="signup-input-field"
              type="text"
              id="name"
              name="name"
              onChange={nameInputChangeHandler}
              onBlur={nameInputBlurHandler}
              value={enteredName}
            />
            {nameInputIsInvalid && (
              <p className="signup-error-text">Name must not be empty.</p>
            )}
          </div>
          <div className="signup-input-box">
            <label className="signup-input-label" htmlFor="email">
                E-Mail
            </label>
            <input
              placeholder="Enter Email"
              className="signup-input-field"
              type="email"
              id="email"
              name="email"
              onChange={emailInputChangeHandler}
              onBlur={emailInputBlurHandler}
              value={enteredEmail}
            />
            {emailInputIsInvalid && (
              <p className="signup-error-text">Please enter a valid email.</p>
            )}
          </div>
          <div className="signup-input-box">
            <label className="signup-input-label" htmlFor="password">
              Password
            </label>
            <div className="signup-password-input-container">
              <input
                placeholder="Enter Password"
                className="signup-input-field"
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                onChange={passwordInputChangeHandler}
                onBlur={passwordInputBlurHandler}
                value={enteredPassword}
              />
              {passwordVisible ? <VisibilityIcon className="login-password-icon" onClick={togglePasswordVisibility}/> : <VisibilityOffIcon className="login-password-icon" onClick={togglePasswordVisibility}/>}
            </div>
            {passwordInputIsInvalid && (
              <p className="signup-error-text">
                Password must be at least 6 characters.
              </p>
            )}
          </div>
          <div className="signup-input-box">
            <label className="signup-input-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              placeholder="Confirm Password"
              className="signup-input-field"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={confirmPasswordInputChangeHandler}
              onBlur={confirmPasswordInputBlurHandler}
              value={enteredConfirmPassword}
            />
            {confirmPasswordIsInvalid && (
              <p className="signup-error-text">Passwords do not match.</p>
            )}
          </div>
          <div className="signup-button-div">
            <button className="signup-submit-button" disabled={!formIsValid}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="login-page-link-div">
        <span>
          Already have an account? <a href="/login">Login</a>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
