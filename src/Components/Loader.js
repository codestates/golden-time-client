import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 50vh;
  width: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

export default () => (
  <Container>
    <span role="img" aria-label="Loading">
      ⏰ 데이터를 받아오는 중입니다 ⏰
    </span>
  </Container>
);
