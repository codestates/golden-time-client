import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const RegistArea = styled.div`
	padding: 5rem 0 0 0;
	width: 30rem;
	height: 50rem;
	text-align: center;
	align-items: center;
`;

const Title = styled.div`
	top: 2em;
	font-size: 2em;
	font-weight: bold;
	margin-top: 2em;
	margin-bottom: 3em;
`;

const InputBox = styled.div`
	text-align: left;
`;

const InputTitle = styled.div`
	font-size: 0.8rem;
	font-weight: bold;
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
	placeholder: '비밀번호 확인',
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
	placeholder: '닉네임',
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
	value: 'SignUp',
})`
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
`;

const ButtonArea = styled.div`
	position: relative;
	top: 2em;
	align-items: center;
	height: 10%;
`;

const ErrorMessageArea = styled.div`
	margin-top: 1em;
	height: 2em;
	color: red;
	font-size: 0.8rem;
`;

const SignupPresenter = ({ handleInputValue, errorMessage, handleSubmit }) => {
	return (
		<Container>
			<RegistArea>
				<Title>회원가입</Title>
				<InputBox>
					<InputTitle>Email</InputTitle>
					<Email onChange={handleInputValue('email')} />
				</InputBox>
				<InputBox>
					<InputTitle>Password</InputTitle>
					<Password onChange={handleInputValue('password')} />
				</InputBox>
				<InputBox>
					<InputTitle>PasswordCheck</InputTitle>
					<PasswordCheck onChange={handleInputValue('passwordCheck')} />
				</InputBox>
				<InputBox>
					<InputTitle>NickName</InputTitle>
					<NickName onChange={handleInputValue('nick')} />
				</InputBox>
				<ErrorMessageArea>{errorMessage}</ErrorMessageArea>
				<ButtonArea>
					<Button onClick={handleSubmit} />
				</ButtonArea>
			</RegistArea>
		</Container>
	);
};

export default SignupPresenter;
