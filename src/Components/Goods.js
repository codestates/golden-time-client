import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  /* align-items: flex-end; */
`;

const Image = styled.img`
  width:280px;
  height:280px;
  border-radius: 50px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-left:5px;
  margin-top:10px;
  margin-bottom: 10px;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 6px;
`;

const ClosingTime = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left:5px;
  color:rgb(211,30,49);
`;

function numberWithCommas(price) {
  return `가격 : ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원`;
}

function makeTimer(closing_time) {
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
  return (`남은시간 : ${diffDays < 10 ? `0${diffDays}` : diffDays}일 ${diffHours < 10 ? `0${diffHours}` : diffHours}시간 ${diffMin < 10 ? `0${diffMin}` : diffMin}분 ${diffSec < 10 ? `0${diffSec}` : diffSec}초`);
}

const Goods = ({ id, src, title, price, closing_time, userInfo }) => (
  <Link to={{
    pathname: `/goods/detail/${id}`,
    state: { userInfo }
  }}>
    {console.log(userInfo)}
    <Container>
      <Image src={src} />
      <Title>{title}</Title>
      <Price>{numberWithCommas(price)}</Price>
      <ClosingTime>{makeTimer(closing_time)}</ClosingTime>
    </Container>
  </Link>
);

export default Goods;
