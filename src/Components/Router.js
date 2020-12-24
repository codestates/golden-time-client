import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Home from '../Routes/Home';
import Signup from '../Routes/Signup';
import UserInfo from '../Routes/UserInfo';
import GoodsDetail from '../Routes/GoodsDetail';
import GoodsEdit from '../Routes/GoodsEdit';
import GoodsPost from '../Routes/GoodsPost';
import Navi from './Navi';
import Temp from './Temp';
import axios from 'axios';

class Router extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			accessToken: null,
			search: null,
			currentLocation: null
		}

		this.handleSearchValue = this.handleSearchValue.bind(this);
		this.handleLocationValue = this.handleLocationValue.bind(this);
		this.getLocation = this.getLocation.bind(this);
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const x = position.coords.longitude;
				const y = position.coords.latitude;
				const APIKEY = 'ffb53639ffe1e1521cd3006a5a09ee3d';
				const result = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`, {
					headers: {
						'Authorization': `KakaoAK ${APIKEY}`
					}
				});
				const currentLocation = result.data.documents[0].address.region_2depth_name;
				this.setState({ currentLocation });
			}, function (error) {
				console.error(error);
			});
		} else {
			console.log('GPS를 지원하지 않습니다');
		}
	}

	componentDidMount() {
		const url = new URL(window.location.href);
		const authorizationCode = url.searchParams.get('code');
		if (authorizationCode) {
			if (String(url.search).includes('google')) {
				this.handleGoogleLogin(authorizationCode);
			} else {
				this.handleKakaoLogin(authorizationCode);
			}
		}

		this.getLocation();
	}

	handleLocalLogin = token => {
		this.setState({ isLogin: true, accessToken: token });
	};

	async handleGoogleLogin(authorizationCode) {
		try {
			const response = await axios.post('http://localhost:4000/auth/google', {
				authorizationCode,
			});
			if (response.access_token) {
				this.setState({
					isLogin: true,
					accessToken: response.access_token,
				});
			}
		} catch (err) {
			throw err;
		}
	}

	async handleKakaoLogin(authorizationCode) {
		try {
			const response = await axios.post('http://localhost:4000/auth/kakao', {
				authorizationCode,
			});
			if (response.access_token) {
				this.setState({
					isLogin: true,
					accessToken: response.access_token,
				});
			}
		} catch (err) {
			throw err;
		}
	}

	handleLogout() {
		this.setState({ isLogin: false, accessToken: null });
	}

	handleSearchValue(input) {
		this.setState({ search: input });
	}

	handleLocationValue(input) {
		this.setState({ currentLocation: input });
	}

	render() {
		return (
			<BrowserRouter>
				<>
					<Navi handleSearchValue={this.handleSearchValue} handleLocationValue={this.handleLocationValue} handleTokenValue={this.handleTokenValue}
						handleLocalLogin={this.handleLocalLogin.bind(this)}
						handleLogout={this.handleLogout.bind(this)}
						isLogin={this.state.isLogin}
						accessToken={this.state.accessToken}
						currentLocation={this.state.currentLocation}
					/>
					<Switch>
						<Route
							exact path='/'
							render={() => <Temp title={this.state.search} />}
						/>
						<Route
							path='/user/signup'
							render={() => (<Signup />)}
						/>
						<Route
							path='/user/userinfo'
							render={() => (<Temp />)}
						/>
						<Route
							path='/goods/detail/:id'
							render={() => (<Temp />)}
						/>
						<Route
							path='/goods/edit/:id'
							render={() => (<Temp />)}
						/>
						<Route
							path='/goods/post/:id'
							render={() => (<Temp />)}
						/>
						<Redirect from="*" to="/" />
					</Switch>
				</>
			</BrowserRouter>
		)
	}
}

export default Router;
