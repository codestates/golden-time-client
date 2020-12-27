import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
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
			search: '',
			currentLocation: null
		}
		this.getLocation = this.getLocation.bind(this);
		this.handleSearchValue = this.handleSearchValue.bind(this);
		this.handleLocalLogin = this.handleLocalLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	getLocation() {
		try {
			navigator.geolocation.getCurrentPosition(async (position) => {
				const x = position.coords.longitude;
				const y = position.coords.latitude;
				const result = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`, {
					headers: {
						'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAO_APIKEY}`
					}
				});
				const currentLocation = result.data.documents[0].address.region_2depth_name;
				this.setState({ currentLocation });
			});
		}
		catch {
			this.setState({ currentLocation: 'no' });
		}
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
	}

	handleSearchValue(input) {
		this.setState({ search: input });
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

	render() {
		const { isLogin, accessToken, search, currentLocation } = this.state;
		return (
			<BrowserRouter>
				<>
					<Navi
						handleSearchValue={this.handleSearchValue}
						handleLocalLogin={this.handleLocalLogin}
						handleLogout={this.handleLogout}
						isLogin={isLogin}
						accessToken={accessToken}
						currentLocation={currentLocation}
					/>
					<Switch>
						<Route
							exact path='/'
							render={() =>
								<Home
									isLogin={isLogin}
									accessToken={accessToken}
									search={search}
									currentLocation={currentLocation}
								/>}
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
							component={GoodsDetail}
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
