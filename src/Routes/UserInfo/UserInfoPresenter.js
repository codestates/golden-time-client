import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	display: flex;
	height: 100vh;
`;

const SideMenu = styled.div`
	width: 15%;
	padding: 2rem;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 32px;
	font-weight: bold;
`;

const LinkArea = styled.div`
	padding: 1rem;
`;

const SelectedLink = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const UnSelectedLink = styled.div`
	font-size: 1.2rem;
	color: gray;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const Content = styled.div`
	padding: 2rem;
	width: 85%;
`;

const ContentTitle = styled.div`
	position: relative;
	padding-bottom: 16px;
	border-bottom: 3px solid #222;
	font-size: 1.5rem;
	font-weight: bold;
`;

const ProfileArea = styled.div`
	width: 50%;
	height: 100%;
	padding-top: 3em;
`;

const UserProfile = styled.div`
	display: flex;
	margin-top: 1rem;
	border-radius: 13px;
	border: solid 0.5px lightgray;
	height: 10rem;
	padding: 30px 0 20px;
`;

const ProfileImageArea = styled.div`
	border-radius: 50%;
	margin-left: 10px;
`;

const ProfileImage = styled.img`
	width: 100px;
	height: 100px;
`;

const ProfileContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem 1rem 0 1rem;
	font-size: 1.2rem;
	font-weight: bold;
`;

const NewImageFile = styled.input.attrs({ type: 'file' })`
	margin-top: 2rem;
	display: none;
`;

const NewImageButton = styled.input.attrs({
	type: 'button',
	value: '이미지 변경',
})`
	position: relative;
	right: 5px;
	bottom: 15px;
	margin-top: 3rem;
	padding-top: 1px;
	padding-left: 11px;
	padding-right: 12px;
	cursor: pointer;
	vertical-align: middle;
	text-align: center;
	background-color: black;
	border-radius: 15px;
	border: 1px solid black;
	color: white;
	outline: 0;
	height: 25px;
	font-weight: bold;
	font-size: 8px;
`;

const ProfileInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	width: 70%;
`;

const ProfileInfoTitle = styled.div`
	margin-top: 2rem;
	font-size: 1.3rem;
	font-weight: bold;
`;

const InfoArea = styled.div`
	padding: 25px 60px 18px 0;
	position: relative;
	border-bottom: 1px solid #ebebeb;
`;

const InfoTitle = styled.p`
	font-size: 1rem;
	line-height: 19px;
	letter-spacing: -0.07px;
	color: rgba(34, 34, 34, 0.5);
`;

const InfoText = styled.p`
	margin-top: 0.5rem;
	font-size: 1rem;
	font-weight: bold;
	line-height: 19px;
	letter-spacing: -0.07px;
	color: black;
`;

const ModifyButton = styled.input.attrs({
	type: 'button',
	value: '변경',
})`
	position: absolute;
	right: 0;
	bottom: 15px;
	padding-top: 1px;
	padding-left: 11px;
	padding-right: 12px;
	display: inline-block;
	cursor: pointer;
	vertical-align: middle;
	text-align: center;
	background-color: black;
	border-radius: 15px;
	border: 1px solid black;
	color: white;
	outline: 0;
	height: 25px;
	font-weight: bold;
	font-size: 8px;
`;

const NickNameModifyArea = styled.div`
	padding: 25px 0 18px;
	position: relative;
	border-bottom: 1px solid #ebebeb;
`;

const NickNameInput = styled.input.attrs({
	type: 'text',
	placeholder: '새로운 닉네임',
})`
	margin-top: 0.5rem;
	outline: 0;
	border-radius: 8px;
	border: solid 0.2px lightgray;
	height: 2rem;
	width: 50%;
`;

const ButtonArea = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 1.5rem;
`;

const InputCloseButton = styled.input.attrs({
	type: 'button',
	value: '취소',
})`
	margin-right: 0.5rem;
	background-color: white;
	outline: 0;
	border-radius: 6px;
	border: solid 1px black;
	color: black;
	padding: 0 38px;
	height: 2.3rem;
	cursor: pointer;
`;

const InputSubmitButton = styled.input.attrs({
	type: 'button',
	value: '저장',
})`
	margin-left: 0.5rem;
	background-color: black;
	outline: 0;
	border-radius: 6px;
	border: solid 1px black;
	color: white;
	padding: 0 38px;
	height: 2.3rem;
	cursor: pointer;
`;

const PasswordModifyArea = styled.div`
	padding: 25px 0 18px;
	position: relative;
	border-bottom: 1px solid #ebebeb;
`;

const CurrentPasswordInput = styled.input.attrs({
	type: 'password',
	placeholder: '현재 비밀번호',
})`
	margin-top: 0.5rem;
	outline: 0;
	border-radius: 8px;
	border: solid 0.2px lightgray;
	height: 2rem;
	width: 50%;
`;

const NewPasswordInput = styled.input.attrs({
	type: 'password',
	placeholder: '8~20자리사이 영어와 숫자조합',
})`
	margin-top: 0.5rem;
	outline: 0;
	border-radius: 8px;
	border: solid 0.2px lightgray;
	height: 2rem;
	width: 50%;
`;

const NewPasswordCheck = styled.input.attrs({
	type: 'password',
	placeholder: '비밀번호 확인',
})`
	margin-top: 0.5rem;
	outline: 0;
	border-radius: 8px;
	border: solid 0.2px lightgray;
	height: 2rem;
	width: 50%;
`;

const PasswordAreaTitle = styled.p`
	font-size: 0.7rem;
	font-weight: bold;
	color: black;
	margin-top: 0.6rem;
`;

const ErrorMessageArea = styled.span`
	margin-left: 1rem;
	color: red;
`;

const UserInfoPresenter = ({
	userData,
	nickNameInput,
	passwordInput,
	handleNickNameInput,
	handlePasswordInput,
	handleInputValue,
	handleNickNameModify,
	nickErrorMessage,
	fileRef,
	handleNewImageButtonClick,
	handleImageFileChange,
	currentPasswordError,
	newPasswordError,
	passwordCheckError,
	handlePasswordModify,
}) => (
	<Container>
		<SideMenu>
			<Title>MyPage</Title>
			<LinkArea>
				<Link to='/user/userinfo'>
					<SelectedLink>프로필 정보</SelectedLink>
				</Link>
				<Link to='/user/mygoods'>
					<UnSelectedLink>판매 내역</UnSelectedLink>
				</Link>
			</LinkArea>
		</SideMenu>
		<Content>
			<ProfileArea>
				<ContentTitle>프로필 정보</ContentTitle>
				<UserProfile>
					<ProfileImageArea>
						{userData.profile ? (
							<ProfileImage
								src={`http://localhost:8080/uploads/${userData.profile}`}
								alt='프로필 이미지'
							/>
						) : (
							<img src='../images/defaultUser.png' alt='프로필 이미지' />
						)}
					</ProfileImageArea>
					<ProfileContent>
						{userData.nick ? userData.nick : '김코딩'}
						<NewImageFile ref={fileRef} onChange={handleImageFileChange} />
						<NewImageButton onClick={handleNewImageButtonClick} />
					</ProfileContent>
				</UserProfile>
				<ProfileInfo>
					<ProfileInfoTitle>내 정보</ProfileInfoTitle>
					<InfoArea>
						<InfoTitle>이메일</InfoTitle>
						<InfoText>
							{userData.email ? userData.email : 'jaehunb350@gmail.com'}
						</InfoText>
					</InfoArea>

					{!nickNameInput ? (
						<InfoArea>
							<InfoTitle>닉네임</InfoTitle>
							<InfoText>{userData.nick ? userData.nick : '김코딩'}</InfoText>
							<ModifyButton
								onClick={() => {
									handleNickNameInput(nickNameInput);
								}}
							/>
						</InfoArea>
					) : (
						<NickNameModifyArea>
							<InfoTitle>닉네임</InfoTitle>
							<InfoText>{userData.nick ? userData.nick : '김코딩'}</InfoText>
							<NickNameInput onChange={handleInputValue('newNick')} />
							<ErrorMessageArea>{nickErrorMessage}</ErrorMessageArea>
							<ButtonArea>
								<InputCloseButton
									onClick={() => {
										handleNickNameInput(nickNameInput);
									}}
								/>
								<InputSubmitButton
									onClick={() => {
										handleNickNameModify();
									}}
								/>
							</ButtonArea>
						</NickNameModifyArea>
					)}

					<InfoArea>
						<InfoTitle>가입일</InfoTitle>
						<InfoText>
							{userData.createdAt ? userData.createdAt : '2020-12-25'}
						</InfoText>
					</InfoArea>

					{userData.provider === 'local' ||
						(!userData.provider &&
							(!passwordInput ? (
								<InfoArea>
									<InfoTitle>비밀번호 관리</InfoTitle>
									<ModifyButton
										onClick={() => {
											handlePasswordInput(passwordInput);
										}}
									/>
								</InfoArea>
							) : (
								<PasswordModifyArea>
									<InfoTitle>비밀번호 변경</InfoTitle>
									<PasswordAreaTitle>현재 비밀번호</PasswordAreaTitle>
									<CurrentPasswordInput
										onChange={handleInputValue('currentPassword')}
									/>
									<ErrorMessageArea>{currentPasswordError}</ErrorMessageArea>
									<br />
									<PasswordAreaTitle>새 비밀번호</PasswordAreaTitle>
									<NewPasswordInput
										onChange={handleInputValue('newPassword')}
									/>
									<ErrorMessageArea>{newPasswordError}</ErrorMessageArea>
									<br />
									<PasswordAreaTitle>새 비밀번호 확인</PasswordAreaTitle>
									<NewPasswordCheck
										onChange={handleInputValue('newPasswordCheck')}
									/>
									<ErrorMessageArea>{passwordCheckError}</ErrorMessageArea>
									<ButtonArea>
										<InputCloseButton
											onClick={() => {
												handlePasswordInput(passwordInput);
											}}
										/>
										<InputSubmitButton
											onClick={() => {
												handlePasswordModify();
											}}
										/>
									</ButtonArea>
								</PasswordModifyArea>
							)))}
				</ProfileInfo>
			</ProfileArea>
		</Content>
	</Container>
);

export default UserInfoPresenter;
