import axios from 'axios';
import qs from 'qs';
import AuthHeader from './AuthHeader';

class UserService {
	getListings(companyId){
        return axios.get(`/listings/${companyId}`);
	}
	getListing(fakeId){
		return axios.get(`/listing/${fakeId}`);
	}
	postListing(fd){
		return axios.post('/listings', fd, { headers: AuthHeader() });
	}
	putListing(fakeId, listingData){
		return axios({
		        	method: 'put',
		        	url: `/listing/${fakeId}`,
		        	data: qs.stringify(listingData),
		        	headers: {
		        		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		        		headers: AuthHeader()
		        	}
		        });
	}
	deleteListing(fakeId){
		return axios.delete(`listing/${fakeId}`, { headers: AuthHeader() });
	}
	getCompanies(){
		return axios.get('/companies');
	}
	getCompanyListings(){

	}
	getCompany(fakeId){
		return axios.get(`/company/${fakeId}`);
	}
	postCompany(fd){
		return axios.post('/companies', fd);
	}
	putCompany(fakeId, companyData){
		return axios({
        	method: 'put',
        	url: `/company/${fakeId}`,
        	data: qs.stringify(companyData),
        	headers: {
        		'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        	}
        })
	}
	deleteCompany(fakeId){
		return axios.delete(`/company/${fakeId}`);
	}
	updateImgURL(img){
		if(axios.defaults.baseURL === 'http://127.0.0.1:3001/api'){
			return axios.defaults.baseURL + '/' + img;
		}
	}
}
export default new UserService();