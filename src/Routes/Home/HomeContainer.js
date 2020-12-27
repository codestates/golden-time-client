import React from "react";
import axios from "axios";
import HomePresenter from "./HomePresenter";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    }
  }

  componentDidMount() {
    const condition = {
      title: this.props.search,
      zone: ''
    };
    if (this.props.currentLocation === 'no') {
      this.getGoodsData(condition);
    } else if (this.props.currentLocation) {
      condition.zone = this.props.currentLocation;
      this.getGoodsData(condition);
    }
  }

  async getGoodsData(condition) {
    try {
      // const goods = axios.post('http://localhost:4000/api/goods', {condition});
      // this.setState({goods});
    } catch {
      console.log('Data 수신에 실패하였습니다.');
    }
  }

  render() {
    return (
      <HomePresenter currentLocation={this.props.currentLocation} goods={this.state.goods} />
    );
  }
}