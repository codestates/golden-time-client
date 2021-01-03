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
			currentLocation: null,
		};
	}
	componentDidMount() {
		this.getLocation();
	}

	getLocation() {
		try {
			navigator.geolocation.getCurrentPosition(async position => {
				const x = position.coords.longitude;
				const y = position.coords.latitude;
				const result = await axios.get(
					`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
					{
						headers: {
							Authorization: `KakaoAK ffb53639ffe1e1521cd3006a5a09ee3d`,
						},
					}
				);
				const currentLocation =
					result.data.documents[0].address.region_2depth_name;
				this.setState({ currentLocation });
			});
		} catch (err) {
			throw err;
		}
	}

	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleSubmit = async () => {
		const { email, password, nick } = this.state;
		const signUpUrl = 'http://localhost:8088/auth/signup';

		if (!isEmail(this.state.email)) {
			this.setState({
				...this.state,
				errorMessage: '이메일 형식이 올바르지 않습니다.',
			});
			return;
		} else if (!this.state.nick.length) {
			this.setState({
				...this.state,
				errorMessage: '사용하실 닉네임을 입력해주세요.',
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
		}
		try {
			const response = await axios.post(signUpUrl, {
				email,
				password,
				nick,
				area: this.state.currentLocation,
			});
			this.props.handleModalChange();
		} catch (err) {
			this.setState({ ...this.state, errorMessage: '중복된 이메일입니다.' });
			return;
		}
	};

	render() {
		const { errorMessage } = this.state;
		return (
			<SignupPresenter
				errorMessage={errorMessage}
				handleInputValue={this.handleInputValue.bind(this)}
				handleSubmit={this.handleSubmit.bind(this)}
				handleModalChange={this.props.handleModalChange}
			/>
		);
	}
}

export default withRouter(SignupContainer);
