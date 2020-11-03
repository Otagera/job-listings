import React from 'react';
import RectangleTag from '../../RectangleTags/RectangleTag/RectangleTag';
import X from '../../../../../assets/images/icon-remove.svg';

const rectangleTagX = ( props )=>{
	return (
		<div className={'RectangleTagX'}>
			<RectangleTag tagText={props.tagText}/>
			<div className='IconRemove' onClick={props.clicked} >
				<img src={X} alt="Remove Filter" />
			</div>
		</div>
	);
}
export default rectangleTagX;