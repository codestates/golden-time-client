import React from "react";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Login from "./Login";

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
      isLogin: false,
      accessToken: null,
      search: null,
      isModal: false
    }
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleIsModal = (input) => {
    this.setState({ isModal: input });
  }

  render() {
    return (
      <Header>
        <List>
          <Item>
            <Link to="/">
              <button type="button" onClick={this.props.handleInputValue.bind(null, null)}>
                Home
              </button>
            </Link>
          </Item>

          <Item>
            <input type='text' onChange={this.handleInputValue("search")}></input>
          </Item>

          <Item>
            <Link to="/">
              <button type="button" onClick={this.props.handleInputValue.bind(null, this.state.search)}>
                검색
              </button>
            </Link>
          </Item>

          {this.state.isLogin ? <Item>
            <Link to="/UserInfo">
              <button type="button">
                My page
              </button>
            </Link>
          </Item>
            : <Item>
              <button type="button" onClick={this.handleIsModal.bind(this, this.state.isModal ? false : true)}>
                로그인
            </button>
              {this.state.isModal ? <Login /> : <></>}
            </Item>}
        </List>
      </Header>
    )
  }
}

export default withRouter(Navi);