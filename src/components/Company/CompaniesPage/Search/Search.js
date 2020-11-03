import React from 'react';


const search = ( props )=>{
	return (
		<div className='Search'>
			<div className='SearchLeft'>
				
			</div>
			<div className='SearchRight'><p onClick={props.clearClicked}>Clear</p></div>
		</div>
	);
}
export default search;