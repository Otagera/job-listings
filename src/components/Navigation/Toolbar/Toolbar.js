import React from 'react';

//import Logo from '../../Logo/Logo';
import Navigation from '..//Navigation';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

import styles from './Toolbar.module.css';

const toolbar = ( props ) => (
	<header className={styles.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked}/>
		{/*<div className={styles.Logo}>
			<Logo />			
		</div>*/}
		<Navigation desktop={styles.DesktopOnly}/>
	</header>
);

export default toolbar;