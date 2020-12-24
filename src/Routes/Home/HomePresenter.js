import React from "react";
import styled from "styled-components";
// import Helmet from "react-helmet";
import Goods from "../../Components/Goods";
import Session from "../../Components/Session";
import Loader from "../../Components/Loader";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Notice = styled.div`
  width: 100vw;
  height:300px;
  background-color: rgb(99,126,168);
`;

const HomePresenter = ({ goods }) => {
  return (
    <Container>
      <Notice />
      <Session>
        {goods.map(item => (
          <Goods
            id={item.id}
            src={item.src}
            title={item.title}
            price={item.price}
            closing_time={item.closing_time}
          />
        ))}
      </Session>
    </Container>
  );
}


export default HomePresenter;
