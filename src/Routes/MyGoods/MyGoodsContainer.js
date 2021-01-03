import React, { Component } from 'react';
import MyGoodsPresenter from './MyGoodsPresenter';
import axios from 'axios';

class MyGoodsContainer extends Component {
	state = {
		goodsList: [],
	};

	async componentDidMount() {
		const accessToken = localStorage.getItem('accessToken');

		const response = await axios.get('http://localhost:8088/goods/mygoods', {
			withCredentials: true,
			headers: {
				Authorization: `bearer ${accessToken}`,
			},
		});

		this.setState({ ...this.state, goodsList: response.data });
		console.log('내 상품 리스트', this.state.goodsList);
	}

	numberWithCommas(price) {
		return `경매 시작가 : ${price
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`;
	}

	makeTimer(closing_time) {
		let cur = new Date();
		let end = new Date(closing_time);
		let diff = end - cur;
		if (diff < 0) {
			return '입찰 마감';
		} else {
			const diffDays = Math.floor(
				(end.getTime() - cur.getTime()) / (1000 * 60 * 60 * 24)
			);
			diff -= diffDays * (1000 * 60 * 60 * 24);
			const diffHours = Math.floor(diff / (1000 * 60 * 60));
			diff -= diffHours * (1000 * 60 * 60);
			const diffMin = Math.floor(diff / (1000 * 60));
			diff -= diffMin * (1000 * 60);
			return `남은시간 : ${diffDays === 0 ? '' : `${diffDays}일`} ${
				diffHours === 0 ? '' : `${diffHours}시간`
			} ${diffMin}분`;
		}
	}

	render() {
		return (
			<MyGoodsPresenter
				goodsList={this.state.goodsList}
				makeTimer={this.makeTimer.bind(this)}
				numberWithCommas={this.numberWithCommas}
			/>
		);
	}
}

export default MyGoodsContainer;
