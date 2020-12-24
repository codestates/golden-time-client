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
  font-size: 20px;
  font-weight: 600;
  margin-left:5px;
  margin-bottom: 5px;
`;

const ClossingTime = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-left:5px;
  color:rgb(211,30,49);
`;

const Goods = ({ id, src, title, price, closing_time }) => (
  <Link to={`http://localhost:8080/api/goods/${id}`}>
    <Container>
      <Image src={src} />
      <Title>{title}</Title>
      <Price>{price}</Price>
      <ClossingTime>{closing_time}</ClossingTime>
    </Container>
  </Link>
);

export default Goods;
