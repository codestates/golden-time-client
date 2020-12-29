import React from "react";
import styled from "styled-components";
import Goods from "../../Components/Goods";
import Session from "../../Components/Session";
import Loader from "../../Components/Loader";
// import Helmet from "react-helmet";

const Container = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Notice = styled.div`
  width: 100vw;
  height: 300px;
  background-color: rgb(99,126,168);
`;

const HomePresenter = ({ currentLocation, goods, userInfo }) => {
  return (
    <Container>
      <Notice />
      {goods ?
        <Session currentLocation={currentLocation}>
          {goods.map(item => (
            <Goods
              key={item.id}
              id={item.id}
              src={item.src}
              title={item.title}
              price={item.price}
              closing_time={item.closing_time}
              userInfo={userInfo}
            />
          ))}
        </Session>
        : <Loader />}
    </Container>
  );
}

export default HomePresenter;
