import React from 'react'
import '../styles/LoadingLogin.css'
const LoadingLogin = () => {
  return (
    <div className='login-loading-div'>
      <div class="bar">
        <div class="ball"></div>
      </div>
      <h1 className='loading-header'>LOADING...</h1>
    </div>
  )
}

export default LoadingLogin
