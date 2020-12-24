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
			search: null,
		};
		this.handleInputValue = this.handleInputValue.bind(this);
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

	handleInputValue(input) {
		this.setState({
			search: input,
		});
	}

	render() {
		return (
			<BrowserRouter>
				<>
					<Navi
						handleInputValue={this.handleInputValue}
						handleLocalLogin={this.handleLocalLogin.bind(this)}
					/>
					<Switch>
						<Route
							path='/'
							exact
							render={() => <Temp title={this.state.search} />}
						/>
						<Route path='/user/signup' render={() => <Signup />} />
						<Route path='/user/userinfo' render={() => <Temp />} />
						<Route path='/goods/detail/:id' render={() => <Temp />} />
						<Route path='/goods/edit/:id' render={() => <Temp />} />
						<Route path='/goods/post/:id' render={() => <Temp />} />
						<Redirect from='*' to='/' />
					</Switch>
				</>
			</BrowserRouter>
		);
	}
}

export default Router;
