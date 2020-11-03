import React from 'react';

import Aux from '../../../../hoc/Auxillary/Auxillary';
import RectangleTag from './RectangleTag/RectangleTag';

const rectangleTags = ( props )=>{
	let tags = props.tags.map((tag, i)=>{
		return <RectangleTag tagText={tag.label} key={`${tag.label} ${i}`} clicked={props.clicked.bind(this, tag.label)}/>;
	});
	return (
		<Aux>
			{tags}
		</Aux>
	);
}
export default rectangleTags;