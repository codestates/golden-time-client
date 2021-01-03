import React, { Component } from 'react';
import GoodsPostPresenter from './GoodsPostPresenter';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class GoodsPostContainer extends Component {
	now = new Date();
	state = {
		files: [],
		imagesPreviewUrls: [],
		title: '',
		text: '',
		price: '',
		closing_time: new Date(this.now.setDate(this.now.getDate() + 1)),
		categoryId: '',
		errorMessage: '',
	};

	fileRef = React.createRef(null);

	ImageUpLoadButtonClick(e) {
		this.fileRef.current.click();
	}

	handleImageChange(e) {
		e.preventDefault();
		let files = Array.from(e.target.files);
		files.forEach(file => {
			let reader = new FileReader();
			reader.onloadend = () => {
				this.setState(prevState => ({
					files: [...prevState.files, file],
					imagesPreviewUrls: [
						...prevState.imagesPreviewUrls,
						{ url: reader.result, name: file.name },
					],
				}));
			};
			reader.readAsDataURL(file);
		});
		e.target.value = null;
	}

	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	handleSelectChange(e) {
		this.setState({ ...this.state, categoryId: e.target.value });
	}

	removeGoodsImage(name) {
		const filterdPreviewUrls = this.state.imagesPreviewUrls.filter(
			el => el.name !== name
		);
		const filterdFiles = this.state.files.filter(el => el.name !== name);
		this.setState({
			...this.state,
			files: filterdFiles,
			imagesPreviewUrls: filterdPreviewUrls,
		});
	}

	handleDateChange(closing_time) {
		this.setState({ ...this.state, closing_time });
	}

	async handleSubmit(e) {
		e.preventDefault();
		const { files, title, text, price, categoryId, closing_time } = this.state;

		if (!files.length) {
			this.setState({
				...this.state,
				errorMessage: '상품 이미지를 등록해주세요.',
			});
		} else if (!title.length) {
			this.setState({ ...this.state, errorMessage: '상품명을 입력해주세요.' });
		} else if (!price.length) {
			this.setState({
				...this.state,
				errorMessage: '경매 시작가를 입력해주세요.',
			});
		} else if (!text.length) {
			this.setState({
				...this.state,
				errorMessage: '상세 설명을 입력해주세요.',
			});
		} else if (categoryId === '0' || !categoryId.length) {
			this.setState({
				...this.state,
				errorMessage: '카테고리를 선택해주세요.',
			});
		} else {
			const accessToken = localStorage.getItem('accessToken');
			const formData = new FormData();
			for (let i = 0; i < files.length; i++) {
				formData.append('img', files[i], files[i].name);
			}
			formData.append('title', title);
			formData.append('text', text);
			formData.append('price', price);
			formData.append('closing_time', closing_time);
			formData.append('categoryId', categoryId);

			try {
				const result = await axios.post(
					'http://localhost:8088/goods/addgoods',
					formData,
					{
						withCredentials: true,
						headers: {
							Authorization: `bearer ${accessToken}`,
							'content-type': 'multipart/form-data',
						},
					}
				);
				this.props.history.push(result.data.redirect_url);
			} catch (err) {
				throw err;
			}
		}
	}

	render() {
		return (
			<GoodsPostPresenter
				fileRef={this.fileRef}
				errorMessage={this.state.errorMessage}
				closing_time={this.state.closing_time}
				imagesPreviewUrls={this.state.imagesPreviewUrls}
				handleSubmit={this.handleSubmit.bind(this)}
				handleInputValue={this.handleInputValue.bind(this)}
				removeGoodsImage={this.removeGoodsImage.bind(this)}
				handleDateChange={this.handleDateChange.bind(this)}
				handleImageChange={this.handleImageChange.bind(this)}
				handleSelectChange={this.handleSelectChange.bind(this)}
				ImageUpLoadButtonClick={this.ImageUpLoadButtonClick.bind(this)}
			/>
		);
	}
}

export default withRouter(GoodsPostContainer);
