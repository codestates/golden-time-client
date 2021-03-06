import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import NaviPresenter from './NaviPresenter';

class NaviContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			currentLocation: null,
			isModal: false,
			search: '',
		};
		this.getLocation = this.getLocation.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
		this.handleLocalLogin = this.handleLocalLogin.bind(this);
		this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
		this.handleKakaoLogin = this.handleKakaoLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleInputValue = this.handleInputValue.bind(this);
		this.handleIsModal = this.handleIsModal.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
	}

	componentDidMount() {
		const userInfo = localStorage.getItem('userInfo');
		if (userInfo) {
			this.setState({ isLogin: true });
		}
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
				const url = new URL(window.location.href);
				const authorizationCode = url.searchParams.get('code');
				if (authorizationCode) {
					if (String(url.search).includes('google')) {
						await this.handleGoogleLogin(authorizationCode, currentLocation);
					} else {
						await this.handleKakaoLogin(authorizationCode, currentLocation);
					}
				}
				const accessToken = localStorage.getItem('accessToken');
				if (accessToken) {
					this.getUserInfo(accessToken);
				}
			});
		} catch (err) {
			console.error(err);
		}
	}

	async getUserInfo(accessToken) {
		try {
			const userInfo = await axios.get('https://www.goldentime.ml/auth/user', {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			localStorage.setItem('userInfo', JSON.stringify(userInfo.data));
			this.setState({ isLogin: true });
		} catch (err) {
			throw err;
		}
	}

	handleLocalLogin(access_token) {
		localStorage.setItem('accessToken', access_token);
		this.getUserInfo(access_token);
		window.location.href = '/';
	}

	async handleGoogleLogin(authorizationCode, currentLocation) {
		try {
			const response = await axios.post(
				'https://www.goldentime.ml/auth/google',
				{
					authorizationCode,
					area: currentLocation,
				}
			);
			if (response.data.access_token) {
				localStorage.setItem('accessToken', response.data.access_token);
				window.location.href = '/';
			}
		} catch (err) {
			throw err;
		}
	}

	async handleKakaoLogin(authorizationCode, currentLocation) {
		try {
			const response = await axios.post(
				'https://www.goldentime.ml/auth/kakao',
				{
					authorizationCode,
					area: currentLocation,
				}
			);
			if (response.data.access_token) {
				localStorage.setItem('accessToken', response.data.access_token);
				window.location.href = '/';
			}
		} catch (err) {
			throw err;
		}
	}

	onKeyPress = event => {
		if (event.key === 'Enter') {
			window.location.href = `/str/${this.state.search}`;
		}
		this.setState({ search: '' });
	};

	onSearchClick = () => {
		window.location.href = `/str/${this.state.search}`;
		this.setState({ search: '' });
	};

	async handleLogout() {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const response = await axios.post(
				'https://www.goldentime.ml/auth/signout',

				{},
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${accessToken}`,
					},
				}
			);
			if (response.data.message === 'successfully LOGOUT!') {
				localStorage.clear();
				this.setState({ isLogin: false });
				window.location.href = '/';
			}
		} catch (err) {
			throw err;
		}
	}

	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleIsModal = () => {
		this.setState(state => ({ isModal: !state.isModal }));
	};

	render() {
		const { isLogin, currentLocation, search, isModal } = this.state;
		return (
			<NaviPresenter
				isLogin={isLogin}
				currentLocation={currentLocation}
				search={search}
				isModal={isModal}
				handleLocalLogin={this.handleLocalLogin}
				handleInputValue={this.handleInputValue}
				handleLogout={this.handleLogout}
				handleIsModal={this.handleIsModal}
				onKeyPress={this.onKeyPress}
				onSearchClick={this.onSearchClick}
			/>
		);
	}
}

export default withRouter(NaviContainer);
