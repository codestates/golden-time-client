import React from 'react';
import axios from 'axios';
import GoodsDetailPresenter from './GoodsDetailPresenter';
import { FaThinkPeaks } from 'react-icons/fa';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: { id: 22, nick: "테스트중" },
      detail: {},
      convertedData: {
        category: null,
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
  }

  componentDidMount() {
    // this.setState({ userInfo: this.props.location.state.userInfo });
    this.getDetailData();
    // this.getDetailData(this.props.match.params.id);
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
          price: 234324324,
          bidPrice: 1000,
          closing_time: 1609055449,
          category: 1,
          images: ['https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407'],
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
        this.setCategory(this.state.detail.category);
        this.numberWithCommas(this.state.detail.price, this.state.detail.bidPrice);
        this.makeTimer(this.state.detail.closing_time);
      });
    } catch {
      console.log('Data 수신에 실패하였습니다.');
    }
  }

  setCategory(category) {
    const categoryName = {
      1: '의류',
      2: '가전',
      3: '가구',
      4: '생활용품',
      5: '기타'
    };
    this.setState(state => ({ convertedData: { ...state.convertedData, category: categoryName[category] } }));
  }

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

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: Number(e.target.value) });
  };

  handleCommentInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
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
            commentMessage: this.state.comment,
            createdAt: new Date().getTime() / 1000,
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

  render() {
    // console.log(this.props.location);
    // console.log(this.props.match.params.id);
    console.log(this.props.location.state.userInfo);
    return (
      <GoodsDetailPresenter
        userInfo={this.state.userInfo}
        detail={this.state.detail}
        convertedData={this.state.convertedData}
        handleInputValue={this.handleInputValue}
        postBidPrice={this.postBidPrice}
        comment={this.state.comment}
        handleCommentInputValue={this.handleCommentInputValue}
        postComment={this.postComment}
        deleteComment={this.deleteComment}
      />
    );
  }
}
