import React, { Component } from 'react';
import Login from './Login';

class Navi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false,
		};
	}

	openModal = () => {
		this.setState({ isModalOpen: true });
	};

	closeModal = () => {
		this.setState({ isModalOpen: false });
	};

	render() {
		return (
			<>
				<button onClick={this.openModal.bind(this)}>Login</button>
				<Login
					isOpen={this.state.isModalOpen}
					close={this.closeModal.bind(this)}
					openModal={this.openModal.bind(this)}
				/>
			</>
		);
	}
}

export default Navi;
