import React from "react";
import axios from "axios";
import HomePresenter from "./HomePresenter";

export default class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: null,
      loading: true,
      currentLocation: null,
      str: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getGoodsData = this.getGoodsData.bind(this);
    this.getSearchGoodsData = this.getSearchGoodsData.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.goods !== this.state.goods || nextState.currentLocation !== this.state.currentLocation || nextState.str !== this.state.str || nextProps.match.params.str !== this.props.match.params.str);
  }

  componentDidUpdate(prevProps) {
    const { goods, currentLocation } = this.state;
    const isLoggedIn = localStorage.getItem("userInfo");
    const str = this.props.match.params.str;
    const prevStr = prevProps.match.params.str;
    this.setState({ str });
    if (isLoggedIn && (!goods || str !== prevStr)) {
      const location = JSON.parse(isLoggedIn).area;
      if (str) {
        this.getSearchGoodsData(str, location);
      } else {
        this.getGoodsData(location);
      }
    } else if (currentLocation && !isLoggedIn && (!goods || str !== prevStr)) {
      if (str) {
        this.getSearchGoodsData(str, currentLocation);
      } else {
        this.getGoodsData(currentLocation);
      }
    } else if (currentLocation === "no" && !isLoggedIn && (!goods || str !== prevStr)) {
      if (str) {
        this.getSearchGoodsData(str);
      } else {
        this.getGoodsData();
      }
    }
  }

  componentDidMount() {
    const { goods, currentLocation } = this.state;
    const isLoggedIn = localStorage.getItem("userInfo");
    const str = this.props.match.params.str;
    this.setState({ str });
    if (!isLoggedIn) {
      this.getLocation();
    } else if (isLoggedIn && !goods) {
      const location = JSON.parse(isLoggedIn).area;
      this.setState({ currentLocation: location });
      if (str) {
        this.getSearchGoodsData(str, location);
      } else {
        this.getGoodsData(location);
      }
    } else if (currentLocation && !goods && !isLoggedIn) {
      if (str) {
        this.getSearchGoodsData(str, currentLocation);
      } else {
        this.getGoodsData(currentLocation);
      }
    } else if (currentLocation === "no" && !isLoggedIn && !goods) {
      if (str) {
        this.getSearchGoodsData(str);
      } else {
        this.getGoodsData();
      }
    }
  }

  getLocation() {
    try {
      navigator.geolocation.getCurrentPosition(async position => {
        const x = position.coords.longitude;
        const y = position.coords.latitude;
        const result = await axios.get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}`,
          {
            headers: {
              Authorization: `KakaoAK ffb53639ffe1e1521cd3006a5a09ee3d`,
            },
          }
        );
        const currentLocation =
          result.data.documents[0].address.region_2depth_name;
        console.log(currentLocation);
        this.setState({ currentLocation });
      });
    } catch (err) {
      this.setState({ currentLocation: "no" });
    }
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
    console.log('검색어 요청');
    const searchData = await axios.post(
      "http://localhost:8088/search",
      { area, str },
      { withCredentials: true }
    );
    this.setState({ goods: searchData.data, loading: false });
  }

  render() {
    const { loading, goods, currentLocation, str } = this.state;
    return (
      <HomePresenter
        loading={loading}
        goods={goods}
        currentLocation={currentLocation}
        search={str}
      />
    );
  }
}
