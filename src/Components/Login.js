import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
const boxFade = keyframes`
from {
		opacity: 0;
		transform: translateY(0);
	}
	to {
		opacity: 1;
		transform: translateY(50px);
	}
`;

const Modal = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 1;
`;

const LoginModal = styled.div`
	width: 30rem;
	height: 40rem;
	background-color: #fff;
	position: relative;
	z-index: 100;
	box-sizing: border-box;
	margin: 50px auto;
	padding: 20px;
	transform: translateY(0);
	animation: ${boxFade} 0.5s forwards;
`;

const LoginArea = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const Title = styled.div`
	top: 2em;
	font-size: 1.5em;
	font-weight: bold;
	margin-top: 2em;
	margin-bottom: 3em;
`;

const InputBox = styled.div`
	padding: 1rem;
`;

const Email = styled.input.attrs({
  type: 'email',
  placeholder: 'Email',
})`
	padding: 7px 0 8px;
	width: 100%;
	font-size: 15px;
	line-height: 22px;
	border-top: 0;
	border-right: 0;
	border-left: 0;
	border-bottom: 1px solid #ebebeb;
	resize: none;
	border-radius: 0;
	outline: 0;
`;

const Password = styled.input.attrs({
  type: 'password',
  placeholder: 'Password',
})`
	padding: 7px 0 8px;
	width: 100%;
	font-size: 15px;
	line-height: 22px;
	border-top: 0;
	border-right: 0;
	border-left: 0;
	border-bottom: 1px solid #ebebeb;
	resize: none;
	border-radius: 0;
	outline: 0;
`;

const ErrorMessageArea = styled.div`
	margin-top: 1em;
	height: 2em;
	color: red;
	font-size: 0.8rem;
`;

const Button = styled.button`
	width: 100%;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.16px;
	height: 52px;
	line-height: 50px;
	font-weight: 700;
	border-radius: 15px;
	outline: 0;
	color: white;
	background-color: black;
	cursor: pointer;
	margin-bottom: 1rem;
`;

const ButtonArea = styled.div`
	position: relative;
	top: 2em;
	align-items: center;
	height: 10%;
`;

const SocialArea = styled.div`
	display: flex;
	margin-top: 6rem;
	justify-content: center;
`;

const GoogleButton = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-right: 1rem;
	cursor: pointer;
`;

const KakaoButton = styled.img`
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	margin-left: 1rem;
	cursor: pointer;
`;

const SignUpLink = styled(Link)`
	color: inherit;
	text-decoration: inherit;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  handleInputValue = key => e => {
    this.setState({ [key]: e.target.value });
  };

  handleLocalLogin = async () => {
    const { email, password } = this.state;
    const localLoginUrl = 'http://localhost:4000//api/auth/signin';

    if (!email.length || !password.length) {
      this.setState({
        ...this.state,
        errorMessage: '모든 항목을 입력해주세요.',
      });
      return;
    }
    try {
      const response = await axios.post(
        localLoginUrl,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      this.setState({
        ...this.state,
        errorMessage: '아이디 혹은 비밀번호가 잘못 입력되었습니다.',
      });
    }
  };

  handleGoogleLogin = () => {
    const clientId =
      '153084653210-rv3oct12c4a2319k42rqn3hp2tlnadjk.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000';
    const scope = 'https://www.googleapis.com/auth/plus.login';
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
    window.location.assign(googleLoginUrl);
  };

  handleKakaoLogin = () => {
    const clientId = 'd3f764102a2147802881657a1cc5cc7b';
    const redirectUri = 'http://localhost:3000';
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.assign(kakaoLoginUrl);
  };

  render() {
    const { isOpen, close } = this.props;
    return (
      <>
        {isOpen ? (
          <Modal onClick={close}>
            <LoginModal onClick={e => e.stopPropagation()}>
              <LoginArea>
                <Title>로그인</Title>
                <InputBox>
                  <Email onChange={this.handleInputValue('email')} />
                </InputBox>
                <InputBox>
                  <Password onChange={this.handleInputValue('password')} />
                </InputBox>
                <ErrorMessageArea>{this.state.errorMessage}</ErrorMessageArea>
                <ButtonArea>
                  <Button onClick={this.handleLocalLogin}> Login </Button>

                  <SignUpLink
                    to='/user/signup'
                    onClick={close}>
                    <Button> Signup </Button>
                  </SignUpLink>
                </ButtonArea>

                <SocialArea>
                  <GoogleButton
                    src='../images/googleLogin.png'
                    onClick={this.handleGoogleLogin}
                  />
                  <KakaoButton
                    src='../images/kakaoLogin.png'
                    onClick={this.handleKakaoLogin}
                  />
                </SocialArea>
              </LoginArea>
            </LoginModal>
          </Modal>
        ) : null}
      </>
    );
  }
}
export default Login;
