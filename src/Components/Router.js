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
      currentLocation: null
    }
    this.handleSearchValue = this.handleSearchValue.bind(this);
    this.handleLocationValue = this.handleLocationValue.bind(this);
    this.handleTokenValue = this.handleTokenValue.bind(this);
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    console.log(url.search);
    console.log(String(url.search).includes('google'));

    if (authorizationCode) {
      this.getAccessToken(authorizationCode);
    }
  }

  handleLocalLogin = token => {
    this.setState({ isLogin: true, accessToken: token });
  };

  async getAccessToken(authorizationCode) {
    const resultCallback = await axios.post('http://localhost:8080/callback', {
      authorizationCode,
    });
    if (resultCallback.data.accessToken) {
      this.setState({
        isLogin: true,
        accessToken: resultCallback.data.accessToken,
      });
    }
  }

  handleSearchValue(input) {
    this.setState({ search: input });
  }

  handleLocationValue(input) {
    this.setState({ currentLocation: input });
  }

  handleTokenValue() {
    this.setState({ isLogin: false, accessToken: null });
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <Navi handleSearchValue={this.handleSearchValue} handleLocationValue={this.handleLocationValue} handleTokenValue={this.handleTokenValue} />
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
              path='/userinfo'
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
