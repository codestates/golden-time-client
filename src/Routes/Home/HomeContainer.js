import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  goods = [{
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '1123123GGGGggg',
    closing_time: '10시간'
  }, {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  },
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  },
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  },
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  },
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  },
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  },
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  },
  {
    id: 1,
    src: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/eehabecsfly0wy1pxxve/air-max-270-big-kids-shoe-HbtNX3.jpg',
    title: '쩌는 신발',
    price: '100',
    closing_time: '10시간'
  }]

  render() {
    return (
      <HomePresenter goods={this.goods} />
    );
  }
}