import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import InputGroup from '../../UI/InputGroup/InputGroup';
import Aux from '../../../hoc/Auxillary/Auxillary';
import UserService from '../../../services/UserService';

class EditCompany extends Component {
	state = {
		companyToBeEdited: null,
		img: React.createRef(),
		form: React.createRef(),
		submitted: false,
		error: false
	}
	handleInputValue = (value, name)=>{
		let tempState = { ...this.state.companyToBeEdited };
		tempState[name] = value;
		this.setState({	companyToBeEdited: tempState });
		//alt
		//this.props.history.push('/listings');
	}
	handleSubmit = (e)=>{
		e.preventDefault();
		UserService.putCompany(this.props.match.params.id, this.state.companyToBeEdited)
					.then(response=>{
						this.setState({ submitted: true });
					}, error=>{
			            console.log('Error ' + error);
			            this.setState({ error: true });
					});
	}

	componentDidMount(){
		UserService.getCompany(this.props.match.params.id)
					.then(response=>{
					 	let company = response.data.company;
					 	company.img = UserService.updateImgURL(company.img);
						this.setState({ companyToBeEdited: company });
					}, error=>{
		                console.log('Error ' + error);
		                this.setState({ error: true });
					});
	}

	render(){
		let displayForm = null;
		if(!this.state.companyToBeEdited){
			displayForm = <div className='loader'></div>;
		}else if(this.state.error){
			displayForm = <p>Something went wrong</p>
		}else {
			let redirect = null;
			if(this.state.submitted){
				redirect = <Redirect to={`/company/${this.props.match.params.id}`} />
			}

			let img = null;
			if(this.state.companyToBeEdited.img){
				img = <img className='EditImg' src={this.state.companyToBeEdited.img} alt="Logo" />;
			}
			displayForm = (
				<div className='CompanyForm'>
					{img}
					<h1>Edit Job Listing</h1>
					<form
						className='ListingForm'
						onSubmit={this.handleSubmit}
						ref={this.state.form}>
						{redirect}
						<InputGroup
							classes='companyName'
							name='companyName'
							title='Company Name'
							type='text'
							value={this.state.companyToBeEdited.companyName}
							handleInputValue={this.handleInputValue} />
						<InputGroup
							classes='companyDescription'
							name='companyDescription'
							title='Company Description'
							type='text'
							value={this.state.companyToBeEdited.companyDescription}
							handleInputValue={this.handleInputValue} />
						<InputGroup
							classes='industry'
							name='industry'
							title='Industry'
							type='text'
							value={this.state.companyToBeEdited.industry}
							handleInputValue={this.handleInputValue} />
						{/*<div className='InputGroup FlexRow'>
							<label>Please select the image of your company</label>
							<input
								type="file"
								ref={this.state.img}
								className='img'
								name='img' />						
						</div>*/}
						<div className='InputGroup FlexRow'>
							<button type='submit'>Submit</button>
						</div>
					</form>
				</div>
			);
		}
		return (
			<Aux>
				{displayForm}
			</Aux>
		);
	}
}
export default withRouter(EditCompany);