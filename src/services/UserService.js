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
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		};
		return axios({
		        	method: 'put',
		        	url: `/listing/${fakeId}`,
		        	data: qs.stringify(listingData),
		        	headers: headersObj
		        });
	}
	deleteListing(fakeId){
		return axios.delete(`listing/${fakeId}`, { headers: AuthHeader() });
	}
	getCompanies(){
		return axios.get('/companies');
	}
	getCompany(fakeId){
		return axios.get(`/company/${fakeId}`);
	}
	postCompany(fd){
		return axios.post('/companies', fd, { headers: AuthHeader() });
	}
	putCompany(fakeId, companyData){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		};
		return axios({
        	method: 'put',
        	url: `/company/${fakeId}`,
        	data: qs.stringify(companyData),
        	headers: headersObj
        })
	}
	deleteCompany(fakeId){
		return axios.delete(`/company/${fakeId}`, { headers: AuthHeader() });
	}
	updateImgURL(img){
		if(axios.defaults.baseURL === 'http://127.0.0.1:3001/api'){
			return axios.defaults.baseURL + '/' + img;
		}
		return img;
	}
}
export default new UserService();