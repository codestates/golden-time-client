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
			goodsImages: [],
		},
	};

	fileRef = React.createRef(null);

	async componentDidMount() {
		const goodsId = this.props.match.params.id;
		try {
			const response = await axios.get(
				`http://localhost:8088/goods/detail/${goodsId}`
			);

			const { id, title, text, price, goodsImages } = response.data;
			this.setState({
				...this.state,
				newTitle: title,
				newText: text,
				goodsData: { id, title, text, price, goodsImages },
			});
		} catch (err) {
			throw err;
		}
	}

	ImageUpLoadButtonClick() {
		console.log('dwad');
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
				'http://localhost:8088/goods/modified',
				formData,
				{
					withCredentials: true,
					headers: {
						Authorization: `bearer ${accessToken}`,
						'content-type': 'multipart/form-data',
					},
				}
			);
			this.props.history.push(`/goods/detail/${this.state.goodsData.id}`);
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
				handleSubmit={this.handleSubmit.bind(this)}
				handleInputValue={this.handleInputValue.bind(this)}
				removeGoodsImage={this.removeGoodsImage.bind(this)}
				handleImageChange={this.handleImageChange.bind(this)}
				ImageUpLoadButtonClick={this.ImageUpLoadButtonClick.bind(this)}
			/>
		);
	}
}

export default withRouter(GoodsEditContainer);
