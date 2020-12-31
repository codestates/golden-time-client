import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid black;
`;

const Text = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const User = styled.div`
  width: 10%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Time = styled.div`
  width: 10%;
  height:50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditComment = styled.input`
  background-color:rgb(244,244,244);
  border-radius:20px;
	width: 60%;
	height: 50px;
  border:0;
`;

const ButtonContainer = styled.div`
  width: 10%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const EditButton = styled.div`
  width: 50px;
  height: 25px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self:center;
	border: 0.5px solid black;
	background-color: white;
	cursor: pointer;
`;

const DeleteButton = styled.div`
  width: 50px;
  height: 25px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-self:center;
  align-items: center;
	border: 0.5px solid black;
	background-color: white;
  cursor: pointer;
  margin-left:10px;
`;

// makeTimer(createdAt) {
//   let end = new Date(createdAt * 1000);
//   return end;
// }

const Comment = ({ index, commentId, userId, userNick, commentMessage, createdAt, handleCommentInputValue, handleEditing, editing, editComment, deleteComment, userInfo }) => (
  <Container>
    {editing === commentId ?
      <>
        <EditComment type='text' placeholder={commentMessage} onChange={handleCommentInputValue("editingComment")} />
        <EditButton onClick={editComment.bind(null, commentId, index)}>확인</EditButton>
      </>
      : <Text>{commentMessage}</Text>}
    <User>{userNick}</User>
    <ButtonContainer>
      {userInfo.id === userId ?
        <>
          <EditButton onClick={handleEditing.bind(null, commentId)}>수정</EditButton>
          <DeleteButton onClick={deleteComment.bind(null, commentId)}>삭제</DeleteButton>
        </>
        : <></>}
    </ButtonContainer>
  </Container>
);

export default Comment;
