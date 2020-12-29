import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Container = styled.div`
	display: flex;
	height: 100vh;
`;

const SideMenu = styled.div`
	width: 15%;
	padding: 4.4rem 0 0 4rem;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 32px;
	font-weight: bold;
`;

const LinkArea = styled.div`
	padding: 1rem;
`;

const SelectedLink = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const UnSelectedLink = styled.div`
	font-size: 1.2rem;
	color: gray;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const Content = styled.div`
	padding: 2rem;
	width: 85%;
`;

const GoodsArea = styled.div`
	width: 60%;
	height: 100%;
	padding-top: 3em;
	position: relative;
`;

const ContentTitle = styled.div`
	position: relative;
	padding-bottom: 16px;
	border-bottom: 3px solid #222;
	font-size: 1.5rem;
	font-weight: bold;
`;

const GoodsList = styled.ul`
	padding: 0;
	list-style: 0;
	display: flex;
	margin-top: 1.5rem;
	flex-wrap: wrap;
`;

const GoodsItem = styled.li`
	margin-right: 1rem;
	margin-bottom: 1rem;
`;

const GoodsImage = styled.img`
	width: 15rem;
	border-radius: 50px;
`;

const MyGoodsPresenter = ({ goodsList }) => (
	<Container>
		<SideMenu>
			<Title>MyPage</Title>
			<LinkArea>
				<Link to='/user/userinfo'>
					<UnSelectedLink>프로필 정보</UnSelectedLink>
				</Link>
				<Link to='/user/mygoods'>
					<SelectedLink>판매 내역</SelectedLink>
				</Link>
			</LinkArea>
		</SideMenu>
		<Content>
			<GoodsArea>
				<ContentTitle>판매중인 상품</ContentTitle>
				<GoodsList>
					{goodsList.length ? (
						goodsList.map(item => (
							<GoodsItem key={item.id}>
								<GoodsImage src={item.thumbnail} />
							</GoodsItem>
						))
					) : (
						<>
							<GoodsItem>
								<GoodsImage src='https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407' />
							</GoodsItem>
							<GoodsItem>
								<GoodsImage src='https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407' />
							</GoodsItem>
							<GoodsItem>
								<GoodsImage src='https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407' />
							</GoodsItem>
							<GoodsItem>
								<GoodsImage src='https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407' />
							</GoodsItem>
							<GoodsItem>
								<GoodsImage src='https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407' />
							</GoodsItem>
						</>
					)}
				</GoodsList>
			</GoodsArea>
		</Content>
	</Container>
);

export default MyGoodsPresenter;
