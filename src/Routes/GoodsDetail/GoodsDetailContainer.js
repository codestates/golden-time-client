import React from 'react';
import axios from 'axios';
import GoodsDetailPresenter from './GoodsDetailPresenter';
export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userInfo: {},
			detail: {},
			imageNum: 0,
			convertedData: {
				price: null,
				bidPrice: null,
				closing_time: null,
			},
			inputBidPrice: null,
			comment: '',
			editingComment: '',
			editing: null,
		};
		this.getDetailData = this.getDetailData.bind(this);
		this.numberWithCommas = this.numberWithCommas.bind(this);
		this.makeTimer = this.makeTimer.bind(this);
		this.handleNextImage = this.handleNextImage.bind(this);
		this.handleBeforeImage = this.handleBeforeImage.bind(this);
		this.handleEditing = this.handleEditing.bind(this);
		this.handleInputValue = this.handleInputValue.bind(this);
		this.handleCommentInputValue = this.handleCommentInputValue.bind(this);
		this.postBidPrice = this.postBidPrice.bind(this);
		this.postComment = this.postComment.bind(this);
		this.editComment = this.editComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
		this.deletePost = this.deletePost.bind(this);
	}

	componentDidMount() {
		this.setState({ userInfo: JSON.parse(localStorage.getItem('userInfo')) });
		this.getDetailData(this.props.match.params.id);
	}

	async getDetailData(id) {
		try {
			const detail = await axios.get(
				`http://localhost:8088/goods/detail/${id}`
			);
			this.setState({ detail: detail.data }, () => {
				if (detail.data.bidPrice === null) {
					this.setState(state => ({
						detail: {
							...state.detail,
							bidPrice: state.detail.price,
							bidder: { id: 0, nick: '없음' },
						},
					}));
				}
				this.numberWithCommas(
					this.state.detail.price,
					this.state.detail.bidPrice
				);
				this.makeTimer(this.state.detail.closing_time);
			});
		} catch (err) {
			console.error(err);
		}
	}

	numberWithCommas(price, bidPrice) {
		price = `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
		bidPrice = `${
			bidPrice ? bidPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-'
		}`;
		this.setState(state => ({
			convertedData: { ...state.convertedData, price, bidPrice },
		}));
	}

	makeTimer(closing_time) {
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
			result = `남은시간 : ${diffDays < 10 ? `0${diffDays}` : diffDays}일 ${
				diffHours < 10 ? `0${diffHours}` : diffHours
			}시간 ${diffMin < 10 ? `0${diffMin}` : diffMin}분 ${
				diffSec < 10 ? `0${diffSec}` : diffSec
			}초`;
		}
		this.setState(state => ({
			convertedData: { ...state.convertedData, closing_time: result },
		}));
	}

	handleNextImage() {
		if (this.state.imageNum < this.state.detail.goodsImages.length - 1) {
			this.setState(state => ({ imageNum: state.imageNum + 1 }));
		}
	}

	handleBeforeImage() {
		if (this.state.imageNum > 0) {
			this.setState(state => ({ imageNum: state.imageNum - 1 }));
		}
	}

	handleEditing = commentId => {
		this.setState({ editing: commentId });
	};

	handleInputValue = key => e => {
		this.setState({ [key]: Number(e.target.value) });
	};

	handleCommentInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	async postBidPrice() {
		try {
			if (this.state.inputBidPrice <= this.state.detail.bidPrice) {
				alert('현재가보다 입찰가가 낮거나 같습니다');
				throw 'Post BidPrice Error';
			} else {
				let accessToken = localStorage.getItem('accessToken');
				const result = await axios.patch(
					`http://localhost:8088/goods/bid`,
					{
						bidPrice: this.state.inputBidPrice,
						goodsId: this.state.detail.id,
					},
					{
						withCredentials: true,
						headers: {
							Authorization: `bearer ${accessToken}`,
						},
					}
				);
				this.setState(state => ({
					detail: {
						...state.detail,
						bidPrice: result.data.bidPrice,
						bidder: result.data.bidder,
					},
				}));
				this.numberWithCommas(this.state.detail.price, result.data.bidPrice);
				// this.setState(state => ({ detail: { ...state.detail, bidPrice: this.state.inputBidPrice, bidder: this.state.userInfo } }));
				// this.numberWithCommas(this.state.detail.price, this.state.inputBidPrice);
			}
		} catch (err) {
			console.error(err);
		}
	}

	async postComment() {
		try {
			if (!this.state.comment) {
				alert('입력하신 텍스트가 없습니다.');
				throw 'Post Comment Error';
			} else {
				let accessToken = localStorage.getItem('accessToken');
				const result = await axios.post(
					`http://localhost:8088/comments/addcomment`,
					{
						goodsId: this.state.detail.id,
						commentMessage: this.state.comment,
					},
					{
						withCredentials: true,
						headers: {
							Authorization: `bearer ${accessToken}`,
						},
					}
				);
				console.log('resuddlt', result);
				this.setState(state => ({
					comment: '',
					detail: {
						...state.detail,
						comments: [
							...state.detail.comments,
							{
								commentId: result.data.commentId,
								userId: result.data.user.id,
								nick: result.data.user.nick,
								commentMessage: result.data.commentMessage,
							},
						],
					},
				}));
			}
		} catch (err) {
			console.error(err);
		}
	}

	async editComment(commentId, index) {
		try {
			let accessToken = localStorage.getItem('accessToken');
			const result = await axios.patch(
				`http://localhost:8088/comments/modifiedcomment`,
				{
					commentId,
					goodsId: this.state.detail.id,
					commentMessage: this.state.editingComment,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${accessToken}`,
					},
				}
			);
			this.setState(state => ({
				editing: null,
				editingComment: '',
				detail: {
					...state.detail,
					comments: [
						...state.detail.comments.slice(0, index),
						{
							commentId: result.data.id,
							userId: result.data.user.id,
							nick: result.data.user.nick,
							commentMessage: result.data.commentMessage,
						},
						...state.detail.comments.slice(index + 1),
					],
				},
			}));
		} catch (err) {
			console.log(err);
		}
	}

	async deleteComment(commentId) {
		console.log(this.state.detail.id);
		console.log('댓글 번d호d', commentId);
		try {
			let accessToken = localStorage.getItem('accessToken');
			console.log(accessToken);
			await axios({
				url: `http://localhost:8088/comments/deleteComment`,
				method: 'delete',
				data: { goodsId: this.state.detail.id, commentId },
				headers: { Authorization: `bearer ${accessToken}` },
			});
			/* 	this.setState(state => ({
				detail: {
					...state.detail,
					comments: state.detail.comments.filter(
						item => item.commentId !== commentId
					),
				},
			})); */
		} catch (err) {
			console.error(err);
		}
	}

	async deletePost() {
		try {
			let accessToken = localStorage.getItem('accessToken');
			const result = await axios.post(
				`http://localhost:8088/goods/delete`,
				{
					goodsId: this.state.detail.id,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${accessToken}`,
					},
				}
			);
			this.props.history.push(result.data.redirect_url);
		} catch (err) {
			console.error(err);
		}
	}

	render() {
		const {
			userInfo,
			detail,
			imageNum,
			convertedData,
			comment,
			editingComment,
			editing,
		} = this.state;
		return (
			<GoodsDetailPresenter
				userInfo={userInfo}
				detail={detail}
				imageNum={imageNum}
				convertedData={convertedData}
				comment={comment}
				editingComment={editingComment}
				editing={editing}
				handleInputValue={this.handleInputValue}
				handleCommentInputValue={this.handleCommentInputValue}
				handleNextImage={this.handleNextImage}
				handleBeforeImage={this.handleBeforeImage}
				handleEditing={this.handleEditing}
				postBidPrice={this.postBidPrice}
				postComment={this.postComment}
				editComment={this.editComment}
				deleteComment={this.deleteComment}
				deletePost={this.deletePost}
			/>
		);
	}
}
