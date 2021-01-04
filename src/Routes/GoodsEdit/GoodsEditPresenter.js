import React from 'react';
import styled from 'styled-components';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './swiper.css';

SwiperCore.use([Navigation, Pagination]);

const Container = styled.div`
	display: flex;
	height: auto;
	justify-content: center;
	margin-bottom: 5rem;
`;

const Content = styled.div`
	width: 55%;
	height: 100%;
`;

const TitleArea = styled.div`
	margin-top: 3rem;
	font-size: 2rem;
	font-weight: bold;
	padding-bottom: 16px;
	color: #222;
	border-bottom: 3px solid #222;
`;

const InputArea = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 3rem;
`;

const ImageArea = styled.div`
	border-bottom: solid 1px lightgray;
	height: auto;
	padding-bottom: 1rem;
	margin-top: 1.5rem;
`;

const ImageContent = styled.div``;

const InfoArea = styled.div`
	margin-top: 1.3rem;
	border-bottom: solid 1px lightgray;
	height: auto;
	padding-bottom: 0.5rem;
`;

const InfoText = styled.p`
	font-size: 1rem;
	font-weight: 500;
	margin-bottom: 0.5rem;
`;

const InfoInput = styled.input`
	padding-left: 0.3rem;
	width: 40%;
	height: 2rem;
	font-size: 15px;
	line-height: 22px;
	border: 0;
	resize: none;
	border-radius: 10px;
	background-color: rgb(244, 244, 244);
	outline: 0;
	&::-webkit-outer-spin-button,
	::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const InfoTextArea = styled.textarea`
	width: 60%;
	height: 10rem;
	font-size: 0.8rem;
	line-height: 22px;
	border: 0;
	resize: none;
	border-radius: 10px;
	outline: 0;
	background-color: rgb(244, 244, 244);
`;

const GoodsImage = styled.img`
	width: 12rem;
	height: 12rem;
	border-radius: 6px;
`;

const SwiperGoodsImage = styled.img`
	width: 25rem;
	height: 25rem;
	border-radius: 6px;
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

const ImagePreview = styled.li`
	width: 12rem;
	height: 12rem;
	margin-right: 1rem;
	margin-bottom: 1rem;
	border-radius: 6px;
`;

const ImageUpLoadButton = styled.li`
	width: 12rem;
	height: 12rem;
	cursor: pointer;
	margin-right: 1rem;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: rgb(244, 244, 244);
	border-radius: 6px;
`;

const ImageUpLoadText = styled.span`
	color: gray;
	margin-top: 0.5rem;
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
	value: '수정하기',
})`
	width: 30%;
	font-size: 16px;
	line-height: 24px;
	letter-spacing: -0.16px;
	height: 3.2rem;
	line-height: 50px;
	font-weight: 700;
	border-radius: 40px;
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

const GoodsEditPresenter = ({
	fileRef,
	goodsData,
	handleSubmit,
	imagesPreviewUrls,
	handleInputValue,
	removeGoodsImage,
	handleImageChange,
	ImageUpLoadButtonClick,
}) => (
	<Container>
		<Content>
			<TitleArea>상품 수정</TitleArea>
			<InputArea>
				<ImageArea>
					<InfoText>현재 이미지</InfoText>
					<Swiper
						tag='section'
						wrapperTag='ul'
						navigation
						pagination
						spaceBetween={0}
						slidesPerView={1}>
						{goodsData.goodsImages.length &&
							goodsData.goodsImages.map((image, i) => (
								<SwiperSlide key={i} tag='li'>
									<SwiperGoodsImage src={image.imagePath} />
								</SwiperSlide>
							))}
					</Swiper>
				</ImageArea>
				<ImageArea>
					<InfoText>이미지 수정</InfoText>
					<ImageContent>
						<GoodsImages>
							<ImageUpLoadButton
								onClick={() => {
									ImageUpLoadButtonClick();
								}}>
								<FontAwesomeIcon icon={faCamera} size='3x' color='lightgray' />
								<ImageUpLoadText>이미지 등록</ImageUpLoadText>
								<ImageFileInput
									type='file'
									ref={fileRef}
									multiple
									onChange={handleImageChange}
									accept='image/*'
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
					{goodsData.title && (
						<InfoInput
							type='text'
							defaultValue={goodsData.title}
							onChange={handleInputValue('newTitle')}
						/>
					)}
				</InfoArea>
				<InfoArea>
					<InfoText>상세 설명</InfoText>
					{goodsData.text && (
						<InfoTextArea
							defaultValue={goodsData.text}
							onChange={handleInputValue('newText')}
						/>
					)}
				</InfoArea>

				<ButtonArea>
					<Button onClick={handleSubmit} />
				</ButtonArea>
			</InputArea>
		</Content>
	</Container>
);

export default GoodsEditPresenter;
