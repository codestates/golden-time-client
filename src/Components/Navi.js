import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";
import axios from "axios";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 10;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  transition: border-bottom 0.5s ease-in-out;
`;


class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      accessToken: null,
      search: '',
      isModal: false,
      currentLocation: null
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
        this.props.handleLocationValue(this.state.currentLocation);
      }, function (error) {
        console.error(error);
      });
    } else {
      console.log('GPS를 지원하지 않습니다');
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleIsModal = () => {
    this.setState(state => ({ isModal: !state.isModal }));
  }

  handleSearch = () => {
    this.props.handleSearchValue(this.state.search);
  }

  handleHome = () => {
    this.setState({ search: '' });
    this.props.handleSearchValue('');
  }

  handleLogout = () => {
    this.setState({ isLogin: false });
    this.props.handleTokenValue();
    this.props.history.push("/");
  }

  render() {
    return (
      <Header>
        <List>
          <Item>
            <span> Golden Time </span>
          </Item>

          <Item>
            <Link to="/">
              <button type="button" onClick={this.handleHome}>
                Home
              </button>
            </Link>
          </Item>

          <Item>
            <input className="searchInput" type='text' value={this.state.search} onChange={this.handleInputValue("search")}></input>
          </Item>

          <Item>
            <Link to="/">
              <button type="button" onClick={this.handleSearch}>
                Search
              </button>
            </Link>
          </Item>

          <Item>
            {this.state.currentLocation ? <span>현재 위치는 {this.state.currentLocation} 입니다.</span> :
              <span>위치 정보를 확인하는 중입니다.</span>}
          </Item>

          {this.state.isLogin ?
            <>
              <Item>
                <Link to="/userinfo">
                  <button type="button">
                    My page
                  </button>
                </Link>
              </Item>

              <Item>
                <button type="button" onClick={this.handleLogout}>
                  Logout
              </button>
              </Item>
            </>
            : <Item>
              <button type="button" onClick={this.handleIsModal}>
                Login
              </button>
              {this.state.isModal ? <Login isOpen={true} close={this.handleIsModal.bind(this)} /> : <></>}
            </Item>}
        </List>
      </Header>
    )
  }
}

export default withRouter(Navi);
