import React from 'react';

//import Logo from '../../Logo/Logo';
import Navigation from '../Navigation';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

import styles from './SideDrawer.module.css';

const sideDrawer = ( props ) => {
	let attachedClasses = [styles.SideDrawer, styles.Close];
	let attachedClass = styles.Close;
	if(props.open) {
		attachedClasses = [styles.SideDrawer, styles.Open];
		attachedClass = styles.Open;
	}
	return (
		<Aux>
			<Backdrop
				className={attachedClass}
				show={props.open}
				clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>
				{/*<div className={styles.Logo}>
					<Logo />			
				</div>*/}
				<Navigation />
			</div>			
		</Aux>
	);
}

export default sideDrawer;