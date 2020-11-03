import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class InputGroup extends Component{
	state = {
		[this.props.name]: this.props.value
	}

	handleChange = (event)=> {
		let type = 'value';
		if(event.target.type === 'checkbox'){
			type = 'checkbox';
		} else if(event.target.type === 'file'){
			type = 'files';
		}
		
		const value = event.target[type];
		const name = event.target.name;
		this.setState({
			[name]: value
		});
		this.props.handleInputValue(value, this.props.name);
	}

	reset = ()=>{
		this.setState({ inputValue: '' });
	}

	render(){
		let inputElement = null;
		let inputClasses = [];

		if(this.props.invalid && this.props.shouldValidate && this.props.touched){
			inputClasses.push('Invalid');
		}
		switch (this.props.elementType) {
			case ('input'):
				inputElement = <input
									className={inputClasses.join(' ')}
									{...this.props.elementConfig}
									value={this.state[this.props.name]}
									onChange={this.handleChange}
									name={this.props.name} />;
				break;
			case ('textarea'):
				inputElement = <textarea
									className={inputClasses.join(' ')}
									{...this.props.elementConfig}
									value={this.state[this.props.name]}
									onChange={this.handleChange}
									name={this.props.name}
									cols={27}
									rows={40} />;
				break;
			case ('select'):
				inputElement = <select
									className={inputClasses.join(' ')}
									value={this.state[this.props.name]}
									onChange={this.handleChange}
									name={this.props.name} >
									{
										this.props.elementConfig.options.map(option=>(
											<option key={option.value} value={option.value}>{option.displayValue}</option>
										))
									}
								</select>
				break;
			case ('file'):
				inputElement = <input
									type="file"
									ref={this.props.ref}
									className={inputClasses.join(' ')}
									name={this.props.name}
									onChange={this.handleChange} />
				break;
			default:
				inputElement = <input
									className={inputClasses.join(' ')}
									{...this.props.elementConfig}
									value={this.state[this.props.name]}
									onChange={this.handleChange}
									name={this.props.name} />;
				break;
		}
		let icon = null;
		if(this.props.passwordType){
			icon = <span onClick={this.props.handleShowPassword.bind(this, this.props.name)}>
						<span className='IconSpan'>
							<FontAwesomeIcon
								icon={(this.props.passwordRevealed)? faEye: faEyeSlash}
								className='EyeIcon'/>
						</span>
					</span>
		}
		return(
			<div className={`FlexRow InputGroup`}>
				<label>{this.props.title}</label>
				{inputElement}
				{icon}
				{/* <button>Add</button> */}
			</div>
		);
	}
}

export default InputGroup