import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Listing from './Listing/Listing';
import Loader from '../../../../UI/Loader/Loader';
import UserService from '../../../../../services/UserService';

class Listings extends Component{
	state= {
		redirect: false,
		error: false
	}
    handleDeleteListingClicked = (tempFakeId)=>{
    	UserService.deleteListing(tempFakeId)
    				.then(response=>{
	                	this.setState({ redirect: true });
	             	},error=>{
	             	   //console.error('Error ' + error);
	                	this.setState({ error: true });
	            	});
    }
    render(){
		let listings = this.props.availableListings.map((listing)=>{
			return (<Listing
						listing={listing}
						key={listing.fakeId}
						tagClicked={this.props.tagClicked}
						listingClicked={()=> this.props.listingClicked(listing.fakeId)}
						deleteListingClicked={()=> this.handleDeleteListingClicked(listing.fakeId)} />
				);
		});
		let redirect = null;
		if(this.props.availableListings.length < 0){
			listings = <Loader />;
		}
		if(this.props.error){
			listings = <p>Something went wrong</p>
		}
		if(this.state.redirect){
			redirect = <Redirect to='/' />;
		}
		return (
			<div className='Listings'>
				{redirect}
				{listings}
			</div>
		);
    }

}
export default Listings;