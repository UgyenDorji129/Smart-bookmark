import React from 'react'
import '../styles/SignUpLoading.css';
const SignUpLoading = () => {
  return (
    <div className='signup-loading-div'>
      <div class="bar">
        <div class="ball"></div>
      </div>
      <h1 className='loading-header'>LOADING...</h1>
    </div>
  )
}

export default SignUpLoading
