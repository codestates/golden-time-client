import React, { Component } from 'react';
import GoodsEditPresenter from './GoodsEditPresenter';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class GoodsEditContainer extends Component {
	state = {
		newTitle: null,
		newText: null,
		files: [],
		imagesPreviewUrls: [],
		goodsData: {
			id: '',
			title: '',
			text: '',
			price: '',
			images: [],
		},
	};

	fileRef = React.createRef();

	async componentDidMount() {
		const goodsId = this.props.match.params.id;
		try {
			const response = await axios.get(
				`http://localhost:8080/goods/detail/${goodsId}`
			);

			const { id, title, text, price, images } = response.data;

			this.setState({
				...this.state,
				goodsData: { id, title, text, price, images },
			});
		} catch (err) {
			throw err;
		}
	}

	ImageUpLoadButtonClick(e) {
		e.preventDefault();
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

	handleInputValue = key => e => {
		this.setState({ [key]: e.target.value });
	};

	async handleSubmit() {
		const { files, newTitle, newText } = this.state;

		const accessToken = localStorage.getItem('accessToken');
		const formData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('img', files[i], files[i].name);
		}
		formData.append('title', newTitle);
		formData.append('text', newText);
		formData.append('goodsId', this.state.goodsData.id);

		try {
			const response = await axios.patch(
				'http://localhost:8080/goods/modified',
				formData,
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${accessToken}`,
						'content-type': 'multipart/form-data',
					},
				}
			);
			this.props.history.push(response.data.redirect_url);
		} catch (err) {
			throw err;
		}
	}

	render() {
		return (
			<GoodsEditPresenter
				fileRef={this.fileRef}
				goodsData={this.state.goodsData}
				imagesPreviewUrls={this.state.imagesPreviewUrls}
				handleInputValue={this.handleInputValue.bind(this)}
				ImageUpLoadButtonClick={this.ImageUpLoadButtonClick.bind(this)}
				handleImageChange={this.handleImageChange.bind(this)}
				removeGoodsImage={this.removeGoodsImage.bind(this)}
				handleSubmit={this.handleSubmit.bind(this)}
			/>
		);
	}
}

export default withRouter(GoodsEditContainer);
