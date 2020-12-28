import React from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  background-color:forestgreen;
  display: flex;
  justify-content: center;
  /* align-items: flex-end; */
`;

const Text = styled.div`
  background-color:blue;
  width:200px;
  height:50px;
`

const User = styled.div`
 background-color:palegoldenrod;
  width:100px;
  height:50px;
`

const Time = styled.div`
 background-color:indianred;
  width:100px;
  height:50px;
`

const Edit = styled.div`
  background-color:white;
  width:50px;
  height:50px;
  border-radius: 50px;
`;

const EditComment = styled.input`
  background-color:rgb(244,244,244);
  border-radius:20px;
	width: 80%;
	height: 50px;
  border:0;
`;

const EditBtn = styled.div`
  background-color:oldlace;
  width:50px;
  height:50px;
  border-radius: 50px;
`;

const Delete = styled.div`
  background-color:white;
  width:50px;
  height:50px;
  border-radius: 50px;
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
      commentMessage: null,
      createdAt: null
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
      this.setState({ editing: false, commentMessage: this.state.editComment, createdAt: new Date().getTime() / 1000 },
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
            <EditBtn onClick={this.editComment}>확인</EditBtn>
          </>
          : <Text>{this.state.commentMessage}</Text>}
        <User>{this.state.userNick}</User>
        <Time>{this.state.createdAt}</Time>
        {this.state.userInfo.id === this.state.userId ?
          <>
            <Edit onClick={this.handleEditing}>수정</Edit>
            <Delete onClick={this.props.deleteComment.bind(null, this.state.commentId)}>삭제</Delete>
          </>
          : <></>}
      </Container>
    )
  }
}


export default Comment;
