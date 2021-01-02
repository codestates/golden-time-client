import React from "react";
import styled from "styled-components";
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
  height: 300px;
  background-color: rgb(99, 126, 168);
`;

const HomePresenter = ({
  loading,
  goods,
  userInfo,
  currentLocation,
  search,
}) => {
  return (
    <Container>
      <Notice />
      {loading ? (
        <Loader />
      ) : (
          <Session currentLocation={currentLocation} search={search}>
            {goods.map((item) => (
              <Goods
                key={item.id}
                id={item.id}
                src={item.thumbnail}
                title={item.title}
                price={item.price}
                bidPrice={item.bidPrice}
                closing_time={item.closing_time}
                userInfo={userInfo}
              />
            ))}
          </Session>
        )}
    </Container>
  );
};

export default HomePresenter;
