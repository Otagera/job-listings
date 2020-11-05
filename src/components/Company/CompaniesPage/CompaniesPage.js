import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Aux from '../../../hoc/Auxillary/Auxillary';
import Search from './Search/Search';
import Companies from './Companies/Companies';
import Loader from '../../UI/Loader/Loader';
import UserService from '../../../services/UserService';

class CompaniesPage extends Component{
	state = {
        companies: [],
    	error: false,
        empty: false
    }

    getCompanies = ()=>{
        UserService.getCompanies()
                    .then(response=>{
                       let companies = response.data.companies;
                        companies.forEach((company)=>{
                            company.img = UserService.updateImgURL(company.img);
                        });
                        let empty = (companies.length <= 0)? true: false;

                        this.setState({
                            companies: companies,
                            error: false,
                            empty: empty
                        });
                    }, error=>{
                        console.log('Error ' + error);
                        this.setState({ error: true });
                    });
    }

    componentDidMount(){
        this.getCompanies();
    }
	render(){
        let whatToDisplayCompany = <Loader />;
        if(this.state.companies.length > 0){
            whatToDisplayCompany = (
                <Companies
                    error={this.state.error}
                    availableCompanies={this.state.companies} />
                );
        }
		return (
			<Aux>			
				<Search
					clearClicked={this.props.clearClicked} />
				{whatToDisplayCompany}
			</Aux>
		);
	}
}
export default withRouter(CompaniesPage);