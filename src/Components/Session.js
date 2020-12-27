import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top:30px;
  margin-left:30px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 800;
`;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(4, 280px);
  grid-gap: 50px;
`;

const Section = ({ currentLocation, children }) => (
  <Container>
    <Title>{currentLocation ? `${currentLocation}에서 판매중인 상품` : `전국에서 판매중인 상품`}</Title>
    <Grid>{children}</Grid>
  </Container>
);

export default Section;