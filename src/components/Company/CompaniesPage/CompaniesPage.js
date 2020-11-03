import React, { Component } from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import Search from './Search/Search';
import Companies from './Companies/Companies';
import Loader from '../../UI/Loader/Loader';
import UserService from '../../../services/UserService';

class CompaniesPage extends Component{
	state = {
        companies: [],
    	error: false
    }

    getCompanies = ()=>{
        UserService.getCompanies()
                    .then(response=>{
                       let companies = response.data.companies;
                       UserService.updateImgURL();
                        companies.forEach((company)=>{
                            company.img = UserService.updateImgURL(company.img);
                        });

                       this.setState({ companies: companies, error: false });
                    }, error=>{
                        console.log('Error ' + error);
                        this.setState({ error: true });
                    });
    }

    componentDidMount(){
        this.getCompanies();
    }
	render(){
        let whatToDisplayListing = <Loader />;
        if(this.state.companies.length > 0){
            whatToDisplayListing = (
                <Companies
                    error={this.props.error}
                    availableCompanies={this.state.companies}
                    tagClicked={this.props.tagClicked} />
                );
        }
		return (
			<Aux>			
				<Search
					clearClicked={this.props.clearClicked} />
				{whatToDisplayListing}
			</Aux>
		);
	}
}
export default CompaniesPage;