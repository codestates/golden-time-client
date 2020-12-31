import React from "react";
import axios from "axios";
import HomePresenter from "./HomePresenter";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goods: null,
      loading: true
    }
    this.getGoodsData = this.getGoodsData.bind(this);
    this.getSearchGoodsData = this.getSearchGoodsData.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { currentLocation, search } = this.props;
    return (currentLocation !== nextProps.currentLocation || search !== nextProps.search || this.state.goods !== nextState.goods);
  }

  componentDidUpdate(prevProps) {
    const { currentLocation, search } = this.props;
    if (currentLocation === 'no' && (!this.state.goods || search !== prevProps.search)) {
      if (search) {
        console.log('serch');
        this.getSearchGoodsData({ search });
      } else {
        this.getGoodsData();
      }
    } else if (currentLocation && (!this.state.goods || search !== prevProps.search)) {
      if (search) {
        console.log('serch');
        this.getSearchGoodsData({
          search,
          area: currentLocation
        });
      } else {
        this.getGoodsData({ area: currentLocation });
      }
    }
  }

  componentDidMount() {
    const { currentLocation, search } = this.props;
    if (currentLocation === 'no' && !this.state.goods) {
      if (search) {
        this.getSearchGoodsData({ search });
      } else {
        this.getGoodsData();
      }
    } else if (currentLocation && !this.state.goods) {
      if (search) {
        this.getSearchGoodsData({
          search,
          area: currentLocation
        });
      } else {
        this.getGoodsData({ area: currentLocation });
      }
    }
  }

  async getGoodsData(condition) {
    try {
      // const goods = axios.post('http://localhost:8088/api/goods', condition);
      // this.setState({ goods });
      this.setState({
        goods: [{
          id: 1,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 2,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 3,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 4,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 5,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 6,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 7,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 8,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 9,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 10,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }], loading: false
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getSearchGoodsData(condition) {
    try {
      // const goods = axios.post(`http://localhost:8088/search`, condition);
      // this.setState({ goods });
      this.setState({
        goods: [{
          id: 1,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }, {
          id: 2,
          src: 'https://shop2.daumcdn.net/thumb/R500x500.q90/?fname=http%3A%2F%2Fshop2.daumcdn.net%2Fshophow%2Fp%2FT10419351659.jpg%3Fut%3D20200904154407',
          title: 'Nike X Dior Air Jordan 1 Low',
          price: 10009000,
          bidPrice: 9999999,
          closing_time: 1609055449
        }], loading: false
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { userInfo, currentLocation, search } = this.props;
    const { loading, goods } = this.state;
    return (
      <HomePresenter
        loading={loading}
        goods={goods}
        userInfo={userInfo}
        currentLocation={currentLocation}
        search={search}
      />
    );
  }
}