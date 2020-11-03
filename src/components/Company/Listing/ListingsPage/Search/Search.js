import React from 'react';
import RectangleTagsX from '../../../../UI/Tags/RectangleTagsX/RectangleTagsX';

const search = ( props )=>{
	let tags = props.searchTags.map((searchTag)=>{
		return {
			label: searchTag
		};
	});
	//console.log(props.searchTags);
	return (
		<div className='Search'>
			<div className='SearchLeft'>
				<RectangleTagsX tags={tags} clicked={props.clicked} />
			</div>
			<div className='SearchRight'><p onClick={props.clearClicked}>Clear</p></div>
		</div>
	);
}
export default search;