import React from 'react';
import axios from 'axios';
import GoodsDetailPresenter from './GoodsDetailPresenter';
import { FaThinkPeaks } from 'react-icons/fa';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { id: 22, nick: "이재용" },
      userInfo: {},
      detail: {},
      imageNum: 0,
      convertedData: {
        price: null,
        bidPrice: null,
        closing_time: null
      },
      inputBidPrice: null,
      comment: ''
    }

    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.postBidPrice = this.postBidPrice.bind(this);
    this.postComment = this.postComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleNextImage = this.handleNextImage.bind(this);
    this.handleBeforeImage = this.handleBeforeImage.bind(this);
  }

  componentDidMount() {
    // this.setState({ userInfo: this.props.location.state.userInfo });
    // this.getDetailData(this.props.match.params.id);
    this.getDetailData();
  }

  async getDetailData(id) {
    try {
      console.log('network 사용');
      // const detail = await axios.post(`http://localhost:8080/api/goods/detail/${id}`);
      this.setState({
        detail: {
          id: 2,
          title: 'Nike x Dior',
          text: '개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. 개쩌는 신발입니다. ',
          price: 10000,
          bidPrice: 50000,
          closing_time: 1609055449,
          category: '의류',
          images: ['https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K', 'https://cdn.shopify.com/s/files/1/0047/5617/6984/products/image_2a4cc742-9f1c-4474-b417-f3b880be2f1c_grande.jpg?v=1594182161'],
          comments: [
            {
              commentId: 1,
              userId: 22,
              nick: '이재용',
              commentMessage: '와 개쩌네요',
              createdAt: 1609055449,
            },
            {
              commentId: 2,
              userId: 23,
              nick: '나매크인',
              commentMessage: '와 개쩌네요222',
              createdAt: 1609055449,
            },
            {
              commentId: 3,
              userId: 24,
              nick: '이지부스트',
              commentMessage: '와 개쩌네요3333',
              createdAt: 1609055449,
            },
            {
              commentId: 4,
              userId: 25,
              nick: '마르지엘라',
              commentMessage: '와 개구리네요 개굴개굴',
              createdAt: 1609055449,
            },
          ],
          user: {
            id: 22,
            nick: '나매인',
            pofile_image: 'https://i.pinimg.com/474x/bc/d4/ac/bcd4ac32cc7d3f98b5e54bde37d6b09e.jpg'
          },
          bidder: {
            id: 33,
            nick: '이재용'
          }
        }
      }, () => {
        // this.setCategory(this.state.detail.category);
        this.numberWithCommas(this.state.detail.price, this.state.detail.bidPrice);
        this.makeTimer(this.state.detail.closing_time);
      });
    } catch {
      console.log('Data 수신에 실패하였습니다.');
    }
  }

  // setCategory(category) {
  //   const categoryName = {
  //     1: '의류',
  //     2: '가전',
  //     3: '가구',
  //     4: '생활용품',
  //     5: '기타'
  //   };
  //   this.setState(state => ({ convertedData: { ...state.convertedData, category: categoryName[category] } }));
  // }

  numberWithCommas(price, bidPrice) {
    price = `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    bidPrice = `${bidPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    this.setState(state => ({ convertedData: { ...state.convertedData, price, bidPrice } }));
  }

  makeTimer(closing_time) {
    let cur = new Date();
    let end = new Date(closing_time * 1000);
    let diff = end - cur;
    const diffDays = Math.floor((end.getTime() - cur.getTime()) / (1000 * 60 * 60 * 24));
    diff -= diffDays * (1000 * 60 * 60 * 24);
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    diff -= diffHours * (1000 * 60 * 60);
    const diffMin = Math.floor(diff / (1000 * 60));
    diff -= diffMin * (1000 * 60);
    const diffSec = Math.floor(diff / 1000);
    const result = `남은시간 : ${diffDays < 10 ? `0${diffDays}` : diffDays}일 ${diffHours < 10 ? `0${diffHours}` : diffHours}시간 ${diffMin < 10 ? `0${diffMin}` : diffMin}분 ${diffSec < 10 ? `0${diffSec}` : diffSec}초`;
    this.setState(state => ({ convertedData: { ...state.convertedData, closing_time: result } }));
  }

  handleNextImage() {
    if (this.state.imageNum < this.state.detail.images.length - 1) {
      this.setState(state => ({ imageNum: state.imageNum + 1 }));
    }
  }

  handleBeforeImage() {
    if (this.state.imageNum > 0) {
      this.setState(state => ({ imageNum: state.imageNum - 1 }));
    }
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: Number(e.target.value) });
  };

  handleCommentInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: Number(e.target.value) });
  };

  postBidPrice() {
    try {
      console.log('bid nework사용');
      if (this.state.inputBidPrice <= this.state.detail.bidPrice) {
        alert('현재가보다 입찰가가 낮거나 같습니다');
        throw '입찰가 에러';
      }
      this.setState(state => ({ detail: { ...state.detail, bidPrice: this.state.inputBidPrice, bidder: this.state.userInfo } }),
        async () => {
          this.numberWithCommas(this.state.detail.price, this.state.detail.bidPrice);
          // let accessToken = localStorage.getItem('accessToken');
          // await axios.post(`http://localhost:8080/api/goods/bid`,
          //   {
          //     bidPrice: this.state.detail.bidPrice,
          //     goodsId: this.state.detail.id
          //   },
          //   {
          //     withCredentials: true,
          //     headers: {
          //       Authorization: `bearer ${accessToken}`,
          //     },
          //   });
        });
    } catch (err) {
      console.log(err);
    }
  }

  postComment() {
    try {
      console.log('post comment nework사용');
      if (!this.state.comment) {
        alert('입력하신 텍스트가 없습니다.');
        throw '코멘트 에러';
      }
      this.setState(state => ({
        detail: {
          ...state.detail, comments: [...state.detail.comments,
          {
            commentId: this.state.detail.comments[this.state.detail.comments.length - 1].commentId + 1,
            userId: this.state.userInfo.id,
            nick: this.state.userInfo.nick,
            commentMessage: this.state.comment
          }
          ]
        }
      }),
        async () => {
          // let accessToken = localStorage.getItem('accessToken');
          // await axios.post(`http://localhost:8080/comments/addcomment`,
          //   {
          //     goodsId: this.state.detail.id,
          //     commentMessage: this.state.comment,
          //   },
          //   {
          //     withCredentials: true,
          //     headers: {
          //       Authorization: `bearer ${accessToken}`,
          //     },
          //   });
          this.setState({ comment: '' });
        });
    } catch (err) {
      console.log(err);
    }
  }

  deleteComment(commentId) {
    try {
      console.log('comment delete nework사용');
      this.setState(state => ({
        detail: {
          ...state.detail, comments: state.detail.comments.filter(item => item.commentId !== commentId)
        }
      }),
        async () => {
          // let accessToken = localStorage.getItem('accessToken');
          // await axios.post(`http://localhost:8080/comments/delete`,
          //   {
          //     goodsId: this.state.detail.id,
          //     commentId: commentId
          //   },
          //   {
          //     withCredentials: true,
          //     headers: {
          //       Authorization: `bearer ${accessToken}`,
          //     },
          //   });
        });
    } catch (err) {
      console.log(err);
    }
  }

  async deletePost() {
    // let accessToken = localStorage.getItem('accessToken');
    // let response = await axios.post(`http://localhost:8080/goods/delete`,
    //   {
    //     goodsId: this.state.detail.id
    //   },
    //   {
    //     withCredentials: true,
    //     headers: {
    //       Authorization: `bearer ${accessToken}`,
    //     },
    //   });
    // this.props.history.push(response.data.redirect_url);
    this.props.history.push('/');
  }

  render() {
    // console.log(this.props.location);
    // console.log(this.props.match.params.id);
    // console.log(this.props.location.state.userInfo);
    return (
      <GoodsDetailPresenter
        userInfo={this.state.userInfo}
        detail={this.state.detail}
        imageNum={this.state.imageNum}
        convertedData={this.state.convertedData}
        handleInputValue={this.handleInputValue}
        postBidPrice={this.postBidPrice}
        comment={this.state.comment}
        handleCommentInputValue={this.handleCommentInputValue}
        postComment={this.postComment}
        deleteComment={this.deleteComment}
        deletePost={this.deletePost}
        handleNextImage={this.handleNextImage}
        handleBeforeImage={this.handleBeforeImage}
      />
    );
  }
}
