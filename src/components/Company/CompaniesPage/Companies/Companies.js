import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

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
                    	//console.log(response);
                        this.setState({ redirect: true });
                    }, error=>{
                        console.log('Error ' + error);
                        this.setState({ error: true });
                    });
    }
    render(){
		let redirect = null;
		let companies = <Loader />;

		if(this.props.availableCompanies.length > 0){
			companies = this.props.availableCompanies.map((company)=>{
				return (<Company
							company={company}
							key={company.fakeId}
							deleteCompanyClicked={()=> this.handleDeleteCompany(company.fakeId)} />
					);
			});
		}else {
			companies = <p>No Companies Please Add a New Company!</p>;
		}
		if(this.props.error || this.state.error){
			companies = <p>Something went wrong</p>
		}
		if(this.state.redirect){
			//this.props.history.go(0);
			redirect = <Redirect to='/deleteCompany' />;
		}
		return (
			<div className='Companies'>
				{redirect}
				{companies}
			</div>
		);
    }
}
export default withRouter(Companies);