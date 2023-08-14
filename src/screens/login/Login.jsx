import React from 'react';
import LoginForm from './components/LoginForm'
import './styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-content">
          <LoginForm />
        </div>
        <div className="login-content custom-content">
          {/* Your second content here */}
        </div>
      </div>
      <div className='effect-img-div'>
        <img src="assets/effect.png" alt="Effect"/> 
      </div>
    </div>
  );
};

export default Login;
