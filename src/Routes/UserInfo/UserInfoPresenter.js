import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
	display: flex;
	height: 100vh;
`;

const SideMenu = styled.div`
	width: 15%;
	padding: 4.4rem 0 0 4rem;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	font-size: 2rem;
	font-weight: bold;
	color: 222;
`;

const LinkArea = styled.div`
	padding: 1rem;
`;

const SelectedLink = styled.div`
	font-size: 1.2rem;
	font-weight: bold;
	margin-top: 1rem;
	margin-bottom: 1rem;
	color: #222;
`;

const UnSelectedLink = styled.div`
	font-size: 1.2rem;
	color: gray;
	margin-top: 1rem;
	margin-bottom: 1rem;
`;

const Content = styled.div`
	padding: 2rem;
	width: 100%;
	display: flex;
`;

const ContentTitle = styled.div`
	position: relative;
	padding-bottom: 16px;
	border-bottom: 3px solid #222;
	font-size: 1.5rem;
	font-weight: bold;
	color: 222;
`;

const ProfileArea = styled.div`
	width: 70%;
	height: 100%;
	padding-top: 2.8em;
	padding-left: 10rem;
	position: relative;
`;

const UserProfile = styled.div`
	display: flex;
	margin-top: 1rem;
	border-radius: 13px;
	border: solid 0.5px lightgray;
	height: 12rem;
	padding: 30px 0 20px;
`;

const ProfileImageArea = styled.div`
	border-radius: 50%;
	margin-left: 10px;
`;

const ProfileImage = styled.img`
	width: 9rem;
	height: 9rem;
	border-radius: 50%;
`;

const ProfileContent = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem 1rem 0 1rem;
	font-size: 1.5rem;
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
	margin-top: 2rem;
	padding-top: 1px;
	padding-left: 11px;
	padding-right: 12px;
	cursor: pointer;
	vertical-align: middle;
	text-align: center;
	background-color: white;
	border-radius: 6px;
	border: 1px solid #d3d3d3;
	color: rgba(34, 34, 34, 0.8);
	outline: 0;
	height: 2rem;
	font-weight: bold;
	font-size: 0.8rem;
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
	color: #222;
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
	color: #222;
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
	background-color: white;
	border-radius: 6px;
	border: 1px solid #d3d3d3;
	color: rgba(34, 34, 34, 0.8);
	outline: 0;
	height: 2rem;
	font-weight: 700;
	font-size: 0.8rem;
	width: 10%;
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
	height: 2rem;
	width: 50%;
	padding-left: 0.3rem;
	background-color: rgb(244, 244, 244);
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
	border: 1px solid #d3d3d3;
	color: rgba(34, 34, 34, 0.8);
	padding: 0 38px;
	height: 2rem;
	cursor: pointer;
	font-weight: bold;
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
	height: 2rem;
	cursor: pointer;
	font-weight: bold;
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
	height: 2rem;
	width: 50%;
	padding-left: 0.3rem;
	background-color: rgb(244, 244, 244);
`;

const NewPasswordInput = styled.input.attrs({
	type: 'password',
	placeholder: '8~20자리사이 영어와 숫자조합',
})`
	margin-top: 0.5rem;
	outline: 0;
	border-radius: 8px;
	height: 2rem;
	width: 50%;
	padding-left: 0.3rem;
	background-color: rgb(244, 244, 244);
`;

const NewPasswordCheck = styled.input.attrs({
	type: 'password',
	placeholder: '비밀번호 확인',
})`
	margin-top: 0.5rem;
	outline: 0;
	border-radius: 8px;
	height: 2rem;
	width: 50%;
	padding-left: 0.3rem;
	background-color: rgb(244, 244, 244);
`;

const PasswordAreaTitle = styled.p`
	font-size: 0.8rem;
	font-weight: bold;
	color: black;
	margin-top: 0.6rem;
`;

const ErrorMessageArea = styled.span`
	font-size: 0.9rem;
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
	handleTimeStamp,
}) => (
	<Container>
		<SideMenu>
			<Title>MY PAGE</Title>
			<LinkArea>
				<Link to='/user/userinfo'>
					<SelectedLink>프로필 정보</SelectedLink>
				</Link>
				<Link to='/user/mygoods'>
					<UnSelectedLink>판매중인 상품</UnSelectedLink>
				</Link>
			</LinkArea>
		</SideMenu>
		<Content>
			<ProfileArea>
				<ContentTitle>프로필 정보</ContentTitle>
				<UserProfile>
					<ProfileImageArea>
						{userData.profileImage ? (
							<ProfileImage src={userData.profileImage} alt='프로필 이미지' />
						) : (
							<ProfileImage
								src='../images/defaultUser.png'
								alt='프로필 이미지'
							/>
						)}
					</ProfileImageArea>
					<ProfileContent>
						{userData.nick ? userData.nick : '김코딩'}
						<NewImageFile
							ref={fileRef}
							accept='image/*'
							onChange={handleImageFileChange}
						/>
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
							{userData.createdAt && handleTimeStamp(userData.createdAt)}
						</InfoText>
					</InfoArea>

					{userData.provider === 'local' &&
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
								<NewPasswordInput onChange={handleInputValue('newPassword')} />
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
						))}
				</ProfileInfo>
			</ProfileArea>
		</Content>
	</Container>
);

export default UserInfoPresenter;
