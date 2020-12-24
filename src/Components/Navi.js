import React from "react";
import { Link, withRouter } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import Login from "./Login";
import axios from "axios";

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const Home = styled.div`
  width:250px;
  padding-right: 1rem;
  font-family: 'Bangers';
	font-size: 50px;
	text-align: center;
`;

const Input = styled.input`
  background-color:rgb(244,244,244);
  border-radius:20px;
	width: 80%;
	height: 50px;
  border:0;
`;

const Icon = styled.div`
  width: 50px;
  height: 50px;
	display: flex;
  justify-content: center;
  align-items: center;
`;

const Location = styled.div`
  width: 300px;
	font-size: 15px;
	display: flex;
  justify-content: center;
  align-items: center;
`;

const LocationName = styled.div`
  font-size: 20px;
  font-weight:800;
`;

const Item = styled.div`
  cursor: pointer;
	width: 100px;
  height: 50px;
  font-size: 15px;
	display: flex;
  justify-content: center;
  align-items: center;
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
      <Container>
        <Link to="/">
          <Home onClick={this.handleHome}>
            Golden Time
          </Home>
        </Link>

        <Input className="searchInput" type='text' value={this.state.search} onChange={this.handleInputValue("search")} />

        <Link to="/">
          <Icon onClick={this.handleSearch}>
            <FaSearch size="25" color='gray' />
          </Icon>
        </Link>

        {this.props.currentLocation ? <Location>현재 위치는{'\u00A0'}<LocationName>{this.props.currentLocation}</LocationName>{'\u00A0'}입니다.</Location> :
          <Location>위치 정보를 확인하는 중입니다.</Location>
        }

        {
          this.props.isLogin ?
            <>
              <Link to="/user/userinfo">
                <Item>개인 페이지</Item>
              </Link>

              <Link to="/">
                <Item onClick={this.props.handleLogout}>로그아웃</Item>
              </Link>
            </>
            : <>
              <Item onClick={this.handleIsModal}>로그인</Item>
              {this.state.isModal ? <Login
                isOpen={true}
                close={this.handleIsModal.bind(this)}
                handleLocalLogin={this.props.handleLocalLogin}
              /> : <></>}
            </>
        }
      </Container >
    )
  }
}

export default withRouter(Navi);
