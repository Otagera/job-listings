import React from 'react';

import Aux from '../../../../hoc/Auxillary/Auxillary';
import PillTag from './PillTag/PillTag';

const pillTags = ( props )=>{
	let pills = props.pills.map((pill)=>{
		return <PillTag pillText={pill.label} key={pill.label}/>;
	});
	return (
		<Aux>
			{pills}
		</Aux>
	);
}
export default pillTags;