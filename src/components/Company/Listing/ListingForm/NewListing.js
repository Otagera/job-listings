import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import InputGroup from '../../../UI/InputGroup/InputGroup';
import Loader from '../../../UI/Loader/Loader';
import Aux from '../../../../hoc/Auxillary/Auxillary';
import FormValidation from '../../../../services/FormValidation';
import UserService from '../../../../services/UserService';

class NewListing extends Component {
	state = {
		formData: {
			jobTitle: 	{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'The Job Title'
				},
				value: '',
				elementTitle: 'The Job Title',
				elementName: 'jobTitle',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			jobSummary:	{
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'The Job Summary'
				},
				value: '',
				elementTitle: 'The Summary of the Job',
				elementName: 'jobSummary',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			typeOfEmployment: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'The type of employment'
				},
				value: '',
				elementTitle: 'The Type of Employment',
				elementName: 'typeOfEmployment',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			location: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'The location'
				},
				value: '',
				elementTitle: 'The Location',
				elementName: 'location',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			role: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'The role'
				},
				value: '',
				elementTitle: 'The Role',
				elementName: 'role',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			level: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'The level'
				},
				value: '',
				elementTitle: 'The Level',
				elementName: 'level',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			lengthOfExp: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'The minimum length of experience'
				},
				value: '',
				elementTitle: 'The Minumum Length of Experience',
				elementName: 'lengthOfExp',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			salary:	{
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeholder: 'The salary'
				},
				value: '',
				elementTitle: 'The Salary Cap',
				elementName: 'salary',
				validation: {
					required: true
				},
				valid: false,
				touched: false	
		    }
		},
		languages: '',
		tools: '',
		form: React.createRef(),
    	formIsValid: false,
		submitted: false,
		error: false,
		selectedCompany: null
	}

	handleInputValue = (value, name)=>{
		let formData = { ...this.state.formData };
		formData[name].value = value;
    	formData[name].valid = FormValidation.checkValidity(formData[name].value, formData[name].validation)
    	formData[name].touched = true;

    	let formIsValid = true;
    	for(let inputIdentifiers in formData){
    		formIsValid = formData[inputIdentifiers].valid  && formIsValid;
    	}
    	
		this.setState({	formData: formData, formIsValid: formIsValid });
	}
	handleSubmit = (e)=>{
		e.preventDefault();
		let fd = new FormData(this.state.form.current);
		fd.append('companyFakeId', this.props.match.params.id);
		
		UserService.postListing(fd)
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
						this.setState({ selectedCompany: company });
					}, error=>{
		                console.log('Error ' + error);
		                this.setState({ error: true });
					});
	}

	render(){
		let redirect = null;
		if(this.state.submitted){
			redirect = <Redirect to='/listings' />
		}

		const formElementsArray = [];
		for(let key in this.state.formData) {
			formElementsArray.push({
				id: key,
				config: this.state.formData[key]
			});
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
		return (
			<form
				className='ListingForm'
				onSubmit={this.handleSubmit}
				ref={this.state.form}>
					{redirect}
				<div className='CompanyInfo'>
					{info}
				</div>
				<h1>Create New Listing</h1>
				{
					formElementsArray.map(formElement => (
						<InputGroup
							key={formElement.id}
							classes={formElement.config.elementName}
							name={formElement.config.elementName}
							title={formElement.config.elementTitle}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							handleInputValue={this.handleInputValue} />
						)
					)
				}
				<div className='InputGroup FlexRow'>
					<button type='submit' disabled={!this.state.formIsValid}>Submit</button>
				</div>
			</form>
		);
	}
}
export default withRouter(NewListing);