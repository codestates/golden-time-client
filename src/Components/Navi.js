import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import Login from './Login';

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
	z-index: 10;
`;

const Home = styled.div`
	width: 300px;
	padding-right: 1rem;
	font-family: 'Bangers';
	font-size: 50px;
	text-align: center;
`;

const Input = styled.input`
	background-color: rgb(244, 244, 244);
	border-radius: 20px;
	width: 80%;
	height: 50px;
	border: 0;
`;

const Search = styled.div`
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
	font-weight: 800;
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
			isModal: false,
			currentLocation: null
		}

		this.handleHome = this.handleHome.bind(this);
		this.handleInputValue = this.handleInputValue.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleIsModal = this.handleIsModal.bind(this);
	}

	handleHome = () => {
		this.setState({ search: '' });
		this.props.handleSearchValue('');
	}

	handleInputValue = (key) => (e) => {
		this.setState({ [key]: e.target.value });
	};

	handleSearch = () => {
		this.props.handleSearchValue(this.state.search);
	}

	handleIsModal = () => {
		this.setState(state => ({ isModal: !state.isModal }));
	};

	render() {
		const { currentLocation, userInfo, handleLocalLogin, handleLogout } = this.props;
		return (
			<Container>
				<Link to="/">
					<Home onClick={this.handleHome}>Golden Time</Home>
				</Link>

				<Input type='text' placeholder={"찾으시는 상품을 입력하세요."} value={this.state.search} onChange={this.handleInputValue("search")} />

				<Link to="/">
					<Search>
						<FaSearch size="25" color='gray' onClick={this.handleSearch} />
					</Search>
				</Link>

				{currentLocation ?
					currentLocation === 'no' ? <Location>위치 정보를 받아올 수 없습니다.</Location> :
						<Location>현재 위치는{'\u00A0'}<LocationName>{currentLocation}</LocationName>{'\u00A0'}입니다.</Location>
					: <Location>위치 정보를 확인하는 중입니다.</Location>
				}

				{userInfo ?
					<>
						<Link to="/user/userinfo">
							<Item>개인 페이지</Item>
						</Link>

						<Link to="/">
							<Item onClick={handleLogout}>로그아웃</Item>
						</Link>
					</>
					: <>
						<Item onClick={this.handleIsModal}>로그인</Item>
						{this.state.isModal &&
							<Login
								isOpen={true}
								close={this.handleIsModal}
								handleLocalLogin={handleLocalLogin}
							/>
						}
					</>
				}
			</Container >
		)
	}
}

export default withRouter(Navi);
