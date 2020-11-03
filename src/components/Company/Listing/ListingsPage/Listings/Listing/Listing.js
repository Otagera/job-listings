import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PillTags from '../../../../../UI/Tags/PillTags/PillTags';
import RectangleTags from '../../../../../UI/Tags/RectangleTags/RectangleTags';
import Modal from '../../../../../UI/Modal/Modal';
import AuthService from '../../../../../../services/AuthService';


class Listing extends Component{
	state = {
		showDeleteDialog: false
	}

	showModal = ()=>{
		this.setState({ showDeleteDialog: true });
	}
	removeModal = ()=>{
		this.setState({ showDeleteDialog: false });
	}
	confirmDelete = ()=>{
		this.removeModal();
		this.props.deleteListingClicked()
	}
	render(){
		let pills = [];
		if(this.props.listing.isThereNew){
			pills.push({ label: 'New!' });
		}
		if(this.props.listing.isFeatured){
			pills.push({ label: 'Featured' });
		}
		let tags = [
			{label: this.props.listing.role}, 
			{label: this.props.listing.level}
		];
		if(this.props.listing.languages){
			this.props.listing.languages.forEach((lang)=>{
				tags.push({
					label: lang
				});
			});		
		}
		if(this.props.listing.tools){
			this.props.listing.tools.forEach((tool)=>{
				tags.push({
					label: tool
				});
			});
		}
		return (
			<div className='Listing'>
				<img src={this.props.listing.company.img} alt="Logo" />
				<div className='FlexRow ListingTop'>
					<Link to={`/company/${this.props.listing.company.fakeId}`}>
						<p onClick={this.props.listingClicked}> {this.props.listing.company.companyName} </p>
					</Link>
					<PillTags pills={pills}/>
				</div>
				<div className='ListingMid FlexRow'>
					<Link to={`/listing/${this.props.listing.fakeId}`}>
						<p>{this.props.listing.jobTitle}</p>
					</Link>
					<Modal show={this.state.showDeleteDialog} modalClosed={this.removeModal}>
						<div>
							<p>Are You sure you want to delete?</p>
							<button onClick={this.removeModal}>Cancel</button>
							<button onClick={this.confirmDelete}>Confirm</button>
						</div>
					</Modal>
					{AuthService.userAvailable()? <p onClick={this.showModal}>Delete</p>: null}
				</div>
				<div className='FlexRow ListingBottom'>
					<p>{this.props.listing.howOld}</p>
					<p className='Dot'>&middot;</p>
					<p>{this.props.listing.typeOfEmployment}</p>
					<p className='Dot'>&middot;</p>
					<p>{this.props.listing.location}</p>
				</div>
				<hr />
				<div className='FlexRow ListingRightMid'>
					<RectangleTags tags={tags} clicked={this.props.tagClicked} />
				</div>
			</div>
		);
	}
}
export default Listing;