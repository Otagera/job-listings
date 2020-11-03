import React from 'react';

import Aux from '../../../../hoc/Auxillary/Auxillary';
import RectangleTagX from './RectangleTagX/RectangleTagX';

const rectangleTagsX = ( props )=>{
	let tags = props.tags.map((tag)=>{
		return <RectangleTagX tagText={tag.label} key={tag.label} clicked={props.clicked.bind(this, tag.label)}/>;
	});
	return (
		<Aux>
			{tags}
		</Aux>
	);
}
export default rectangleTagsX;