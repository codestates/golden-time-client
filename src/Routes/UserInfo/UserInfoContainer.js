import React, { Component } from 'react';
import UserInfoPresenter from './UserInfoPresenter';
import axios from 'axios';
import { isPassword } from '../Signup/formCheck';

class UserInfoContainer extends Component {
	state = {
		newNick: '',
		currentPassword: '',
		newPassword: '',
		newPasswordCheck: '',
		nickErrorMessage: '',
		currentPasswordError: '',
		newPasswordError: '',
		passwordCheckError: '',
		nickNameInput: false,
		passwordInput: false,
	};

	fileRef = React.createRef();

	componentDidMount() {
		console.log(JSON.parse(localStorage.getItem('userInfo')));
		const userData = JSON.parse(localStorage.getItem('userInfo'));
		console.log(typeof userData.provider);
	}

	handleNewImageButtonClick(e) {
		e.preventDefault();
		this.fileRef.current.click();
	}

	async handleImageFileChange(e) {
		const imageFile = Array.from(e.target.files);
		const accessToken = localStorage.getItem('accessToken');
		const formData = new FormData();
		for (let i = 0; i < imageFile.length; i++) {
			console.log(imageFile[i], imageFile[i].name);
			formData.append('img', imageFile[i], imageFile[i].name);
		}

		try {
			const response = await axios.patch(
				'http://localhost:8088/auth/modifieduser',
				formData,
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${accessToken}`,
						'content-type': 'multipart/form-data',
					},
				}
			);
			this.getUserInfo(accessToken);
		} catch (err) {
			throw err;
		}
	}

	handleNickNameInput(isOpen) {
		this.setState({ ...this.state, nickNameInput: !isOpen });
	}

	async handleNickNameModify() {
		if (!this.state.newNick.length) {
			this.setState({
				...this.state,
				nickErrorMessage: '닉네임을 입력해주세요.',
			});
			return;
		} else {
			const accessToken = localStorage.getItem('accessToken');
			try {
				const response = await axios.patch(
					'http://localhost:8088/auth/modifieduser',
					{
						nick: this.state.newNick,
					},
					{
						withCredentials: true,
						headers: {
							Authorization: `bearer ${accessToken}`,
						},
					}
				);
				localStorage.setItem('accessToken', response.data.access_token);
				this.getUserInfo(response.data.access_token);
			} catch (err) {
				throw err;
			}
		}
	}

	handlePasswordInput(isOpen) {
		this.setState({ ...this.state, passwordInput: !isOpen });
	}

	async handlePasswordModify() {
		if (!this.state.currentPassword.length) {
			this.setState({
				...this.state,
				currentPasswordError: '비밀번호를 입력해주세요.',
			});
		} else if (!isPassword(this.state.newPassword)) {
			this.setState({
				...this.state,
				newPasswordError: '8~20자리사이 영어와 숫자조합을 입력해주세요',
				currentPasswordError: '',
			});
		} else if (!this.state.newPasswordCheck.length) {
			this.setState({
				...this.state,
				newPasswordError: '',
				currentPasswordError: '',
				passwordCheckError: '비밀번호를 입력해주세요.',
			});
		} else if (this.state.newPassword !== this.state.newPasswordCheck) {
			this.setState({
				...this.state,
				newPasswordError: '',
				currentPasswordError: '',
				passwordCheckError: '새 비밀번호가 일치하지 않습니다.',
			});
		} else {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await axios.post(
					'http://localhost:8088/auth/modifiedpassword',
					{
						password: this.state.currentPassword,
						newPassword: this.state.newPassword,
					},
					{
						withCredentials: true,
						headers: {
							Authorization: `bearer ${accessToken}`,
						},
					}
				);
				this.setState({
					...this.state,
					newPasswordError: '',
					currentPasswordError: '',
					passwordCheckError: '',
					passwordInput: false,
				});
			} catch (err) {
				this.setState({
					...this.state,
					newPasswordError: '',
					passwordCheckError: '',
					currentPasswordError: '현재 비밀번호가 일치하지 않습니다.',
				});
			}
		}
	}

	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleTimeStamp(closing_time) {
		let d = new Date(closing_time);
		let yyyy = d.getFullYear();
		let mm = ('0' + (d.getMonth() + 1)).slice(-2);
		let dd = ('0' + d.getDate()).slice(-2);
		let time = `${yyyy}년 ${mm}월 ${dd}일`;
		return time;
	}

	async getUserInfo(accessToken) {
		try {
			const userInfo = await axios.get('http://localhost:8088/auth/user', {
				withCredentials: true,
				headers: {
					Authorization: `bearer ${accessToken}`,
				},
			});
			console.log('유저 인d포adwddㅇ', userInfo);
			localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
			this.setState({ nickNameInput: false });
		} catch (err) {
			throw err;
		}
	}

	render() {
		return (
			<UserInfoPresenter
				fileRef={this.fileRef}
				userData={JSON.parse(localStorage.getItem('userInfo'))}
				nickNameInput={this.state.nickNameInput}
				passwordInput={this.state.passwordInput}
				passwordCheck={this.state.passwordCheck}
				newPasswordError={this.state.newPasswordError}
				nickErrorMessage={this.state.nickErrorMessage}
				passwordCheckError={this.state.passwordCheckError}
				currentPasswordError={this.state.currentPasswordError}
				handleTimeStamp={this.handleTimeStamp}
				handleInputValue={this.handleInputValue.bind(this)}
				handleNickNameInput={this.handleNickNameInput.bind(this)}
				handlePasswordInput={this.handlePasswordInput.bind(this)}
				handleNickNameModify={this.handleNickNameModify.bind(this)}
				handlePasswordModify={this.handlePasswordModify.bind(this)}
				handleImageFileChange={this.handleImageFileChange.bind(this)}
				handleNewImageButtonClick={this.handleNewImageButtonClick.bind(this)}
			/>
		);
	}
}

export default UserInfoContainer;
