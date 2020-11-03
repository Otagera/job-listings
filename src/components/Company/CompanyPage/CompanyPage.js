import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Aux from '../../../hoc/Auxillary/Auxillary';
import ListingsPage from '../Listing/ListingsPage/ListingsPage';
import UserService from '../../../services/UserService';
import AuthService from '../../../services/AuthService';

class ListingPage extends Component {

	state = {
		selectedCompany: null,
		error: false
	};

	componentDidMount(){
		UserService.getCompany(this.props.match.params.id)
					.then(response=>{
					 	let company = response.data.company;
					 	company.img = UserService.updateImgURL(company.img);
						this.setState({ selectedCompany: company });
					}, error=>{
		                console.log('Error ' + error);
		                this.setState({ error: true });
					});
	}

	render(){
		let displayDetails = null;
		if(!this.state.selectedCompany){
			displayDetails = <div className='loader'></div>;
		}else {
			displayDetails = (
						<Aux>
							<img src={this.state.selectedCompany.img} alt="Logo" />
							<p className='CompanyTopOne'>{this.state.selectedCompany.companyName}</p>
							<p className='CompanyTopTwo'>
								{this.state.selectedCompany.industry}
							</p>
							{
								AuthService.userAvailable()? 
									<Aux>
										<Link 
											to={`/company/edit/${this.props.match.params.id}`}
											className='CompanyTopThree'>
												Edit Company Details
										</Link>					
										<Link 
											to={`/listings/new/${this.state.selectedCompany.fakeId}`}
											className='CompanyTopFour'>
												Add New Listing
										</Link>
									</Aux>:
								null
							}		
							<div className='CompanyMid'>
								<p>{this.state.selectedCompany.companyDescription}</p>
							</div>
							<div className='CompanyBottom'>
								<ListingsPage companyId={this.props.match.params.id}/>
							</div>
						</Aux>);
		}
		if(this.state.error){
			displayDetails = <p>Something went wrong</p>
		}
		return (
			<div className='CompanyDetailed'>
				{displayDetails}
			</div>
		);
	}
}
export default withRouter(ListingPage);