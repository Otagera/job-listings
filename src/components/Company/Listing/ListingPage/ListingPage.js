import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import PillTags from '../../../UI/Tags/PillTags/PillTags';
import Aux from '../../../../hoc/Auxillary/Auxillary';
import UserService from '../../../../services/UserService';
import AuthService from '../../../../services/AuthService';

class ListingPage extends Component {

	state = {
		selectedListing: null,
		listingId: 0,
		error: false
	};

	static getDerivedStateFromProps = (props, state)=>{
		if(props.listingId && props.listingId !== state.listingId){
			return {
				listingId: props.listingId
			}
		}else {
			return null;
		}
	}

	componentDidMount(){
		UserService.getListing(this.props.match.params.id)
					.then(response=>{
					 	let listing = response.data.listing;
					 	listing.company.img = UserService.updateImgURL(listing.company.img);
						this.setState({ selectedListing: listing });
					}, error=>{
		                console.log('Error ' + error);
		                this.setState({ error: true });
					});
	}

	render(){
		let displayDetails = null;
		if(!this.state.selectedListing){
			displayDetails = <div className='loader'></div>;
		}else {
			let pills = [];
			if(this.state.selectedListing.isThereNew){
				pills.push({ label: 'New!' });
			}
			if(this.state.selectedListing.isFeatured){
				pills.push({ label: 'Featured' });
			}
			let tags = [
				{label: this.state.selectedListing.role}, 
				{label: this.state.selectedListing.level}
			];
			if(this.state.selectedListing.languages){
				this.state.selectedListing.languages.forEach((lang)=>{
					tags.push({
						label: lang
					});
				});		
			}
			if(this.state.selectedListing.tools){
				this.state.selectedListing.tools.forEach((tool)=>{
					tags.push({
						label: tool
					});
				});
			}
			let langs = this.state.selectedListing.languages.map((lang)=>{
				return(<li key={lang}>{lang}</li>);
			});
			let tools = this.state.selectedListing.tools.map((tool)=>{
				return(<li key={tool}>{tool}</li>);
			});
			displayDetails = (
						<Aux>
							<img src={this.state.selectedListing.company.img} alt="Logo" />
							<div className='FlexRow ListingTop'>
								<Link to={`/company/${this.state.selectedListing.company.fakeId}`}>
									<p>{this.state.selectedListing.company.companyName}</p>
								</Link>
								<PillTags pills={pills}/>
								{
									AuthService.userAvailable()? 
										<Link to={`/listing/edit/${this.props.match.params.id}`}>
											Edit
										</Link>:
									null
								}
							</div>
							<div className='FlexRow ListingMid'>
								<p className='ListingMidLeft'>
									{this.state.selectedListing.jobTitle}
								</p>
								<div className='FlexRow ListingMidRight'>
									<p>{this.state.selectedListing.howOld}</p>
									<p className='Dot'>&middot;</p>
									<p>{this.state.selectedListing.typeOfEmployment}</p>
									<p className='Dot'>&middot;</p>
									<p>{this.state.selectedListing.location}</p>
								</div>
							</div>
							<div className='ListingBottom'>
								<h3>Job Summary</h3>
								<p>
									{this.state.selectedListing.jobSummary}
								</p>
								<p>Experience Level: <span>{this.state.selectedListing.level}</span> level</p>
								<p>Length of Experience: <span>{this.state.selectedListing.lengthOfExp}</span> </p>
								<h3>Job Discription</h3>
								<ul>
									<li>
										Should be well vased in this languages: 
										<ul>{langs}</ul>
									</li>
									<li>
										Should be able to use the following tools or frameworks:
										<ul>{tools}</ul>
									</li>
								</ul>
								<p>Salary: &#8358;<span>{this.state.selectedListing.salary}</span></p>
							</div>
						</Aux>);
		}
		if(this.state.error){
			displayDetails = <p>Something went wrong</p>
		}
		return (
			<div className='ListingDetailed'>
				{displayDetails}
			</div>
		);
	}
}
export default withRouter(ListingPage);