import React from 'react';

const rectangleTag = ( props )=>{
	return (
		<div className={'RectangleTag'} onClick={props.clicked}>{props.tagText}</div>
	);
}
export default rectangleTag;