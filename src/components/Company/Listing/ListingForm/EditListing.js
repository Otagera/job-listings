import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import InputGroup from '../../../UI/InputGroup/InputGroup';
import Aux from '../../../../hoc/Auxillary/Auxillary';
import Loader from '../../../UI/Loader/Loader';
import UserService from '../../../../services/UserService';

class EditListing extends Component {
	state = {
		listingToBeEdited: null,
		form: React.createRef(),
		submitted: false,
		error: false,
		selectedCompany: null
	}
	handleInputValue = (value, name)=>{
		let tempState = { ...this.state.listingToBeEdited };
		tempState[name] = value;
		this.setState({	listingToBeEdited: tempState });
		//alt
		//this.props.history.push('/listings');
	}
	handleSubmit = (e)=>{
		e.preventDefault();
		UserService.putListing(this.props.match.params.id, this.state.listingToBeEdited)
			        .then(response=>{
						this.setState({ submitted: true });
					}, error=>{
			            console.log('Error ' + error);
			            this.setState({ error: true });						
					});
	}

	componentDidMount(){//.then(response=>{}, error=>{});
		UserService.getListing(this.props.match.params.id)
					.then(response=>{
					 	let listing = response.data.listing;
					 	listing.company.img = UserService.updateImgURL(listing.company.img);
						this.setState({ listingToBeEdited: listing });
					}, error=>{
		                console.log('Error ' + error);
		                this.setState({ error: true });
					});
		UserService.getCompany(this.props.match.params.id)
					.then(response=>{
					 	let company = response.data.company;
					 	company.img = response.config.baseURL + '/' + company.img;
						this.setState({ selectedCompany: company });
					}, error=>{
		                console.log('Error ' + error);
		                this.setState({ error: true });
					});
	}

	render(){
		let displayForm = null;
		if(!this.state.listingToBeEdited){
			displayForm = <Loader />;
		}else if(this.state.error){
			displayForm = <p>Something went wrong</p>
		}else {
			let redirect = null;
			if(this.state.submitted){
				redirect = <Redirect to={`/listing/${this.props.match.params.id}`} />
			}
			let info = <Loader />;
			if(this.state.selectedCompany){
				info = (
					<Aux>
						<img src={(this.state.selectedCompany.img)? this.state.selectedCompany.img: null} alt="Logo" />
						<p>{this.state.selectedCompany.companyName}</p>
					</Aux>
					);
			}
			displayForm = (
				<form
					className='ListingForm'
					onSubmit={this.handleSubmit}
					ref={this.state.form}>
						{redirect}
					<div className='CompanyInfo'>
						{info}
					</div>
					<h1>Edit Job Listing</h1>
					<InputGroup
						classes='jobTitle'
						name='jobTitle'
						title='the Job Title'
						type='text'
						value={this.state.listingToBeEdited.jobTitle}
						handleInputValue={this.handleInputValue} />
					<InputGroup
						classes='jobSummary'
						name='jobSummary'
						title='the Summary of the Job'
						type='text'
						value={this.state.listingToBeEdited.jobSummary}
						handleInputValue={this.handleInputValue} />
					<InputGroup
						classes='typeOfEmployment'
						name='typeOfEmployment'
						title='the type of Employment'
						type='text'
						value={this.state.listingToBeEdited.typeOfEmployment}
						handleInputValue={this.handleInputValue} />
					<InputGroup
						classes='location'
						name='location'
						title='the Location'
						type='text'
						value={this.state.listingToBeEdited.location}
						handleInputValue={this.handleInputValue} />
					<InputGroup
						classes='role'
						name='role'
						title='the Role'
						type='text'
						value={this.state.listingToBeEdited.role}
						handleInputValue={this.handleInputValue} />
					<InputGroup
						classes='level'
						name='level'
						title='the Level'
						type='text'
						value={this.state.listingToBeEdited.level}
						handleInputValue={this.handleInputValue} />
					<InputGroup
						classes='lengthOfExp'
						name='lengthOfExp'
						title='the minumum length of experience'
						type='text'
						value={this.state.listingToBeEdited.lengthOfExp}
						handleInputValue={this.handleInputValue} />
					<InputGroup
						classes='salary'
						name='salary'
						title='the Salary Cap'
						type='text'
						value={this.state.listingToBeEdited.salary}
						handleInputValue={this.handleInputValue} />
					<div className='InputGroup FlexRow'>
						<button type='submit'>Submit</button>
					</div>
				</form>
			);
		}

		return (
			<Aux>
				{displayForm}
			</Aux>
		);
	}
}
export default withRouter(EditListing);