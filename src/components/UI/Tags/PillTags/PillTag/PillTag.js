import React from 'react';

const pillTag = ( props )=>{
	let classes = 'PillTag';
	if(props.pillText === 'New!'){
		classes = 'PillTag Cyan';
	}else if(props.pillText === 'Featured'){
		classes = 'PillTag Black';
	}

	return (
		<div className={classes}>{props.pillText}</div>
	);
}
export default pillTag;