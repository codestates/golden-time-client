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
			console.log('디테일dd', detail.data);
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
			// this.setState({
			//   detail: {
			//     id: 2,
			//     title: 'Nike x Dior',
			//     text: '개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. ',
			//     price: 10000,
			//     bidPrice: 50000,
			//     closing_time: 1619055449,
			//     category: '의류',
			//     images: ['https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K', 'https://cdn.shopify.com/s/files/1/0047/5617/6984/products/image_2a4cc742-9f1c-4474-b417-f3b880be2f1c_grande.jpg?v=1594182161'],
			//     comments: [
			//       {
			//         commentId: 1,
			//         userId: 22,
			//         nick: '이재용',
			//         commentMessage: '와 개쩌네요',
			//         createdAt: 1609055449,
			//       },
			//       {
			//         commentId: 2,
			//         userId: 23,
			//         nick: '나매크인',
			//         commentMessage: '와 개쩌네요222',
			//         createdAt: 1609055449,
			//       },
			//       {
			//         commentId: 3,
			//         userId: 24,
			//         nick: '이지부스트',
			//         commentMessage: '와 개쩌네요3333',
			//         createdAt: 1609055449,
			//       },
			//       {
			//         commentId: 4,
			//         userId: 25,
			//         nick: '마르지엘라',
			//         commentMessage: '와 개구리네요 개굴개굴',
			//         createdAt: 1609055449,
			//       },
			//     ],
			//     user: {
			//       id: 22,
			//       nick: '나매인',
			//       pofile_image: 'https://i.pinimg.com/474x/bc/d4/ac/bcd4ac32cc7d3f98b5e54bde37d6b09e.jpg'
			//     },
			//     bidder: {
			//       id: 33,
			//       nick: '이재용'
			//     }
			//   }
			// }, () => {
			//   this.numberWithCommas(this.state.detail.price, this.state.detail.bidPrice);
			//   this.makeTimer(this.state.detail.closing_time);
			// });
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
								commentMessage: result.data.commentMessage.comment,
							},
						],
					},
				}));
				// this.setState(state => ({
				//   comment: '',
				//   detail: {
				//     ...state.detail, comments: [...state.detail.comments,
				//     {
				//       commentId: this.state.detail.comments[this.state.detail.comments.length - 1].commentId + 1,
				//       userId: this.state.userInfo.id,
				//       nick: this.state.userInfo.nick,
				//       commentMessage: this.state.comment
				//     }]
				//   }
				// }));
			}
		} catch (err) {
			console.error(err);
		}
	}

	async editComment(commentId, index) {
		try {
			let accessToken = localStorage.getItem('accessToken');
			const result = await axios.post(
				`http://localhost:8080/comments/modified`,
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
			// this.setState(state => ({
			//   editing: null,
			//   editingComment: '',
			//   detail: {
			//     ...state.detail, comments: [
			//       ...state.detail.comments.slice(0, index),
			//       {
			//         commentId,
			//         userId: this.state.userInfo.id,
			//         nick: this.state.userInfo.nick,
			//         commentMessage: this.state.editingComment
			//       },
			//       ...state.detail.comments.slice(index + 1)
			//     ]
			//   }
			// }));
		} catch (err) {
			console.log(err);
		}
	}

	async deleteComment(commentId) {
		try {
			let accessToken = localStorage.getItem('accessToken');
			await axios.post(
				`http://localhost:8088/comments/delete`,
				{
					goodsId: this.state.detail.id,
					commentId,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${accessToken}`,
					},
				}
			);
			// this.setState(state => ({
			//   detail: {
			//     ...state.detail, comments: state.detail.comments.filter(item => item.commentId !== commentId)
			//   }
			// }));
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
			// this.props.history.push('/');
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
