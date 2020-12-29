import React from "react";
import axios from "axios";
import HomePresenter from "./HomePresenter";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: null,
      currentLocation: null
    }
    this.getGoodsData = this.getGoodsData.bind(this);
    this.getSearchGoodsData = this.getSearchGoodsData.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (this.props.currentLocation !== nextProps.currentLocation || this.props.search !== nextProps.search);
  // }

  // componentWillUpdate() {
  // }

  componentDidMount() {
    // console.log(123123);
    // this.setState({ currentLocation: this.props.currentLocation });
    this.getGoodsData();
    // this.props.cuurentLocation === null
    // if (this.props.currentLocation === 'no') {
    //   if (this.props.search) {
    //     this.getSearchGoodsData();
    //   } else {
    //     this.getGoodsData();
    //   }
    // } else if (this.props.currentLocation) {
    //   if (this.props.search) {
    //     this.getSearchGoodsData({ area: this.props.currentLocation });
    //   } else {
    //     this.getGoodsData({ area: this.props.currentLocation });
    //   }
    // }

  }

  async getGoodsData(area) {
    try {
      const goods = axios.post('http://localhost:4000/api/goods', area);
      this.setState({ goods });
      console.log('전체요청');
      this.setState({
        goods: [{
          id: 1,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 2,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 3,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 4,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 5,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 6,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 7,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 8,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 9,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 10,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }]
      });
    } catch {
      console.log('Data 수신에 실패하였습니다.');
    }
  }

  async getSearchGoodsData(area) {
    try {
      // const goods = axios.post(`http://localhost:4000/search/${this.props.search}`, area);
      // this.setState({ goods });
      console.log('부분요청');
      this.setState({
        goods: [{
          id: 1,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }, {
          id: 2,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          closing_time: 1609055449
        }]
      });
    } catch {
      console.log('Data 수신에 실패하였습니다.');
    }
  }

  render() {
    return (
      <>
        <>{this.props.currentLocation}</>
        <HomePresenter userInfo={this.props.userInfo} currentLocation={this.props.currentLocation} goods={this.state.goods} />
      </>
    );
  }
}