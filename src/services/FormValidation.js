export default class FormValidation {
	static checkValidity(value, rules, passwordValue){
    	if(rules){
    		let isValid = true;

	    	if(rules.required){
	    		isValid = value.trim() !== '' && isValid;
	    	}
	    	if(rules.minLength) {
	    		isValid = value.length >= rules.minLength && isValid;
	    	}
	    	if(rules.maxLength) {
	    		isValid = value.length <= rules.maxLength && isValid;
	    	}
	    	if(rules.email){
	    		let pattern = RegExp(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/i);
	    		isValid = pattern.test(value) && isValid;
	    	}
	    	if(rules.confirmPassword){
	    		isValid = (value === passwordValue) && isValid;
	    	}

    		return isValid;
    	}
    	return false;
    }
}