import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import FormValidation from '../../services/FormValidation.js';
import InputGroup from '../UI/InputGroup/InputGroup';
import AuthService from '../../services/AuthService.js';
import Modal from '../UI/Modal/Modal';

class Register extends Component {
    state = {
    	formData: {
    		email: {
    			elementType: 'input',
    			elementConfig: {
    				type: 'email',
    				placeholder: 'Your Email'
    			},
    			elementTitle: 'Email',
    			elementName: 'email',
    			value: '',
    			validation: {
    				required: true,
    				email: true
    			},
    			valid: false,
    			touched: false
    		},
    		password: {
    			elementType: 'input',
    			elementConfig: {
    				type: 'password',
    				placeholder: 'Your Password'
    			},
    			elementTitle: 'Password',
    			elementName: 'password',
    			passwordRevealed: false,
    			passwordType: true,
    			value: '',
    			validation: {
    				required: true,
                    minLength: 6
    			},
    			valid: false,
    			touched: false
    		},
    		confirmPassword: {
    			elementType: 'input',
    			elementConfig: {
    				type: 'password',
    				placeholder: 'Confirm Password'
    			},
    			elementTitle: 'Confirm Password',
    			elementName: 'confirmPassword',
    			passwordRevealed: false,
    			passwordType: true,
    			value: '',
    			validation: {
    				required: true,
    				confirmPassword: true
    			},
    			valid: false,
    			touched: false
    		}
    	},
		img: React.createRef(),
		imgDisplay: null,
		form: React.createRef(),
		submitted: false,
		error: false,
    	formIsValid: false,
        showSuccessInfo: false
    }
    handleShowPassword = (name)=>{
		let formData = { ...this.state.formData };
		if(formData[name].passwordRevealed){
    		formData[name].elementConfig.type = 'password';
		}else{
    		formData[name].elementConfig.type = 'text';
		}
    	formData[name].passwordRevealed = !formData[name].passwordRevealed;
    	
    	this.setState({	formData: formData });
    }
    handleInputValue = (value, name)=>{
		let formData = { ...this.state.formData };
		formData[name].value = value;
    	formData[name].valid = FormValidation.checkValidity(formData[name].value, formData[name].validation, formData.password.value);
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
    	//console.log(AuthService.register(fd));
    	AuthService.register(fd).then(response=>{
    		//console.log(response)
            this.setState({ showSuccessInfo: true });
    	}, error=>{
    		//console.log(error);
    	 	this.setState({ error: true });
    	});
    }
    removeModal = ()=>{
        this.setState({
            showSuccessInfo: false,
            submitted: true
        });
    }

	render(){
		let redirect = null;
		const formElementArray = [];
		for(let key in this.state.formData) {
			formElementArray.push({
				id: key,
				config: this.state.formData[key]
			});
		}

		if(this.state.submitted){
			redirect = <Redirect to='/login' />;
		}

		return (
			<form onSubmit={this.handleSubmit} ref={this.state.form} className='RegisterForm'>
				<h1>Create New User</h1>
				{redirect}
				{
					formElementArray.map(formElement=>(
						<InputGroup
							key={formElement.id}
							classes={formElement.config.elementName}
							name={formElement.config.elementName}
							title={formElement.config.elementTitle}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							passwordRevealed={formElement.config.passwordRevealed}
							passwordType={formElement.config.passwordType}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							handleInputValue={this.handleInputValue}
							handleShowPassword={this.handleShowPassword} />
						)
					)
				}                
                <Modal
                    show={this.state.showSuccessInfo}
                    modalClosed={this.removeModal}
                    successfull={true}>
                    <div>
                        <p>Regististration Successful</p>
                        <button onClick={this.removeModal}>Continue</button>
                    </div>
                </Modal>
				<div className='InputGroup FlexRow'>
					<button type='submit' disabled={!this.state.formIsValid}>Register</button>
				</div>
			</form>
		);
	}
}
export default Register;