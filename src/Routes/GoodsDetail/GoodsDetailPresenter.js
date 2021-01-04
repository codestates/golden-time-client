import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Comment from '../../Components/Comment';
import Footer from "../../Components/Footer";
import Image from "../../Components/Image";

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 50px;
`;

const SubContainer = styled.div`
	width: 1100px;
	height: 500px;
	display: flex;
	justify-content: center;
`;

const ContentsContainer = styled.div`
	margin-left: 100px;
	width: 500px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 30px;
	font-weight: 800;
	margin-bottom: 10px;
	padding-left: 5px;
	display: flex;
`;

const Category = styled.div`
	font-size: 15px;;
	color: gray;
	margin-left: 10px;
	margin-bottom: 5px;
	align-self: flex-end;
`;

const Seller = styled.div`
	font-size: 15px;
	margin-bottom: 20px;
	border-bottom: 0.5px solid rgb(232,232,232);
	padding-bottom: 20px;
	padding-left: 5px;
`;

const Price = styled.span`
	font-size: 20px;
	font-weight: 400;
	margin-bottom: 15px;
	padding-left: 5px;
`;

const BidPrice = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 15px;
	display: flex;
	align-items: center;
	padding-left: 5px;
`;

const Bidder = styled.span`
	font-size: 15px;
	margin-left: 10px;
`;

const ClosingTime = styled.div`
	font-size: 20px;
	font-weight: 600;
	color: rgb(211, 30, 49);
	margin-bottom: 20px;
	padding-left: 5px;
	border-bottom: 0.5px solid rgb(232,232,232);
	padding-bottom: 20px;
`;

const Text = styled.div`
	width: 500px;
	height: 150px;
	overflow : auto;
	font-size: 15px;
	line-height: 30px;
	padding-left: 5px;
	padding-bottom: 20px;
	border-bottom: 0.5px solid rgb(232,232,232);
	margin-bottom: 20px;
`;

const BidContainer = styled.div`
	display: flex;
	padding-left: 5px;
`;

const Input = styled.input`
	background-color: rgb(244, 244, 244);
	padding-left: 20px;
	border-radius: 10px;
	width: 200px;
	height: 40px;
`;

const Ask = styled.div`
	background-color: rgb(239,98,83);
	width: 80px;
	height: 40px;
	border-radius: 15px;
	color:white;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-left: 20px;
`;

const ButtonContainer = styled.div`
	display: flex;
	padding-left: 5px;
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
	background-color: rgb(99,126,168);
	color:white;
	cursor: pointer;
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
	background-color: rgb(239,98,83);
	color: white;
	cursor: pointer;
	margin-left: 20px;
`;

const CommentContainer = styled.div`
	border-top: 0.5px solid gray;
	margin-top: 30px;
	width: 1100px;
	display: flex;
	flex-direction: column;
`;

const CommentTitle = styled.div`
	width: 1100px;
	font-size: 30px;
	font-weight: 800;
	padding-left: 5px;
	margin-top: 20px;
	padding-bottom:20px;
	margin-bottom:20px;
	border-bottom: 0.5px solid rgb(232,232,232);
`;

const CommentInputContainer = styled.div`
	padding-left: 5px;
	display: flex;
	border-bottom: 0.5px solid rgb(232,232,232);
	padding-bottom:20px;
`;

const InputComment = styled.input`
	padding-left: 20px;
	background-color: rgb(244, 244, 244);
	border-radius: 20px;
	width: 800px;
	height: 50px;
	border: 0;
`;

const SubmitComment = styled.div`
	width: 250px;
	height: 50px;
	border-radius: 15px;
	font-size: 20px;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	margin-left: 20px;
	background-color: rgb(34,34,34);
	color:white;
`;

const GoodsDetailPresenter = ({
	userInfo,
	detail: {
		id,
		categoryId,
		goodsImages = [],
		title,
		text,
		comments = [],
		user = {},
		bidder = {},
	},
	convertedData: { price, bidPrice, closing_time },
	comment,
	editing,
	handleInputValue,
	handleCommentInputValue,
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
				<Image goodsImages={goodsImages} />
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
					{userInfo ? userInfo.id === user.id ? (
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
						)
						: "비회원은 입찰에 참여하실 수 없습니다."}

				</ContentsContainer>
			</SubContainer>
			<CommentContainer>
				<CommentTitle>상품문의</CommentTitle>
				{userInfo &&
					<CommentInputContainer>
						<InputComment
							type='text'
							placeholder={'댓글을 입력하세요.'}
							value={comment}
							onChange={handleCommentInputValue('comment')}
						/>
						<SubmitComment onClick={postComment}>문의하기</SubmitComment>
					</CommentInputContainer>
				}
				{comments.map((item, index) => (
					<Comment
						key={item.id}
						index={index}
						commentId={item.id}
						userId={item.user.id}
						userNick={item.user.nick}
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

			</CommentContainer>
			<Footer />
		</MainContainer>
	);
};

export default GoodsDetailPresenter;
