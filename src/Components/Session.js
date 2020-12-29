import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 30px;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 800;
  align-self: center;
`;

const PostButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 15px;
  background-color: rgb(226,226,226);
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 50px;
`;

const Section = ({ currentLocation, children }) => (
  <Container>
    <Main>
      <Title>{currentLocation ? `${currentLocation}에서 판매중인 상품` : `전국에서 판매중인 상품`}</Title>
      <PostButton to="/goods/post">
        상품등록
      </PostButton>
    </Main>
    <Grid>{children}</Grid>
  </Container>
);

export default Section;