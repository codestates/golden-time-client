import React from 'react';
import SignupPresenter from './SignupPresenter';
import axios from 'axios';
import { isEmail, isPassword } from './formCheck';
import { withRouter } from 'react-router-dom';

class SignupContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			passwordCheck: '',
			nick: '',
			errorMessage: '',
		};
	}

	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleSubmit = async () => {
		const { email, password, nick } = this.state;
		const signUpUrl = 'http://localhost:8080/auth/signup';

		if (!isEmail(this.state.email)) {
			this.setState({
				...this.state,
				errorMessage: '이메일 형식이 올바르지 않습니다.',
			});
			return;
		} else if (!isPassword(this.state.password)) {
			this.setState({
				...this.state,
				errorMessage: '8~20자리사이 영어와 숫자조합의 비밀번호를 입력해주세요.',
			});
			return;
		} else if (this.state.password !== this.state.passwordCheck) {
			this.setState({
				...this.state,
				errorMessage: '비밀번호가 일치하지 않습니다.',
			});
			return;
		} else if (!this.state.nick.length) {
			this.setState({
				...this.state,
				errorMessage: '사용하실 닉네임을 입력해주세요.',
			});
			return;
		}

		try {
			const response = await axios.post(signUpUrl, {
				email,
				password,
				nick,
			});
			this.props.history.push(response.data.redirect_url);
		} catch (err) {
			this.setState({ ...this.state, errorMessage: '중복된 이메일입니다.' });
			return;
		}
	};

	render() {
		const { errorMessage } = this.state;
		return (
			<SignupPresenter
				handleInputValue={this.handleInputValue.bind(this)}
				errorMessage={errorMessage}
				handleSubmit={this.handleSubmit.bind(this)}
			/>
		);
	}
}

export default withRouter(SignupContainer);
