import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	height: 90vh;
`;

const RegistArea = styled.div`
	padding: 6rem 0 0 0;
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
	margin-top: 1.3rem;
`;

const InputTitle = styled.div`
	font-size: 1rem;
	font-weight: bold;
	height: 1.8rem;
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
	value: '가입하기',
})`
	background-color: black;
	color: white;
	font-weight: bold;
	text-align: center;
	width: 70%;
	border-radius: 40px;
	font-size: 1rem;
	line-height: 46px;
	height: 3rem;
	cursor: pointer;
	margin-bottom: 1rem;
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

const SignupPresenter = ({ handleInputValue, errorMessage, handleSubmit }) => {
	return (
		<Container>
			<RegistArea>
				<Title>회원가입</Title>
				<InputBox>
					<InputTitle>이메일 주소</InputTitle>
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
			</RegistArea>
		</Container>
	);
};

export default SignupPresenter;
