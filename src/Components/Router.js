import React from 'react';
import {
	BrowserRouter,
	Route,
	Redirect,
	Switch
} from 'react-router-dom';
import axios from 'axios';
import Navi from './Navi';
import Signup from '../Routes/Signup';
import UserInfo from '../Routes/UserInfo';
import Home from '../Routes/Home';
import GoodsDetail from '../Routes/GoodsDetail';
import GoodsPost from '../Routes/GoodsPost';
import GoodsEdit from '../Routes/GoodsEdit';
import MyGoods from '../Routes/MyGoods';
import Footer from './Footer';

class Router extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			accessToken: null,
			search: '',
			currentLocation: null,
			userInfo: {}
		};
		this.handleSearchValue = this.handleSearchValue.bind(this);
		this.getLocation = this.getLocation.bind(this);
		this.handleLocalLogin = this.handleLocalLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
		this.modifyUserInfo = this.modifyUserInfo.bind(this);
	}

	componentDidMount() {
		this.getLocation();

		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get('code');
		if (authorizationCode) {
			if (String(url.search).includes('google')) {
				this.handleGoogleLogin(authorizationCode);
			} else {
				this.handleKakaoLogin(authorizationCode);
			}
		}

		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			this.setState({ ...this.state, isLogin: true, accessToken });
			this.getUserInfo();
		}
	}

	handleSearchValue(input) {
		this.setState({ search: input });
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
		} catch {
			this.setState({ currentLocation: 'no' });
		}
	}

	handleLocalLogin = async access_token => {
		this.setState({ isLogin: true, accessToken: access_token });
		localStorage.setItem('accessToken', access_token);
		this.getUserInfo();
	};

	async handleGoogleLogin(authorizationCode) {
		try {
			const response = await axios.post('http://localhost:8088/auth/google', {
				authorizationCode,
				area: this.state.currentLocation,
			});
			if (response.data.access_token) {
				this.setState({
					isLogin: true,
					accessToken: response.data.access_token,
				});
			}
			localStorage.setItem('accessToken', response.data.access_token);
			this.getUserInfo();
		} catch (err) {
			throw err;
		}
	}

	async handleKakaoLogin(authorizationCode) {
		try {
			const response = await axios.post('http://localhost:8088/auth/kakao', {
				authorizationCode,
				area: this.state.currentLocation,
			});
			if (response.data.access_token) {
				this.setState({
					isLogin: true,
					accessToken: response.data.access_token,
				});
			}
			localStorage.setItem('accessToken', response.data.access_token);
			this.getUserInfo();
		} catch (err) {
			throw err;
		}
	}

	async handleLogout() {
		try {
			const response = await axios.post(
				'http://localhost:8088/auth/signout',
				{},
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${this.state.accessToken}`,
					},
				}
			);
			if (response.data.message === 'successfully LOGOUT!') {
				localStorage.clear();
				this.setState({ isLogin: false, accessToken: null, userInfo: {} });
				window.location.href = 'http://localhost:3000';
			}
		} catch (err) {
			throw err;
		}
	}

	getUserInfo = async () => {
		try {
			const userInfo = await axios.get('http://localhost:8088/auth/user', {
				withCredentials: true,
				headers: {
					Authorization: `bearer ${this.state.accessToken}`,
				},
			});

			const { id, email, nick, profile, provider, createdAt } = userInfo.data;

			this.setState({
				...this.state,
				userInfo: { id, email, nick, profile, provider, createdAt },
			});
		} catch (err) {
			throw err;
		}
	};

	modifyUserInfo(accessToken) {
		this.setState({ ...this.state, accessToken });
		localStorage.setItem('accessToken', accessToken);
		this.getUserInfo();
	}

	render() {
		const { userInfo, search, currentLocation } = this.state;
		return (
			<BrowserRouter>
				<>
					<Navi
						handleSearchValue={this.handleSearchValue}
						handleLocalLogin={this.handleLocalLogin}
						handleLogout={this.handleLogout}
						currentLocation={currentLocation}
						userInfo={userInfo}
					/>
					<Switch>
						<Route
							exact
							path='/'
							render={() => (
								<Home
									userInfo={userInfo}
									search={search}
									currentLocation={currentLocation}
								/>
							)}
						/>
						<Route
							path='/user/signup'
							render={() => (
								<Signup currentLocation={this.state.currentLocation} />
							)}
						/>
						<Route
							path='/user/userinfo'
							render={() => (
								<UserInfo
									userData={this.state.userInfo}
									modifyUserInfo={this.modifyUserInfo.bind(this)}
									accessToken={this.state.accessToken}
								/>
							)}
						/>
						<Route path='/goods/detail/:id' component={GoodsDetail} />
						<Route path='/goods/edit/:id' component={GoodsEdit} />
						<Route path='/goods/post' component={GoodsPost} />
						<Route path='/user/mygoods' component={MyGoods} />
						<Redirect from='*' to='/' />
					</Switch>
					<Footer />
				</>
			</BrowserRouter>
		);
	}
}

export default Router;
