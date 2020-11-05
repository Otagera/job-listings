import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../../../../UI/Modal/Modal';
import AuthService from '../../../../../services/AuthService';

class Company extends Component{
	state = {
		showDeleteDialog: false
	}
	showModal = ()=>{
		this.setState({ showDeleteDialog: true });
	}
	removeModal = ()=>{
		this.setState({ showDeleteDialog: false });
	}
	confirmDelete = ()=>{
		this.removeModal();
		this.props.deleteCompanyClicked();
	}
	render(){
		return (
			<div className='Company'>
				<img src={this.props.company.img} alt="Logo" />
				<div className='FlexRow CompanyLeftTop'>
					<Link to={`/company/${this.props.company.fakeId}`}>
						<p> {this.props.company.companyName} </p>
					</Link>
				</div>
				<div className='FlexRow CompanyLeftBottom'>
					<p>{this.props.company.industry}</p>
				</div>
				<div className='FlexRow CompanyMid'>
					<p>{this.props.company.companyDescription}</p>
				</div>
				<div className='FlexRow CompanyRight'>
					<Modal
						show={this.state.showDeleteDialog}
						modalClosed={this.removeModal}
						successfull={true}>
						<div>
							<p>Are You sure you want to delete?</p>
							<button onClick={this.removeModal}>Cancel</button>
							<button onClick={this.confirmDelete}>Confirm</button>
						</div>
					</Modal>
					{AuthService.userAvailable()? <p onClick={this.showModal}>Delete</p>: null}
				</div>
			</div>
		);
	}
}
export default Company;