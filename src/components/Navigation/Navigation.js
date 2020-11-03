import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import Aux from '../../hoc/Auxillary/Auxillary';

class Navigation extends Component {
    state = {
    	isThereUser: null,
    	navItems: {
    		home: {
    			to: '/',
    			title: 'Home',
    			show: true
    		},
    		listings: {
    			to: '/listings',
    			title: 'Listings',
    			show: true
    		},
    		companies: {
    			to: '/companies',
    			title: 'Companies',
    			show: true
    		},
    		newCompany: {
    			to: '/companies/new',
    			title: 'New Company',
    			show: AuthService.userAvailable()
    		},
    		register: {
    			to: '/register',
    			title: 'Register',
    			show: !AuthService.userAvailable()
    		},
    		login: {
    			to: '/login',
    			title: 'Login',
    			show: !AuthService.userAvailable()
    		},
    		logout: {
    			to: '/logout',
    			title: 'Logout',
    			show: AuthService.userAvailable()
    		}
    	}
    }
    test = (e, id)=>{
    	if(id ==='logout'){
    		this.timerFn(2000);
    	}else {
    		this.timerFn(20000);
    	}
    }
    timerFn = (time)=>{
	    this.timer = setTimeout(()=>{
	    	let tempItems = {...this.state.navItems};
	    	tempItems['newCompany'].show = AuthService.userAvailable();
	    	tempItems['logout'].show = AuthService.userAvailable();
	    	tempItems['login'].show = !AuthService.userAvailable();
	    	tempItems['register'].show = !AuthService.userAvailable();
	    	this.setState({ navItems: tempItems });
	    }, time);    	
    }
    componentWillUnmount(){
    	clearTimeout(this.timer);
    }
	render(){
		let { navItems } = this.state;
		let navItemsArray = [];
		for (let key in navItems) {
			navItemsArray.push({
				id: key,
				config: navItems[key]
			});
		}
		return (
			<nav className={this.props.desktop}>
				<ul>
					{
						navItemsArray.map(item =>{
								return ( 
									<Aux key={item.id}>
										{item.config.show && <li>
											<NavLink
												onClick={(e)=>this.test(e, item.id)}
												to={item.config.to}
												exact 
												activeClassName='ActiveNavLink'>
													{item.config.title}
											</NavLink>
										</li>}
									</Aux>
								)
							}
						)
					}
				</ul>
			</nav>
			);
	}
}
export default Navigation;