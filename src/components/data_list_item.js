import React from 'react';
import classes from '../css/styles.css';

const DataItem = ({item}) => {
	console.log(item);
    
    return (
		<div className={classes.data_item}>
			<pre>
				{JSON.stringify(item)}
			</pre>
		</div>
    )
}

export default DataItem;
