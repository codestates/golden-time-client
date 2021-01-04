import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	width: 1300px;
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 1300px;
`;

const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.span`
	font-size: 20px;
	font-weight: 800;
`;

const PostButton = styled.div`
	width: 200px;
	height: 50px;
	border-radius: 15px;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-right: 50px;
	background-color: rgb(34, 34, 34);
	color: white;
`;

const Grid = styled.div`
	margin-top: 25px;
	display: grid;
	grid-template-columns: repeat(4, 280px);
	grid-gap: 50px;
`;

const Section = ({
	currentLocation,
	search,
	children,
	handlePostGoods,
	userInfo,
}) => (
	<Container>
		<TitleContainer>
			<Title>
				{currentLocation === 'no'
					? search
						? `전국에서 '${search}' 검색 결과`
						: `전국에서 판매중인 상품`
					: search
					? `${currentLocation}에서 '${search}' 검색 결과`
					: `${currentLocation}에서 판매중인 상품`}
			</Title>
			{userInfo && <PostButton onClick={handlePostGoods}>상품등록</PostButton>}
		</TitleContainer>
		<Grid>{children}</Grid>
	</Container>
);

export default Section;
