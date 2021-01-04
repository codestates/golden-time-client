import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 10px;
	border-bottom: 0.5px solid rgb(232,232,232);
`;

const UserContainer = styled.div`
	margin-top: 10px;
	padding-left: 10px;
	display: flex;
	align-items: center;
`;

const UserName = styled.div`
	font-size:15px;
	font-weight: 800;
	margin-right:10px;
`;

const CommentDate = styled.div`
	font-size:15px;
	font-weight:400;
	margin-right:10px;
`;

const EditButton = styled.div`
	width: 50px;
	height: 20px;
	border-radius: 15px;
	font-size: 15px;
	font-weight: 400;
	background-color: gray;
	color:white;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right:10px;
`;

const DeleteButton = styled.div`
	width: 50px;
	height: 20px;
	border-radius: 15px;
	font-size: 15px;
	font-weight: 400;
	background-color: rgb(239,98,83);
	color:white;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Text = styled.div`
	padding-left: 10px;
	width: 800px;
	height: 40px;
	display: flex;
	align-items: center;
`;

const EditContainer = styled.div`
	margin-top: 10px;
	padding-left: 5px;
	display: flex;
	align-items: center;
`;

const EditComment = styled.input`
	background-color: rgb(244, 244, 244);
	border-radius: 20px;
	margin-right: 20px;
	width: 800px;
	height: 40px;
	border: 0;
`;

const formatTime = (createdAt) => {
	return createdAt.slice(0, 10);
}

const Comment = ({
	index,
	commentId,
	userId,
	userNick,
	commentMessage,
	createdAt,
	handleCommentInputValue,
	handleEditing,
	editing,
	editComment,
	deleteComment,
	userInfo,
}) => (
	<Container>
		<UserContainer>
			<UserName>{userNick}</UserName>
			<CommentDate>{formatTime(createdAt)}</CommentDate>
			{userInfo && userInfo.id === userId &&
				<>
					<EditButton onClick={handleEditing.bind(null, commentId)}>
						수정
					</EditButton>
					<DeleteButton
						onClick={() => {
							deleteComment(commentId);
						}}>
						삭제
					</DeleteButton>
				</>
			}
		</UserContainer>
		{editing === commentId ?
			<EditContainer>
				<EditComment
					type='text'
					placeholder={commentMessage}
					onChange={handleCommentInputValue('editingComment')}
				/>
				<EditButton onClick={editComment.bind(null, commentId, index)}>
					확인
				</EditButton>
			</EditContainer>
			:
			<Text>{commentMessage}</Text>
		}
	</Container>
);

export default Comment;
