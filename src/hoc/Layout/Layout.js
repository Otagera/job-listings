import React, { Component } from 'react';

import Aux from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidebar from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
	state = {
		showSideDrawer: false
	}
	sideDrawerClosedHandler = ()=>{
		this.setState({ showSideDrawer: false });
	}
	sideDrawerToggleHandler = ()=>{
		this.setState(prevState=>{
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	}
	render(){
		return (
			<Aux>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<Sidebar
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler} />
				<main  className='Main'>
					{this.props.children}
				</main>
			</Aux>
		);
	}
}
export default Layout;