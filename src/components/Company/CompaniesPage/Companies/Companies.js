import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Loader from '../../../UI/Loader/Loader';
import Company from './Company/Company';
import UserService from '../../../../services/UserService';


class Companies extends Component{
	state = {
		error: false,
		redirect: false
	}
    handleDeleteCompany = (tempFakeId)=>{
        UserService.deleteCompany(tempFakeId)
                    .then(response=>{
                        this.setState({ redirect: true });
                    }, error=>{
                        console.log('Error ' + error);
                        this.setState({ error: true });
                    });
    }
    render(){
		let companies = this.props.availableCompanies.map((company)=>{
			return (<Company
						company={company}
						key={company.fakeId}
						deleteCompanyClicked={()=> this.handleDeleteCompany(company.fakeId)} />
				);
		});
		let redirect = null;
		if(this.props.error){
			companies = <p>Something went wrong</p>
		}
		if(this.props.availableCompanies.length < 0){
			companies = <Loader />;
		}
		if(this.state.redirect){
			redirect = <Redirect to='/companies' />;
		}
		return (
			<div className='Companies'>
				{redirect}
				{companies}
			</div>
		);
    }
}
export default Companies;