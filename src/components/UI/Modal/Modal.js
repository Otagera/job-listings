import React, { Component } from 'react';

import styles from './Modal.module.css';
import Aux from '../../../hoc/Auxillary/Auxillary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

	shouldComponentUpdate(nextProps, nextState){
		return nextProps.show !== this.props.show;
	}

	render(){
		let classes = [styles.Modal];
		if(this.props.successfull){
			classes.push(styles.Successfull);
		}
		return (
			<Aux>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div 
					className={classes.join(' ')}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>
			</Aux>
		);
	}
}
export default Modal;