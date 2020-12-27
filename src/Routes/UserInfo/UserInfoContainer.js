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

	handleNewImageButtonClick(e) {
		e.preventDefault();
		this.fileRef.current.click();
	}

	async handleImageFileChange(e) {
		const imageFile = e.target.files;
		try {
			const response = await axios.patch(
				'http://localhost:8080/auth/modifieduser',
				{
					nick: null,
					image: imageFile,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${this.props.accessToken}`,
						'content-type': 'multipart/form-data',
					},
				}
			);
			this.props.modifyUserInfo(response.data.access_token);
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
			try {
				const response = await axios.patch(
					'http://localhost:8080/auth/modifieduser',
					{
						nick: this.state.newNick,
						image: null,
					},
					{
						withCredentials: true,
						headers: {
							Authorization: `bearer ${this.props.accessToken}`,
						},
					}
				);
				this.setState({ ...this.state, nickNameInput: false });
				this.props.modifyUserInfo(response.data.access_token);
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
				const response = await axios.post(
					'http://localhost:8080/auth/modifiedpassword',
					{
						password: this.state.currentPassword,
						newPassword: this.state.newPassword,
					},
					{
						withCredentials: true,
						headers: {
							Authorization: `bearer ${this.props.accessToken}`,
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

	render() {
		return (
			<UserInfoPresenter
				userData={this.props.userData}
				nickNameInput={this.state.nickNameInput}
				passwordInput={this.state.passwordInput}
				handleNickNameInput={this.handleNickNameInput.bind(this)}
				handlePasswordInput={this.handlePasswordInput.bind(this)}
				handleInputValue={this.handleInputValue.bind(this)}
				nickErrorMessage={this.state.nickErrorMessage}
				currentPasswordError={this.state.currentPasswordError}
				newPasswordError={this.state.newPasswordError}
				passwordCheckError={this.state.passwordCheckError}
				handleNickNameModify={this.handleNickNameModify.bind(this)}
				fileRef={this.fileRef}
				handleNewImageButtonClick={this.handleNewImageButtonClick.bind(this)}
				handleImageFileChange={this.handleImageFileChange.bind(this)}
				passwordCheck={this.state.passwordCheck}
				handlePasswordModify={this.handlePasswordModify.bind(this)}
			/>
		);
	}
}

export default UserInfoContainer;
