import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import InputGroup from '../../UI/InputGroup/InputGroup';
import FormValidation from '../../../services/FormValidation';
import UserService from '../../../services/UserService';

class NewListing extends Component {
	state = {
		formData: {
	    	companyName: {
	    		elementType: 'input',
	    		elementConfig: {
	    			type: 'text',
	    			placeholder: 'Your Company Name'
	    		},
				elementTitle: 'Company Name',
				elementName: 'companyName',
	    		value: '',
	    		validation: {
	    			required: true
	    		},
	    		valid: false,
	    		touched: false			
			},
			companyDescription:	{
				elementType: 'textarea',
				elementConfig: {
					type: 'text',
					placeholder: 'The Company Description'
				},
				value: '',
				elementTitle: 'Company Description',
				elementName: 'companyDescription',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
			industry:	{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'The Industry'
				},
				value: '',
				elementTitle: 'Industry',
				elementName: 'industry',
				validation: {
					required: true
				},
				valid: false,
				touched: false			
			},
		},
		img: React.createRef(),
		imgDisplay: null,
		form: React.createRef(),
		submitted: false,
		error: false,
    	formIsValid: false
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

		UserService.postCompany(fd)
					.then(response=>{
						//console.log(response);
						this.setState({ submitted: true });
					 }, error=>{
		                console.log('Error ' + error);
		                this.setState({ error: true });
		             });
	}
	test=()=>{
		this.setState(prevState=>{
			return {
				imgDisplay: URL.createObjectURL(this.state.img.current.files[0])
			}
		});		
	}
	render(){
		let redirect = null;
		const formElementsArray = [];
		for(let key in this.state.formData) {
			formElementsArray.push({
				id: key,
				config: this.state.formData[key]
			});
		}
		
		if(this.state.submitted){
			redirect = <Redirect to='/companies' />
		}

		let img = null;
		if(this.state.imgDisplay){
			img = <img
				src={this.state.imgDisplay} alt="Logo" />
		}
		return (
			<div className='CompanyForm'>
				{img}
				<h1>Create New Listing</h1>
				<form
					onSubmit={this.handleSubmit}
					ref={this.state.form}>
					{redirect}
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
						<label>Please select the image of your company</label>
						<input
							type="file"
							ref={this.state.img}
							className='img'
							name='img' onChange={this.test}/>						
					</div>
					<div className='InputGroup FlexRow'>
						<button type='submit' disabled={!this.state.formIsValid}>Submit</button>
					</div>
				</form>
			</div>
		);
	}
}
export default NewListing;