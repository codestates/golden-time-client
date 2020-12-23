import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.socialLoginHandler = this.socialLoginHandler.bind(this)
  }

  socialLoginHandler() {
    window.location.assign()
  }

  render() {
    return (
      <div className='loginContainer'>
        OAuth 2.0
        <button
          onClick={this.socialLoginHandler}
          className='socialloginBtn'
        >
          OAuth 2.0
          </button>
      </div>
    );
  }
}

export default Login;
