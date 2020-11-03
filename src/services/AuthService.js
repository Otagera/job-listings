import axios from 'axios';

class AuthService {
	login(fd){
		return axios.post('/users/login', fd)
		    		.then(response=>{
		    			if(response.data.token){
		    				localStorage.setItem('user', JSON.stringify({ token: response.data.token }));
		    			}
		    			return { success: true };
		    		})
		    		.catch(err=>{
		    			return { error: true };
		    		});
	}
	logout(){
		localStorage.removeItem('user');
	}
	register(fd){
		return axios.post('/users/signup', fd)
    				.then(response=>{
    		 			return { success: true };
    				})
		    		.catch(err=>{
		    			return { error: true };
		    		});
    }
    getCurrentUser(){
    	return JSON.parse(localStorage.getItem('user'));
    }
    userAvailable(){
    	if(JSON.parse(localStorage.getItem('user'))){
    		return true;
    	}
    	return false;
    }
}

export default new AuthService();