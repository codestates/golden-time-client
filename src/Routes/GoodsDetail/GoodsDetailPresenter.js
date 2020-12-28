import React from "react";
import styled from "styled-components";
import Comment from "../../Components/Comment";
import Loader from "../../Components/Loader";

const MainContainer = styled.div`
  background-color:red;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-left: 10vw;
`;


const SubContainer = styled.div`
  background-color:rebeccapurple;
  width: 80vw;
  height: 500px;
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
`;

const ImageContainer = styled.div`
  position: relative;
  background-color: greenyellow;
  width: 50%;
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
`;

const Image = styled.img`
  position:absolute;
  top:0px;
  left:0px;
  width:500px;
  height:500px;
  border-radius: 50px;
  z-index:2;
`;

const ImageBefore = styled.div`
  position:absolute;
  top:225px;
  left:0px;
  background-color:white;
  width:50px;
  height:50px;
  border-radius: 50px;
  z-index:3;
`;

const ImageAfter = styled.div`
position:absolute;
  top:225px;
  left:450px;
  background-color:white;
  width:50px;
  height:50px;
  border-radius: 50px;
  z-index:3;
`;


const ContentsContainer = styled.div`
  background-color:firebrick;
  width: 50%;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
`;

const Title = styled.div`
  background-color:blue;
  height: 50px;
  font-size: 50px;
  font-weight: 800;
  /* margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 10px; */
`;

const Category = styled.div`
  font-size: 30px;
  font-weight: 400;
`;

const Seller = styled.div`
  font-size: 30px;
  font-weight: 400;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 6px;
`;

const BidPrice = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 6px;
`;

const Bidder = styled.span`
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

const Text = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-left:5px;
  margin-top:10px;
  margin-bottom: 10px;
`;


const BidContainer = styled.div`
  width:280px;
  height:280px;
  border-radius: 50px;
  display: flex;
`;

const Input = styled.input`
  background-color:rgb(244,244,244);
  border-radius:20px;
	width: 80%;
	height: 50px;
  border:0;
`;

const Ask = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-left:5px;
  margin-top:10px;
  margin-bottom: 10px;
`;

const CommentContainer = styled.div`
  background-color:violet;
  width: 80vw;
  height: 500px;
  display: flex;
  flex-direction:column;
`;

const InputContainer = styled.div`
  width:280px;
  height:280px;
  border-radius: 50px;
  display: flex;
`;

const InputComment = styled.input`
  background-color:rgb(244,244,244);
  border-radius:20px;
	width: 80%;
	height: 50px;
  border:0;
`;

const SubmitComment = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-left:5px;
  margin-top:10px;
  margin-bottom: 10px;
`;

const GoodsDetailPresenter = ({ userInfo, detail: { id, images = [], title, text, comments = [], user = {}, bidder = {}, }, convertedData: { category, price, bidPrice, closing_time }, postBidPrice, handleInputValue, comment, handleCommentInputValue, postComment, deleteComment }) => {
  return (
    <MainContainer>
      <SubContainer>
        <ImageContainer>
          <ImageBefore></ImageBefore>
          <Image src={images[0]} />
          <ImageAfter></ImageAfter>
        </ImageContainer>
        <ContentsContainer>
          <Title>{title}</Title>
          <Category>{category}</Category>
          <Seller>{user.nick}</Seller>
          <Price>{`시작가 : ${price}원`}</Price>
          <BidPrice>{`현재가 : ${bidPrice}원`}</BidPrice>
          <Bidder>{bidder.nick}</Bidder>
          <ClosingTime>{closing_time}</ClosingTime>
          <Text>{text}</Text>
          <BidContainer>
            <Input type='number' placeholder={"입찰가격을 입력하세요."} onChange={handleInputValue("inputBidPrice")} />
            <Ask onClick={postBidPrice}>입찰</Ask>
          </BidContainer>
        </ContentsContainer>
      </SubContainer>
      <CommentContainer>
        {console.log(comments)}
        {comments.map(item => (
          <Comment
            key={item.commentId}
            postId={id}
            userInfo={userInfo}
            userId={item.userId}
            commentId={item.commentId}
            userNick={item.nick}
            commentMessage={item.commentMessage}
            createdAt={item.createdAt}
            deleteComment={deleteComment}
          />
        ))}
        <InputContainer>
          <InputComment type='text' placeholder={"댓글을 입력하세요."} value={comment} onChange={handleCommentInputValue("comment")} />
          <SubmitComment onClick={postComment}>입력</SubmitComment>
        </InputContainer>
      </CommentContainer>
    </MainContainer>
  );
};

export default GoodsDetailPresenter;