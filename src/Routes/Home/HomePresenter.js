import React from 'react';
import styled from 'styled-components';
import Goods from '../../Components/Goods';
import Session from '../../Components/Session';
import Loader from '../../Components/Loader';
import Footer from '../../Components/Footer';
import Slider from '../../Components/Slider';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const HomePresenter = ({
	loading,
	goods,
	userInfo,
	currentLocation,
	search,
	handlePostGoods,
}) => {
	return (
		<Container>
			<Slider />
			{loading ? (
				<Loader />
			) : (
				<Session
					currentLocation={currentLocation}
					handlePostGoods={handlePostGoods}
					search={search}
					userInfo={userInfo}>
					{goods.map(item => (
						<Goods
							key={item.id}
							id={item.id}
							src={item.thumbnail}
							title={item.title}
							price={item.price}
							bidPrice={item.bidPrice}
							closing_time={item.closing_time}
							userInfo={userInfo}
						/>
					))}
					{goods.length === 0 &&
						`${currentLocation}에서 판매 중인 상품이 없습니다`}
				</Session>
			)}
			<Footer />
		</Container>
	);
};

export default HomePresenter;
