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
		${props => (props.current ? '#3498db' : 'transparent')};
	transition: border-bottom 0.5s ease-in-out;
`;

class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isModal: false
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleIsModal = () => {
    this.setState(state => ({ isModal: !state.isModal }));
  };

  handleSearch = () => {
    this.props.handleSearchValue(this.state.search);
  }

  handleHome = () => {
    this.setState({ search: '' });
    this.props.handleSearchValue('');
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
            {this.props.currentLocation ? <span>현재 위치는 {this.props.currentLocation} 입니다.</span> :
              <span>위치 정보를 확인하는 중입니다.</span>}
          </Item>

          {this.props.isLogin ?
            <>
              <Item>
                <Link to="/user/userinfo">
                  <button type="button">
                    My page
                  </button>
                </Link>
              </Item>

              <Item>
                <Link to="/">
                  <button type="button" onClick={this.props.handleLogout}>
                    Logout
              </button>
                </Link>
              </Item>
            </>
            : <Item>
              <button type="button" onClick={this.handleIsModal}>
                Login
              </button>
              {this.state.isModal ? <Login
                isOpen={true}
                close={this.handleIsModal.bind(this)}
                handleLocalLogin={this.props.handleLocalLogin}
              /> : <></>}
            </Item>}
        </List>
      </Header>
    )
  }
}

export default withRouter(Navi);
