import React from 'react'
import './styles/SignUp.css'
import SignUpForm from './components/SignUpForm'

const SignUp = (props) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content signup-content">
          <SignUpForm />
        </div>
        <div className="login-content custom-content">
        </div>
      </div>
      <div className='effect-img-div'>
        <img src="assets/effect.png" alt="Effect"/> 
      </div>
    </div>
  );
}

export default SignUp
