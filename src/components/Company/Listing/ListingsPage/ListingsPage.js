import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Aux from '../../../../hoc/Auxillary/Auxillary';
import Search from './Search/Search';
import Listings from './Listings/Listings';
import Loader from '../../../UI/Loader/Loader';
import UserService from '../../../../services/UserService';

class ListingsPage extends Component{
	state = {
        jobListings: [],
    	filteredListings: [],
    	searchTags: [],
        empty: false,
        redirect: false,
        error: false
    }

    filterLists = (searchTags)=>{
    	let filtered = this.state.jobListings.filter((listing)=>{
    		let listingTags = [listing.role, listing.level, ...listing.languages, ...listing.tools];
            return searchTags.every(searchTag => listingTags.includes(searchTag));
    	});
    	this.setState({ searchTags: searchTags, filteredListings: filtered });
    }

    handleRectangleTagClick = (tag)=>{
    	let searchTags = [...this.state.searchTags];
        if(!searchTags.includes(tag)){
    	   searchTags.push(tag);
        }
    	this.filterLists(searchTags);
    }
    handleRemoveSearchTagsClick = (tag)=>{
    	let searchTags = [...this.state.searchTags];
    	for(let i = 0; i < searchTags.length; i++) {
    		if(searchTags[i] === tag){
    			searchTags.splice(i, 1);
    			break;
    		}
    	};
    	this.filterLists(searchTags);
    }
    handleClearSearchTags = ()=>{
    	this.filterLists([]);
    }
    getListings = ()=>{
    	let companyId = this.props.companyId || '';
        UserService.getListings(companyId)
                    .then(response=>{
                        let jobListings = response.data.listings;
                        if(jobListings){
                            jobListings.forEach((listing)=>{
                                listing.company.img = UserService.updateImgURL(listing.company.img);
                            });
                        }
                           
                        let empty = (jobListings.length <= 0)? true: false;
                        this.setState({ 
                            jobListings: jobListings,
                            empty: empty,
                            error: false
                        });
                    },error=>{
                        this.setState({ error: true });
                    });
    }

    componentDidMount(){
        this.getListings();
    }
	render(){
		let displayListings = this.state.jobListings;
		if(this.state.filteredListings.length > 0){
			displayListings = this.state.filteredListings;
		}
        let whatToDisplayListing = <Loader />;
        if(displayListings.length > 0){
            whatToDisplayListing = (
                <Aux>
                    <Search
                        searchTags={this.state.searchTags}
                        clicked={this.handleRemoveSearchTagsClick}
                        clearClicked={this.handleClearSearchTags} />
                    <Listings
                        error={this.state.error}
                        availableListings={displayListings}
                        tagClicked={this.handleRectangleTagClick}
                        listingClicked={this.props.listingClicked} />
                </Aux>
            );
        }
        if(this.state.empty) {
            whatToDisplayListing =  <h4>
                                        Sorry No job listings were found
                                        {(this.props.companyId)? " you can add a new listing" : null}
                                    </h4>;
        }
        if(this.state.error){
            whatToDisplayListing = <h4>Sorry Something went wrong</h4>
        }
        let redirect = null;
        if(this.state.redirect){
            redirect = <Redirect to='/listings' />
        }

		return (
			<Aux>
                {redirect}
                {whatToDisplayListing}		
			</Aux>
		);
	}
}
export default ListingsPage;