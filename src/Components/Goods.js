import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Image = styled.img`
	width: 280px;
	height: 280px;
	border-radius: 15px;
	border: 0.5px solid rgb(232, 232, 232);
	margin-bottom: 20px;
`;

const Title = styled.div`
	font-size: 15px;
	font-weight: 600;
	margin-left: 10px;
	margin-bottom: 10px;
`;

const Price = styled.span`
	font-size: 15px;
	font-weight: 600;
	margin-left: 10px;
	margin-bottom: 10px;
`;

const ClosingTime = styled.div`
	font-size: 15px;
	font-weight: 600;
	margin-left: 10px;
	color: rgb(211, 30, 49);
`;

function numberWithCommas(price) {
	return `${price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '--'
		}`;
}

function makeTimer(closing_time) {
	let cur = new Date();
	let end = new Date(Date.parse(closing_time));
	let diff = end - cur;
	let result = '';
	if (diff < 0) {
		result = '입찰 마감';
	} else {
		const diffDays = Math.floor(
			(end.getTime() - cur.getTime()) / (1000 * 60 * 60 * 24)
		);
		diff -= diffDays * (1000 * 60 * 60 * 24);
		const diffHours = Math.floor(diff / (1000 * 60 * 60));
		diff -= diffHours * (1000 * 60 * 60);
		const diffMin = Math.floor(diff / (1000 * 60));
		diff -= diffMin * (1000 * 60);
		const diffSec = Math.floor(diff / 1000);
		result = `남은시간 : ${diffDays === 0 ? '' : `${diffDays}일`} ${diffHours === 0 ? '' : `${diffHours}시간`
			} ${diffMin}분`;
	}
	return result;
}

const Goods = ({ id, src, title, price, bidPrice, closing_time, userInfo }) => (
	<Link
		to={{
			pathname: `/goods/detail/${id}`,
			state: { userInfo },
		}}>
		<Container>
			<Image src={src} />
			<Title>{title}</Title>
			<Price>{`현재가 : ${numberWithCommas(bidPrice)} 원`}</Price>
			<ClosingTime>{makeTimer(closing_time)}</ClosingTime>
		</Container>
	</Link>
);

export default Goods;
