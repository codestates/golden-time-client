import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCaretSquareRight, FaRegCaretSquareLeft } from 'react-icons/fa';
import styled from 'styled-components';
import Comment from '../../Components/Comment';

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 50px;
`;

const SubContainer = styled.div`
	width: 1200px;
	height: 500px;
	display: flex;
	justify-content: center;
`;

const ImageContainer = styled.div`
	width: 50%;
	display: flex;
	/* align-self:flex-start; */
	/* justify-content: center; */
	align-items: center;
`;

const Image = styled.img`
	width: 500px;
	height: 500px;
	border-radius: 30px;
	margin-left: 5px;
	margin-right: 5px;
`;

const ContentsContainer = styled.div`
	width: 50%;
	margin-left: 50px;
	display: flex;
	flex-direction: column;
	/* justify-content: center;
  align-items: center; */
`;

const Title = styled.div`
	font-size: 50px;
	font-weight: 800;
	margin-bottom: 20px;
	display: flex;
	align-items: flex-end;
`;

const Category = styled.div`
	font-size: 15px;
	color: gray;
	margin: 1rem;
`;

const Seller = styled.div`
	font-size: 30px;
	font-weight: 600;
	margin-bottom: 20px;
`;

const Price = styled.span`
	font-size: 30px;
	font-weight: 600;
	margin-bottom: 20px;
`;

const BidPrice = styled.span`
	font-size: 30px;
	font-weight: 600;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const Bidder = styled.span`
	font-size: 20px;
	font-weight: 400;
	margin-left: 10px;
`;

const ClosingTime = styled.div`
	font-size: 30px;
	font-weight: 600;
	color: rgb(211, 30, 49);
	margin-bottom: 20px;
	/* border-bottom: 0.5px solid gray; */
`;

const Text = styled.div`
	font-size: 20px;
	font-weight: 400;
	width: 75%;
	line-height: 30px;
	margin-bottom: 20px;
`;

const BidContainer = styled.div`
	display: flex;
	margin-bottom: 10px;
`;

const Input = styled.input`
	background-color: rgb(244, 244, 244);
	border-radius: 10px;
	width: 200px;
	height: 40px;
	margin-left: 40%;
`;

const Ask = styled.div`
	width: 80px;
	height: 40px;
	border-radius: 15px;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.5px solid black;
	background-color: white;
	cursor: pointer;
	margin-left: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
`;

const EditButton = styled(Link)`
	width: 80px;
	height: 40px;
	border-radius: 15px;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.5px solid rgb(99, 126, 168);
	background-color: white;
	cursor: pointer;
	margin-left: 50%;
`;

const DeleteButton = styled.div`
	width: 80px;
	height: 40px;
	border-radius: 15px;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.5px solid rgb(240, 19, 72);
	background-color: white;
	cursor: pointer;
	margin-left: 20px;
`;

const CommentContainer = styled.div`
	margin-top: 30px;
	width: 60vw;
	display: flex;
	flex-direction: column;
`;

const CommentInputContainer = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
`;

const InputComment = styled.input`
	background-color: rgb(244, 244, 244);
	border-radius: 20px;
	width: 80%;
	height: 50px;
	border: 0;
`;

const SubmitComment = styled.div`
	width: 20%;
	height: 50px;
	border-radius: 15px;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 0.5px solid black;
	background-color: white;
	cursor: pointer;
	margin-left: 20px;
`;

const GoodsDetailPresenter = ({
	userInfo,
	detail: {
		id,
		categoryId,
		images = [],
		title,
		text,
		comments = [],
		user = {},
		bidder = {},
	},
	imageNum,
	convertedData: { price, bidPrice, closing_time },
	comment,
	editing,
	handleInputValue,
	handleCommentInputValue,
	handleNextImage,
	handleBeforeImage,
	handleEditing,
	postBidPrice,
	postComment,
	editComment,
	deleteComment,
	deletePost,
}) => {
	return (
		<MainContainer>
			<SubContainer>
				<ImageContainer>
					<FaRegCaretSquareLeft
						size='50'
						color='rgb(186,185,184)'
						onClick={handleBeforeImage}
					/>
					<Image src={images[imageNum]} />
					<FaRegCaretSquareRight
						size='50'
						color='rgb(186,185,184)'
						onClick={handleNextImage}
					/>
				</ImageContainer>
				<ContentsContainer>
					<Title>
						{title}
						<Category>{`(${categoryId})`}</Category>
					</Title>
					<Seller>{`판매자 : ${user.nick}`}</Seller>
					<Price>{`시작가 : ${price} 원`}</Price>
					<BidPrice>
						{`현재가 : ${bidPrice} 원`}
						<Bidder>{`(입찰 예정자 : ${bidder.nick})`}</Bidder>
					</BidPrice>
					<ClosingTime>{closing_time}</ClosingTime>
					<Text>{text}</Text>
					{userInfo.id === user.id ? (
						<ButtonContainer>
							<EditButton to={`/goods/edit/${id}`}>수정</EditButton>
							<DeleteButton onClick={deletePost}>삭제</DeleteButton>
						</ButtonContainer>
					) : (
						closing_time !== '입찰 마감' && (
							<BidContainer>
								<Input
									type='number'
									placeholder={'입찰가격을 입력하세요.'}
									onChange={handleInputValue('inputBidPrice')}
								/>
								<Ask onClick={postBidPrice}>입찰</Ask>
							</BidContainer>
						)
					)}
				</ContentsContainer>
			</SubContainer>
			<CommentContainer>
				{comments.map((item, index) => (
					<Comment
						key={item.commentId}
						index={index}
						commentId={item.commentId}
						userId={item.userId}
						userNick={item.nick}
						commentMessage={item.commentMessage}
						createdAt={item.createdAt}
						handleCommentInputValue={handleCommentInputValue}
						handleEditing={handleEditing}
						editing={editing}
						editComment={editComment}
						deleteComment={deleteComment}
						userInfo={userInfo}
					/>
				))}
				<CommentInputContainer>
					<InputComment
						type='text'
						placeholder={'댓글을 입력하세요.'}
						value={comment}
						onChange={handleCommentInputValue('comment')}
					/>
					<SubmitComment onClick={postComment}>입력</SubmitComment>
				</CommentInputContainer>
			</CommentContainer>
		</MainContainer>
	);
};

export default GoodsDetailPresenter;
