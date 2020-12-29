import React from 'react';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
registerLocale('ko', ko);

const Container = styled.div`
	display: flex;
	height: 100vh;
	justify-content: center;
`;

const Content = styled.div`
	width: 38%;
	height: 100%;
`;

const TitleArea = styled.div`
	margin-top: 3rem;
	font-size: 1.5rem;
	font-weight: bold;
	padding-bottom: 16px;
	border-bottom: 3px solid #222;
`;

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 3rem;
	height: 100%;
`;

const ImageArea = styled.div`
	border-bottom: solid 1px lightgray;
	height: auto;
	padding-bottom: 1rem;
`;

const ImageContent = styled.div``;

const InfoArea = styled.div`
	margin-top: 1.3rem;
	border-bottom: solid 1px lightgray;
	padding-bottom: 0.5rem;
`;

const InfoText = styled.p`
	font-size: 0.8rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
`;

const InfoInput = styled.input`
	padding-left: 0.3rem;
	width: 30%;
	font-size: 15px;
	line-height: 22px;
	border: 1px solid lightgray;
	resize: none;
	border-radius: 10px;
	outline: 0;
	&::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const InfoTextArea = styled.textarea`
	width: 50%;
	height: 8rem;
	font-size: 0.8rem;
	line-height: 22px;
	border: 1px solid lightgray;
	resize: none;
	border-radius: 10px;
	outline: 0;
`;

const GoodsImage = styled.img`
	width: 10rem;
	height: 10rem;
`;

const ImageFileInput = styled.input`
	display: none;
`;

const GoodsImages = styled.ul`
	display: flex;
	list-style: none;
	margin-top: 2rem;
	flex-wrap: wrap;
`;

const ImageUpLoadButton = styled.li`
	width: 10rem;
	height: 10rem;
	cursor: pointer;
	margin-right: 1rem;
	margin-bottom: 1rem;
`;

const ImagePreview = styled.li`
	width: 10rem;
	height: 10rem;
	margin-right: 1rem;
	margin-bottom: 1rem;
`;

const ImageRemoveButton = styled.button`
	width: 1.5rem;
	cursor: pointer;
	position: absolute;
	height: 1.5rem;
	background-position: center center;
	background-repeat: no-repeat;
	background-size: 12px 12px;
	background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDEyIDEyIj4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTYuODQ4IDZsMy43NzYtMy43NzZhLjYuNiAwIDEgMC0uODQ4LS44NDhMNiA1LjE1IDIuMjI0IDEuMzc2YS42LjYgMCAwIDAtLjg0OC44NDhMNS4xNTIgNiAxLjM3NiA5Ljc3NWEuNi42IDAgMSAwIC44NDguODQ5TDYgNi44NDhsMy43NzYgMy43NzZhLjU5OC41OTggMCAwIDAgMS4wMjQtLjQyNS42LjYgMCAwIDAtLjE3Ni0uNDI0TDYuODQ4IDZ6IiBvcGFjaXR5PSIuNjQiLz4KPC9zdmc+Cg==);
	background-color: rgba(30, 29, 41, 0.32);
	border-radius: 50%;
	border: 0;
	outline: 0;
`;

const Button = styled.input.attrs({
	type: 'button',
	value: '등록하기',
})`
	width: 30%;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.16px;
	height: 3.2rem;
	line-height: 50px;
	font-weight: 700;
	border-radius: 15px;
	outline: 0;
	color: white;
	background-color: black;
	cursor: pointer;
	padding: 0;
`;

const ButtonArea = styled.div`
	margin-top: 1rem;
	align-items: center;
	height: 10%;
`;

const ErrorMessageArea = styled.div`
	margin-top: 2em;
	height: 2em;
	color: red;
	font-size: 0.8rem;
`;

const CatagorySelect = styled.select`
	padding-left: 0.3rem;
	width: 15%;
	height: 60%;
	font-size: 0.8rem;
	line-height: 22px;
	resize: none;
	border-radius: 10px;
	outline: 0;
	background-color: white;
`;

const WonText = styled.span`
	font-size: 0.8rem;
	font-weight: bold;
	color: gray;
	margin-left: 0.5rem;
`;

const DateSelectButton = styled.button`
	width: 10rem;
	outline: 0;
	color: white;
	background-color: white;
	cursor: pointer;
	padding: 0;
	border-radius: 10px;
	border: solid 3px lightgray;
	color: black;
`;

const now = new Date();
const tm = new Date(now.setDate(now.getDate() + 1));
const ExampleCustomInput = ({ value, onClick }) => (
	<DateSelectButton className='example-custom-input' onClick={onClick}>
		{value}
	</DateSelectButton>
);

const GoodsPostPresenter = ({
	fileRef,
	closing_time,
	handleSubmit,
	errorMessage,
	removeGoodsImage,
	handleInputValue,
	handleDateChange,
	imagesPreviewUrls,
	handleImageChange,
	handleSelectChange,
	ImageUpLoadButtonClick,
}) => (
	<Container>
		<Content>
			<TitleArea>상품 등록</TitleArea>
			<InputArea>
				<ImageArea>
					<InfoText>상품 이미지</InfoText>
					<ImageContent>
						<GoodsImages>
							<ImageUpLoadButton>
								<GoodsImage
									src='../images/imageUpload.png'
									onClick={ImageUpLoadButtonClick}
								/>
								<ImageFileInput
									ref={fileRef}
									type='file'
									multiple
									onChange={handleImageChange}
								/>
							</ImageUpLoadButton>
							{imagesPreviewUrls &&
								imagesPreviewUrls.map((url, i) => (
									<ImagePreview key={i}>
										<ImageRemoveButton
											onClick={() => {
												removeGoodsImage(url.name);
											}}
										/>
										<GoodsImage src={url.url} />
									</ImagePreview>
								))}
						</GoodsImages>
					</ImageContent>
				</ImageArea>
				<InfoArea>
					<InfoText>상품명</InfoText>
					<InfoInput type='text' onChange={handleInputValue('title')} />
				</InfoArea>
				<InfoArea>
					<InfoText>경매 시작가</InfoText>
					<InfoInput type='number' onChange={handleInputValue('price')} />
					<WonText>원</WonText>
				</InfoArea>
				<InfoArea>
					<InfoText>상세 설명</InfoText>
					<InfoTextArea onChange={handleInputValue('text')} />
				</InfoArea>
				<InfoArea>
					<InfoText>경매 종료일</InfoText>
					<DatePicker
						dateFormat='yyyy년 MM월 dd일'
						locale='ko'
						selected={closing_time}
						onChange={date => {
							handleDateChange(date);
						}}
						minDate={tm}
						customInput={<ExampleCustomInput />}
					/>
				</InfoArea>
				<InfoArea>
					<InfoText>카테고리</InfoText>
					<CatagorySelect onChange={handleSelectChange}>
						<option value='0'>선택</option>
						<option value='의류'>의류</option>
						<option value='가전'>가전제품</option>
						<option value='가구'>가구</option>
						<option value='생활용품'>생활용품</option>
						<option valye='기타'>기타</option>
					</CatagorySelect>
				</InfoArea>
				<ErrorMessageArea>{errorMessage}</ErrorMessageArea>
				<ButtonArea>
					<Button onClick={handleSubmit} />
				</ButtonArea>
			</InputArea>
		</Content>
	</Container>
);

export default GoodsPostPresenter;
