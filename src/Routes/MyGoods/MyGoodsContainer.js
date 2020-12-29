import React, { Component } from 'react';
import MyGoodsPresenter from './MyGoodsPresenter';
import axios from 'axios';

class MyGoodsContainer extends Component {
	state = {
		goodsList: [],
	};

	async componentDidMount() {
		const accessToken = localStorage.getItem('accessToken');

		const response = await axios.get('http://localhost:8080/goods/mygoods', {
			withCredentials: true,
			headers: {
				Authorization: `bearer ${accessToken}`,
			},
		});

		this.setState({ ...this.state, goodsList: response.data });
		console.log('내 상품 리스트', this.state.goodsList);
	}

	render() {
		return <MyGoodsPresenter goodsList={this.state.goodsList} />;
	}
}

export default MyGoodsContainer;
