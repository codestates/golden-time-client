import React from 'react';
import styled, { keyframes } from 'styled-components';
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
const SignUpModal = styled.div`
	width: 32rem;
	height: 46rem;
	background-color: #fff;
	position: relative;
	z-index: 100;
	box-sizing: border-box;
	margin: 50px auto;
	padding: 20px;
	transform: translateY(0);
	animation: ${boxFade} 0.5s forwards;
	border-radius: 6px;
`;

const RegistArea = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
`;

const Logo = styled.div`
	top: 2em;
	font-size: 1.5em;
	font-weight: bold;
	color: black;
	margin-top: 1.5rem;
	margin-bottom: 3rem;
`;

const InputBox = styled.div`
	text-align: left;
	margin-top: 1.3rem;
`;

const InputTitle = styled.div`
	font-size: 1rem;
	font-weight: 500;
	height: 1.8rem;
	color: #222;
`;

const Email = styled.input.attrs({
	type: 'email',
	placeholder: '예) goldentime@gmail.com',
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
	placeholder: '8~20자리사이 영어와 숫자조합',
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

const PasswordCheck = styled.input.attrs({
	type: 'password',
	placeholder: '비밀번호를 한번 더 입력해주세요.',
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

const NickName = styled.input.attrs({
	type: 'text',
	placeholder: '사용하실 닉네임을 입력해주세요.',
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

const Button = styled.input.attrs({
	type: 'button',
	value: '가입하기',
})`
	background-color: #222;
	color: white;
	font-weight: bold;
	text-align: center;
	width: 70%;
	border-radius: 40px;
	font-size: 1rem;
	line-height: 46px;
	height: 3rem;
	cursor: pointer;
	padding: 0;
`;

const ButtonArea = styled.div`
	margin-top: 1rem;
	align-items: center;
	height: 10%;
`;

const ErrorMessageArea = styled.div`
	margin-top: 1em;
	height: 2em;
	color: red;
	font-size: 0.8rem;
`;

const Login = styled.span`
	margin-top: 1rem;
	color: #222;
	font-size: 1rem;
	font-weight: bold;
	cursor: pointer;
`;

const SignupPresenter = ({
	handleInputValue,
	errorMessage,
	handleSubmit,
	handleModalChange,
}) => {
	return (
		<SignUpModal onClick={e => e.stopPropagation()}>
			<RegistArea>
				<Logo>
					<img src='/images/goldenTimeLogo.png' width='250px' height='120px' />
				</Logo>
				<InputBox>
					<InputTitle>이메일</InputTitle>
					<Email onChange={handleInputValue('email')} />
				</InputBox>
				<InputBox>
					<InputTitle>닉네임</InputTitle>
					<NickName onChange={handleInputValue('nick')} />
				</InputBox>
				<InputBox>
					<InputTitle>비밀번호</InputTitle>
					<Password onChange={handleInputValue('password')} />
				</InputBox>
				<InputBox>
					<InputTitle>비밀번호 확인</InputTitle>
					<PasswordCheck onChange={handleInputValue('passwordCheck')} />
				</InputBox>
				<ErrorMessageArea>{errorMessage}</ErrorMessageArea>
				<ButtonArea>
					<Button onClick={handleSubmit} />
				</ButtonArea>
				<Login onClick={handleModalChange}>Login</Login>
			</RegistArea>
		</SignUpModal>
	);
};

export default SignupPresenter;
