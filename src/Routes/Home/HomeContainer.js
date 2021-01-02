import React from "react";
import axios from "axios";
import HomePresenter from "./HomePresenter";

export default class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: null,
      loading: true,
    };
    // this.getGoodsData = this.getGoodsData.bind(this);
    // this.getSearchGoodsData = this.getSearchGoodsData.bind(this);
  }

  async getGoodsData(area = null) {
    const goodsList = await axios.post(
      "http://localhost:8088/goods",
      { area },
      { withCredentials: true }
    );
    this.setState({ goods: goodsList.data, loading: false });
  }

  async getSearchGoodsData(str, area = null) {
    const searchData = await axios.post(
      "http://localhost:8088/search",
      { area, str },
      { withCredentials: true }
    );
    this.setState({ goods: searchData.data });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.goods !== this.state.goods;
  }

  // componentDidUpdate() {
  //   console.log(this.props);
  // }

  componentDidMount() {
    const { goods } = this.state;
    const isLoggedIn = localStorage.getItem("userInfo");
    const str = this.props.match.params.str;
    if (!isLoggedIn && !goods) {
      if (str) {
        this.getSearchGoodsData(str);
      } else {
        this.getGoodsData();
      }
    } else {
      const location = JSON.parse(isLoggedIn).area;
      if (str) {
        this.getSearchGoodsData(str, location);
      } else {
        this.getGoodsData(location);
      }
    }
  }

  render() {
    const { loading, goods } = this.state;
    return (
      <HomePresenter
        loading={loading}
        goods={goods}
        // userInfo={userInfo}
        // currentLocation={}
        // search={search}
      />
    );
  }
}
