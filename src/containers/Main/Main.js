import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Aux from '../../hoc/Auxillary/Auxillary';
import GuardRoute from '../../hoc/GuardRoute/GuardRoute';

import ListingsPage from '../../components/Company/Listing/ListingsPage/ListingsPage';
import ListingPage from '../../components/Company/Listing/ListingPage/ListingPage';
import NewListing from '../../components/Company/Listing/ListingForm/NewListing';
import EditListing from '../../components/Company/Listing/ListingForm/EditListing';

import CompaniesPage from '../../components/Company/CompaniesPage/CompaniesPage';
import CompanyPage from '../../components/Company/CompanyPage/CompanyPage';
import NewCompany from '../../components/Company/CompanyForm/NewCompany';
import EditCompany from '../../components/Company/CompanyForm/EditCompany';

import Register from '../../components/OnboardingPage/Register';
import Login from '../../components/OnboardingPage/Login';

import AuthService from '../../services/AuthService';

class Main extends Component {
    state = {
        selectedListingId: null
    }

    handleSetSelectedListing = (tempFakeId)=>{
        this.setState({ selectedListingId: tempFakeId });
    }
	render(){
		return (
			<Aux>
                <Switch>
                    <Redirect
                        from='/'
                        exact
                        to='/listings' />
                    <Route
                        path='/listings'
                        exact
                        component={()=>{
                            return (
                                <ListingsPage
                                    listingClicked={this.handleSetSelectedListing} />
                            );
                        }}
                    />
                    <Route
                        path='/companies'
                        exact
                        component={()=>{
                            return (
                                <CompaniesPage />
                            );
                        }}
                    />
                    <GuardRoute
                        path='/listings/new/:id'
                        exact
                        auth={AuthService.userAvailable()}
                        component={()=>{
                            return(
                                <NewListing />
                            );
                        }}
                    />
                    <GuardRoute
                        path='/companies/new'
                        exact
                        auth={AuthService.userAvailable()}
                        component={()=>{
                            return(
                                <NewCompany />
                            );
                        }}
                    />
                    <Route
                        path='/listing/:id'
                        exact
                        component={()=>{
                            return (
                                <ListingPage listingId={this.state.selectedListingId}/>
                            );
                        }}
                    />
                    <Route
                        path='/company/:id'
                        exact
                        component={()=>{
                            return (
                                <CompanyPage />
                            );
                        }}
                    />
                    <GuardRoute
                        path='/listing/edit/:id'
                        exact
                        auth={AuthService.userAvailable()}
                        component={()=>{
                            return(
                                <EditListing />
                            );
                        }} />
                    <GuardRoute
                        path='/company/edit/:id'
                        exact
                        auth={AuthService.userAvailable()}
                        component={()=>{
                            return(
                                <EditCompany />
                            );
                        }} />
                    <Route
                        path='/register'
                        exact
                        component={()=>{
                            return(
                                <Register />
                            );
                        }} />
                    <Route
                        path='/login'
                        exact
                        component={()=>{
                            return(
                                <Login />
                            );
                        }} />
                    <Route
                        path='/logout'
                        exact
                        component={()=>{
                            AuthService.logout();
                            return(
                                <Redirect to='/' />
                            );
                        }} />
                    <Route render={()=> <h1>Not Found</h1>} />
                </Switch>
			</Aux>
		);
	}
}
export default Main;