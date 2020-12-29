import React from "react";
import styled from "styled-components";
import axios from "axios";

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

function makeTimer(createdAt) {
  let end = new Date(createdAt * 1000);
  return end;
}

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editComment: null,
      postId: null,
      commentId: null,
      userInfo: {},
      userId: null,
      userNick: null,
      commentMessage: null
    }
    this.editComment = this.editComment.bind(this);
  }

  componentDidMount() {
    const { postId, userInfo, userId, commentId, userNick, commentMessage, createdAt } = this.props;
    this.setState({ postId, userInfo, userId, commentId, userNick, commentMessage, createdAt });
  }

  handleCommentInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleEditing = () => {
    this.setState(state => ({ editing: !state.editing }));
  };

  editComment() {
    try {
      console.log('comment edit nework사용');
      if (!this.state.editComment) {
        alert('입력하신 텍스트가 없습니다.');
        throw '코멘트 에러';
      }
      this.setState({ editing: false, commentMessage: this.state.editComment },
        async () => {
          // let accessToken = localStorage.getItem('accessToken');
          // await axios.post(`http://localhost:8080/comments/modified`,
          //   {
          //     goodsId: this.state.postId,
          //     commentId: this.state.commentId,
          //     commentMessage: this.state.commentMessage,
          //   },
          //   {
          //     withCredentials: true,
          //     headers: {
          //       Authorization: `bearer ${accessToken}`,
          //     },
          //   });
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Container>
        {this.state.editing ?
          <>
            <EditComment type='text' placeholder={this.state.commentMessage} onChange={this.handleCommentInputValue("editComment")} />
            <EditButton onClick={this.editComment}>확인</EditButton>
          </>
          : <Text>{this.state.commentMessage}</Text>}
        <User>{this.state.userNick}</User>
        <ButtonContainer>
          {this.state.userInfo.id === this.state.userId ?
            <>
              <EditButton onClick={this.handleEditing}>수정</EditButton>
              <DeleteButton onClick={this.props.deleteComment.bind(null, this.state.commentId)}>삭제</DeleteButton>
            </>
            : <></>}
        </ButtonContainer>
      </Container>
    )
  }
}


export default Comment;
