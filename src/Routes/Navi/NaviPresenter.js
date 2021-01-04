import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import Login from '../../Components/Login';

const Container = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 120px;
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	z-index: 10;
	border-bottom: 0.5px solid rgb(232, 232, 232);
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
	width: 1000px;
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
	white-space: nowrap;
	width: 300px;
	font-size: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LocationName = styled.div`
	font-size: 15px;
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

const NaviPresenter = ({
	isLogin,
	currentLocation,
	isModal,
	handleLocalLogin,
	handleInputValue,
	handleLogout,
	handleIsModal,
	onKeyPress,
	onSearchClick,
}) => (
	<Container>
		<Link to='/'>
			<Home>
				<img src='/images/goldenTimeLogo.png' width='180px' height='90px' />
			</Home>
		</Link>

		<Input
			type='text'
			placeholder={'찾으시는 상품을 입력하세요.'}
			onKeyPress={onKeyPress}
			onChange={handleInputValue('search')}
		/>

		<Search>
			<FaSearch size='25' color='gray' onClick={onSearchClick} />
		</Search>

		{currentLocation === null ? (
			<Location>위치 정보를 확인하는 중입니다.</Location>
		) : currentLocation === false ? (
			<Location>위치 정보를 받아올 수 없습니다.</Location>
		) : (
			<Location>
				현재 위치는{'\u00A0'}
				<LocationName>{currentLocation}</LocationName>
				{'\u00A0'}입니다.
			</Location>
		)}

		{isLogin ? (
			<>
				<Link to='/user/userinfo'>
					<Item>마이 페이지</Item>
				</Link>

				<Item onClick={handleLogout}>로그아웃</Item>
			</>
		) : (
			<>
				<Item onClick={handleIsModal}>로그인</Item>
				{isModal && (
					<Login
						isOpen={true}
						close={handleIsModal}
						handleLocalLogin={handleLocalLogin}
					/>
				)}
			</>
		)}
	</Container>
);

export default NaviPresenter;
