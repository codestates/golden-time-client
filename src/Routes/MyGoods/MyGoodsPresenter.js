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
	text-align: center;
`;

const GoodsImage = styled.img`
	width: 15rem;
	height: 15rem;
	border-radius: 15px;
	border: 0.5px solid lightgray;
	&:hover {
		opacity: 0.6;
	}
`;

const GoodsTitle = styled.div`
	font-size: 1rem;
	font-weight: 400;
	margin-left: 5px;
	margin-top: 0.8rem;
	margin-bottom: 0.5rem;
`;

const GoodsPrice = styled.span`
	font-size: 0.9rem;
	font-weight: 600;
	margin-left: 5px;
	margin-top: 0.5rem;
`;

const GoodsClosingTime = styled.div`
	font-size: 0.9rem;
	font-weight: 600;
	margin-left: 5px;
	color: rgb(211, 30, 49);
	margin-top: 0.5rem;
	margin-top: 0.5rem;
`;

const EmptyArea = styled.div`
	height: 30rem;
`;

const EmptyAreaText = styled.p`
	color: gray;
`;

const EmptyAreaButton = styled.button`
	margin-top: 1rem;
	padding-top: 1px;
	padding-left: 11px;
	padding-right: 12px;
	display: inline-block;
	cursor: pointer;
	vertical-align: middle;
	text-align: center;
	background-color: rgb(244, 244, 244);
	border-radius: 6px;
	color: black;
	outline: 0;
	height: 2rem;
	font-weight: 700;
	font-size: 0.8rem;
	border: 0;
`;

const MyGoodsPresenter = ({ goodsList, numberWithCommas, makeTimer }) => (
	<Container>
		<SideMenu>
			<Title>MyPage</Title>
			<LinkArea>
				<Link to='/user/userinfo'>
					<UnSelectedLink>프로필 정보</UnSelectedLink>
				</Link>
				<Link to='/user/mygoods'>
					<SelectedLink>판매중인 상품</SelectedLink>
				</Link>
			</LinkArea>
		</SideMenu>
		<Content>
			<GoodsArea>
				<ContentTitle>판매중인 상품</ContentTitle>
				<GoodsList>
					{goodsList.length ? (
						goodsList.map(item => (
							<Link to={`/goods/detail/${item.id}`}>
								<GoodsItem key={item.id}>
									<GoodsImage src={item.thumbnail} />
									<GoodsTitle>{item.title}</GoodsTitle>
									<GoodsPrice>{numberWithCommas(item.price)}</GoodsPrice>
									<GoodsClosingTime>
										{makeTimer(Date.parse(item.closing_time))}
									</GoodsClosingTime>
								</GoodsItem>
							</Link>
						))
					) : (
						<EmptyArea>
							<EmptyAreaText>현재 판매중인 상품이 없습니다.</EmptyAreaText>
							<Link to={'/goods/post'}>
								<EmptyAreaButton>상품 등록 하러가기</EmptyAreaButton>
							</Link>
						</EmptyArea>
					)}
				</GoodsList>
			</GoodsArea>
		</Content>
	</Container>
);

export default MyGoodsPresenter;
